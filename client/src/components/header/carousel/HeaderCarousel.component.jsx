import React from 'react';
import RBCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import './headerCarousel.style.css';

const HeaderCarousel = () => {

    const contentArr = [
        'FREE DOMESTIC SHIPPING ON OREDERS OVER 150$',
        'ALL ORDERS ARE SHIPPED FROM OUR ISRAEL OFFICE USING ISRAEL POST SERVICES',
        'PLEASE ALLOW 3 WORKING DAYS FOR ALL ORDERS TO BE ORDERS TO BE PROCESSED AND SHIPPING'
    ]


    return (
        <>
            <RBCarousel
                autoplay={true}
                pauseOnVisibility={true}
                slideshowSpeed={5000}
                version={4}
                leftIcon={true}
                rightIcon={true}>
                {contentArr.map((content, index) => {
                    return <div className="carousel-item1" key={index}>
                        <div className="carousel-center">
                            <div className="carousel-content">{content}</div>
                        </div>
                        <div className="carousel-center"> </div>
                    </div>
                })}
            </RBCarousel>
        </>
    )
}

export default HeaderCarousel;