import React, { useEffect, useState } from 'react';
import './productsType.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import ProductCard from '../../components/productCard/ProductCard.component';
import Spinner from '../../components/spinner/Spinner.component';

const ProductsType = (props) => {

    const [productsType, setProductsType] = useState(props.location.productsType);
    const [products, setProducts] = useState([]);
    const [userType] = useState(props.location.userType);
    const [displaySpinner, setDisplaySpinner] = useState(true);

    useEffect(() => {
        setProductsType(props.location.productsType);
    }, [props.location.productsType])

    useEffect(() => {
        let type = productsType;

        const getAllProudctsByType = async () => {
            setDisplaySpinner(true);
            if (!type) { type = 'earrings' };
            const response = await axios.get(url + `/api/products/byType/${type}`);
            setProducts(response.data);
            setDisplaySpinner(false);
        }
        getAllProudctsByType();
    }, [productsType])

    const forceUpdateComponent = (productId) => {
        const filteredProducts = products.filter(product => product._id !== productId);
        setProducts(filteredProducts);
    }

    return (
        <>
            <div className="products-type-container">
                {displaySpinner ? <Spinner /> : null}
                <div className="products-type-grid">
                    {products.map(product => {
                        return <ProductCard key={product._id} product={product} userType={userType} forceUpdate={forceUpdateComponent} />
                    })}

                </div>
            </div>
        </>
    )
}

export default ProductsType;