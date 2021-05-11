import React, { useEffect, useState } from 'react';
import './productsType.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';

const ProductsType = (props) => {

    const [productsType, setProductsType] = useState(props.location.productsType);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProductsType(props.location.productsType);
    }, [props.location.productsType])

    useEffect(() => {
        console.log(productsType);
        const getAllProudctsByType = async () => {
            const response = await axios.get(url + `/api/products/byType/${productsType}`);
            console.log(response.data);
        }
        getAllProudctsByType();
    }, [productsType])

    return (
        <>
            products by type
            <br />
            {productsType}
        </>
    )
}

export default ProductsType;