import React, { useState } from 'react';
import './productCard.style.css';


const ProductCard = (props) => {

    const [productDetails] = useState(props);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
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

                    {props.userType && <div><button>yossi</button></div>}
            </div>
        </>
    )
}

export default ProductCard;