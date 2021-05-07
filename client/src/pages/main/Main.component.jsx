import React from 'react';
import TopSellers from '../../components/topSellers/TopSellers.component';
import './main.style.css';

const Main = () => {

    return (
        <>
            <div className="main">
                <div className="container-image"></div>
                <div className="top-sellers-section">
                    <div className="sub-title">
                        <h2>TOP SELLERS</h2>
                    </div>

                    <div className="top-sellers-container-cards">
                        <TopSellers />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;