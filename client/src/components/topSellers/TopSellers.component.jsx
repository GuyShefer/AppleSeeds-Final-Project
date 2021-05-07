import React, { useEffect, useState } from 'react';
import './topSellers.style.css';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard.component';

const TopSellers = () => {

    const [products, setProducts] = useState([]);
    const url = 'https://final-project-appleseeds.herokuapp.com';

    useEffect(() => {
        const getAllTopSellers = async () => {
            const response = await axios.get(url + '/api/products/bestSeller/all');
            setProducts(response.data)
        }
        getAllTopSellers();
    }, [])

    return (

        <>
            <div className="top-sellers-grid">
                {products.map(product => {
                    return <ProductCard key={product._id} product={product} />
                })}
            </div>
        </>
    )
}

export default TopSellers;