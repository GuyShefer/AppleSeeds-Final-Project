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
                <div className="welcome-text">
                    <h3>Welcome to Havaya Jewelry</h3>
                    <p>We’re here to bring kindness, inspiration, connection, and love straight to your doorstep. Meaning compassion in Hindi, Daya is jewelry with a heart, mission, and story. Featuring handcrafted bohemian pieces for the free spirited, our jewelry combines ancient mythological and spiritual symbols with modern designs.  We aim to be more than just a jewelry company, our mission is simple: spread kindness throughout the world and inspire others to express their individuality.</p>
                </div>
            </div>
        </>
    )
}

export default Main;