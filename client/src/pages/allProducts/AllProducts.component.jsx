import React, { useEffect, useState } from 'react';
import './allProducts.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import ProductCard from '../../components/productCard/ProductCard.component';

const AllProducts = (props) => {

    const [userType, setUserType] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (props.history.location.userType) {
            setUserType(props.history.location.userType.type)
        }

        const getAllProducts = async () => {
            const response = await axios.get(url + '/api/products');
            setProducts(response.data)
        }

        getAllProducts();

    }, [props.history.location.userType])

    const forceUpdateComponent = (productId) => {
        const filteredProducts = products.filter(product => product._id !== productId);
        setProducts(filteredProducts);
    }


    return (
        <>
            {console.log(products)}
            {console.log(userType)}
            <div className="all-products-container">
                <div className="horizontal-line">
                    <hr />
                    <div className="all-products-grid">
                        <div className="img-advert"></div>
                        {products.map(product => {
                            return <ProductCard key={product._id} product={product} userType={userType} forceUpdate={forceUpdateComponent} />
                        })}
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default AllProducts;