import React, { useState } from 'react';
import './cartItem.style.css';

import { connect } from 'react-redux';
import { adjustQty } from '../../redux/Shopping/shopping-actions';

const CartItem = ({ productData, adjustQty }) => {
    const [productQty, setProductQty] = useState(productData.qty);

    const handleDecrease = () => {
        if (productQty > 0) {
            setProductQty(productQty - 1);
            adjustQty(productData._id, productQty - 1);
        }
    }
    const handleIncrease = () => {
        setProductQty(productQty + 1);
        adjustQty(productData._id, productQty + 1);
    }

    return (
        <>
            <div className="cart-item">
                <div className="cart-image-container">
                    <img src={`data:image/jpeg;base64,${arrayBufferToBase64(productData.image.data)}`} alt="card product" />
                </div>
                <div className="cart-item-data">
                    <h3>{productData.productName}</h3>
                    <h4>&#8362;{productData.price} NIS</h4>
                    <div className="qty-update">
                        <span className="update-span" onClick={handleDecrease} >-</span>
                        <span>{productQty}</span>
                        <span className="update-span" onClick={handleIncrease}>+</span>
                    </div>
                </div>
            </div>
        </>
    )

}

const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (id, value) => dispatch(adjustQty(id, value))
    };
};

export default connect(null, mapDispatchToProps)(CartItem);