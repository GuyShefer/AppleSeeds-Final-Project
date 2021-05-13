import React from 'react';
import './cartItem.style.css';

const CartItem = ({ productData }) => {

    return (
        <>
            {console.log(productData)}
            <div className="cart-item">
                <div className="cart-image-container">
                    <img src={`data:image/jpeg;base64,${arrayBufferToBase64(productData.image.data)}`} alt="card product" />
                </div>
                <div className="cart-item-data">
                    <h3>{productData.productName}</h3>
                    <h4>&#8362;{productData.price} NIS</h4>
                    <div className="qty-update">
                        <span>-</span>
                        <span>{productData.qty}</span>
                        <span>+</span>
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
}

export default CartItem;