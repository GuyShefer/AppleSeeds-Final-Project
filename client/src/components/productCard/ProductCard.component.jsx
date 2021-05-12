import React, { useState } from 'react';
import './productCard.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

const ProductCard = (props) => {

    const [productDetails] = useState(props);
    const [showProductModal, setShowModal] = useState(false);
    const history = useHistory();

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const deleteProduct = async () => {
        console.log('delete', productDetails.product._id);
        const token = JSON.parse(localStorage.getItem('token'));
        const res = await axios.delete(url + `/api/products/${productDetails.product._id}`, { headers: { Authorization: `Bearer ${token}` } });
        props.forceUpdate(res.data._id);
    }

    const updateProduct = () => {
        history.push({
            pathname: `/saveProduct`,
            productId: productDetails.product._id,
        });
    }

    const openProductModal = async () => {
        setShowModal(!showProductModal);
        const response = await axios.patch(url + `/api/products/${productDetails.product._id}`);
        console.log(response.data);
    }

    const handleClose = () => {
        setShowModal(!showProductModal);
    }

    return (
        <>
            <div className="card-wrapper">

                <div className="product-card">
                    <div className="card-image">
                        <div className="product-card-header">
                            <p className="product-title-name">{productDetails.product.productName}</p>
                            <p className="product-price">{productDetails.product.price}$</p>
                        </div>
                        <img src={`data:image/jpeg;base64,${arrayBufferToBase64(productDetails.product.image.data)}`} alt="card product" />
                        <div className="card-button" onClick={openProductModal}>QUICK VIEW</div>
                    </div>
                </div>

                {props.userType &&
                    <div className="user-actions">
                        <button className="user-action-button delete" onClick={deleteProduct}>Delete</button>
                        <button className="user-action-button update" onClick={updateProduct}>Update</button>
                    </div>
                }
            </div>

            <Modal show={showProductModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductCard;