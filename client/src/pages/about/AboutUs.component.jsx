import React from 'react';
import './aboutUs.style.css';

const AboutUs = () => {

    return (
        <>
            <div className="about-container">
                <div className="about-title">
                    <h2 className="about-title-h2">Who We Are</h2>
                </div>
                <div className="about-main-container">
                    <div className="left-main-container"></div>
                    <div className="right-main-container">
                        <div className="about-description">
                            <p>
                                Havaya jewelry is not just another jewelry brand, but a purpose-driven lifestyle on a mission through meaningful jewelry.
                            </p>
                            <p>
                                All jewelry is handmade by our artists while maintaining the qualities of the raw material.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="owner-say">
                    Our jewelry are made to the highest standards from the strongest material possible. They are made to last and look great for many years.
                </div>

                <div className="about-grid">
                    <ul className="img-containers">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AboutUs;