import React, { useEffect, useState } from 'react';
import './allProducts.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import ProductCard from '../../components/productCard/ProductCard.component';
import Spinner from '../../components/spinner/Spinner.component';

const AllProducts = (props) => {

    const [userType, setUserType] = useState(null);
    const [products, setProducts] = useState([]);
    const [displaySpinner, setDisplaySpinner] = useState(false);

    useEffect(() => {
        if (props.history.location.userType) {
            setUserType(props.history.location.userType.type)
        }

        const getAllProducts = async () => {
            setDisplaySpinner(true);
            const response = await axios.get(url + '/api/products');
            setDisplaySpinner(false);
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

            <div className="all-products-container">
                {displaySpinner ? <Spinner /> : null}
                <div className="horizontal-line">
                    <hr />
                    <div className="all-products-grid">
                        {products.length > 0 ? <div className="img-advert"></div> : null}
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