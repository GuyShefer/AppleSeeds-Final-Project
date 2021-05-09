import React from 'react';
import './saveProduct.style.css';

const SaveProduct = (props) => {

    return (
        <>
            {console.log(props.history.location.productDetails)}
            save product
        </>
    )
}

export default SaveProduct;