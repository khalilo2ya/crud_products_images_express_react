import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    console.log(response.data);
    setProducts(response.data);

  }

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="container mt-5">
      <Link to="/add" className='button is-success' >Add New Product</Link>
      <div className="columns is-multiline mt-5">

        {products.map((product) => (


          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={product.url} alt="Placeholder image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{product.name}</p>
                    <p className="subtitle is-6">{product.description}</p>
                  </div>
                </div>
              </div>
              <footer className="card-footer">
                {/* <a href="" className="card-footer-item">Edit</a> */}
                
                <Link to={`/edit/${product.id}`} className="card-footer-item">Edit</Link>
                <a onClick={() => deleteProduct(product.id)} className="card-footer-item">Delete</a>
              </footer>
            </div>
          </div>


        ))}



      </div>

    </div>
  )
}

export default ProductList