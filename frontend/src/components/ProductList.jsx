import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${selectedProductId}`);
      getProducts();
      closeDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (imageUrl, description, name, price) => {
    setSelectedImage(imageUrl);
    setSelectedDescription(description);
    setSelectedName(name);
    setSelectedPrice(price);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
    setSelectedImage('');
    setSelectedDescription('');
    setSelectedName('');
    setSelectedPrice('');
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteModalActive(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalActive(false);
    setSelectedProductId(null);
  };

  return (
    <div>
      <div className="container mt-5">
        {/* <Link to="/add" className="button is-success">Add New Product</Link> */}
        <div className="is-flex is-justify-content-flex-end">
          <Link to="/add" className="button is-info">Add New Product</Link>
        </div>
        <div className="columns is-multiline mt-5">
          {products.map((product) => (
            <div className="column is-one-quarter" key={product.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={product.url}
                      alt="Product"
                      onClick={() => openModal(product.url, product.description, product.name, product.price)}
                      style={{ cursor: 'pointer' }}
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-5">{product.name}</p>
                      <span className="title is-6 has-text-warning">{product.price} TND</span>
                      <p className="subtitle is-6 has-text-grey">{product.description.substring(0, 75)} ... <span className='tag  is-clickable' onClick={() => openModal(product.url, product.description, product.name, product.price)}> ... </span></p>
                    </div>
                  </div>
                </div>
                <footer className="card-footer">
                  <Link to={`/edit/${product.id}`} className="card-footer-item">Edit</Link>
                  <a
                    onClick={() => openDeleteModal(product.id)}
                    className="card-footer-item"
                  >
                    Delete
                  </a>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image View Modal */}
      {isModalActive && (
        <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <div className="box">
              <figure className="image is-4by3">
                <img src={selectedImage} alt="Selected" />
              </figure>
              <p className="title is-5">{selectedName}</p>
              <span className="title is-6 has-text-warning">{selectedPrice} TND</span>
              <p className="mt-4">{selectedDescription}</p>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalActive && (
        <div className={`modal ${isDeleteModalActive ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={closeDeleteModal}></div>
          <div className="modal-content">
            <div className="box is-centered">
              <h3 className="title is-5 has-text-centered has-text-danger">Are you sure you want to delete this product?</h3>
              <div className="buttons is-centered">
                <button className="button is-danger" onClick={deleteProduct}>
                  Yes, Delete
                </button>
                <button className="button" onClick={closeDeleteModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={closeDeleteModal}></button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
