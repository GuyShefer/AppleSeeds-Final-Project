import React, { useEffect, useState } from 'react';
import './productsType.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import ProductCard from '../../components/productCard/ProductCard.component';

const ProductsType = (props) => {

    const [productsType, setProductsType] = useState(props.location.productsType);
    const [products, setProducts] = useState([]);
    const [userType] = useState(props.location.userType);

    useEffect(() => {
        setProductsType(props.location.productsType);
    }, [props.location.productsType])

    useEffect(() => {
        let type = productsType;

        const getAllProudctsByType = async () => {
            if (!type) { type = 'earrings' };
            const response = await axios.get(url + `/api/products/byType/${type}`);
            setProducts(response.data);
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
                <div className="products-type-grid">
                    {   products.map(product => {
                            return <ProductCard key={product._id} product={product} userType={userType} forceUpdate={forceUpdateComponent} />
                        })}
                        
                </div>
            </div>
            {console.log( products)}
        </>
    )
}

export default ProductsType;