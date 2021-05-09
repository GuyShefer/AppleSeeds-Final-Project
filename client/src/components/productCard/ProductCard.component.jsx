import React, { useState } from 'react';
import './productCard.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';

const ProductCard = (props) => {

    const [productDetails] = useState(props);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const deleteProduct = async () => {
        console.log('delete', productDetails.product._id);
        const token = JSON.parse(localStorage.getItem('token'));
        const res = await axios.delete(url + `/api/products/${productDetails.product._id}`, { headers: { Authorization: `Bearer ${token}` }});
        props.forceUpdate(res.data._id);
    }

    const updateProduct = () => {
        console.log('update');
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
                        <div className="card-button">QUICK VIEW</div>
                    </div>
                </div>

                {props.userType &&
                    <div className="user-actions">
                        <button className="user-action-button delete" onClick={deleteProduct}>Delete</button>
                        <button className="user-action-button update" onClick={updateProduct}>Update</button>
                    </div>
                }
            </div>
        </>
    )
}

export default ProductCard;