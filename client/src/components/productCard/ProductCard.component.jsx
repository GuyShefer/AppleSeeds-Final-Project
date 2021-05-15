import React, { useState } from 'react';
import './productCard.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/Shopping/shopping-actions';

const ProductCard = ({ userType, product, forceUpdate, addToCart }) => {

    const [productDetails] = useState(product);
    const [showProductModal, setShowModal] = useState(false);
    const [productToDisplay, setProduct] = useState({});
    const history = useHistory();

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const deleteProduct = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const res = await axios.delete(url + `/api/products/${productDetails._id}`, { headers: { Authorization: `Bearer ${token}` } });
            forceUpdate(res.data._id);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const updateProduct = () => {
        history.push({
            pathname: `/saveProduct`,
            productId: productDetails._id,
            userType: 'admin',
        });
    }

    const openProductModal = async () => {
        const response = await axios.patch(url + `/api/products/${productDetails._id}`);
        console.log(response.data);
        setProduct(response.data);
        setShowModal(!showProductModal);
    }

    const handleClose = () => {
        setShowModal(!showProductModal);
    }

    const handleAddToCart = () => {
        addToCart(productDetails);
        handleClose();
    }

    return (
        <>
            <div className="card-wrapper">

                <div className="product-card">
                    <div className="card-image">
                        <div className="product-card-header">
                            <p className="product-title-name">{productDetails.productName}</p>
                            <p className="product-price">{productDetails.price}$</p>
                        </div>
                        <img src={`data:image/jpeg;base64,${arrayBufferToBase64(productDetails.image.data)}`} alt="card product" />
                        <div className="card-button" onClick={openProductModal}>QUICK VIEW</div>
                    </div>
                </div>

                {userType &&
                    <div className="user-actions">
                        <button className="user-action-button delete" onClick={deleteProduct}>Delete</button>
                        <button className="user-action-button update" onClick={updateProduct}>Update</button>
                    </div>
                }
            </div>

            <Modal show={showProductModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{productToDisplay.productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="product-card-modal-body">
                    <div className="image-side">
                        <img src={`data:image/jpeg;base64,${arrayBufferToBase64(productDetails.image.data)}`} alt="card product" />
                    </div>
                    <div className="right-side-modal">
                        <h3 className="h3">{productToDisplay.productName}</h3>
                        <div className="modal-price">
                            <p>Price : &#8362;{productToDisplay.price}</p>
                        </div>
                        <div className="product-description">
                            {productToDisplay.description}
                        </div>
                        <div className="add-tocart">
                            <Button color='blue' onClick={handleAddToCart}>ADD TO CART</Button> {/* redux */}
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (product) => dispatch(addToCart(product))
    };
};

export default connect(null, mapDispatchToProps)(ProductCard);