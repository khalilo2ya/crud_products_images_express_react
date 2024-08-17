import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
const EditProduct = () => {
    // const [productId, setProductID] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    

    useEffect(() => {
        getProductByID();
    }, []);


    const getProductByID = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/products/${id}`);
            setTitle(res.data.name);
            setFile(res.data.image);
            setPreview(res.data.url);
        } catch (err) {
            console.log(err);
        }
    };

   


    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        try {
            await axios.patch(`http://localhost:5000/products/${productId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="columns is-centered mt-5">


            <div className="column is-half">
                <form onSubmit={updateProduct}>
                    <div className="field">
                        <label className="label">Product Name</label>
                        <div className="control">
                            <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Product Name' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Product Image</label>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input type="file" name="" id="" className="file-input" onChange={loadImage} />
                                    <span className="file-cta">
                                        <span className="file-label">Choose a file...</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure className='image is-128x128'>
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}

                    <div className="field">
                        <div className="control">
                            <button className="button is-success">Update</button>
                        </div>

                    </div>
                </form>



            </div>
        </div>
    )
}

export default EditProduct