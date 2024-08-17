import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (imageUrl, description) => {
    setSelectedImage(imageUrl);
    setSelectedDescription(description);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
    setSelectedImage('');
    setSelectedDescription('');
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className='button is-success'>Add New Product</Link>
      <div className="columns is-multiline mt-5">
        {products.map((product) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={product.url}
                    alt="Product"
                    onClick={() => openModal(product.url, product.description)}
                    style={{ cursor: 'pointer' }}
                  />
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
                <Link to={`/edit/${product.id}`} className="card-footer-item">Edit</Link>
                <a onClick={() => deleteProduct(product.id)} className="card-footer-item">Delete</a>
              </footer>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalActive && (
        <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <div className="box">
              <figure className="image is-4by3">
                <img src={selectedImage} alt="Selected" />
              </figure>
              <p className="mt-4">{selectedDescription}</p>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
