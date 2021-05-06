import React from 'react';
import RBCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const HeaderCarousel = () => {

    return (
        <>
            <RBCarousel
                autoplay={true}
                pauseOnVisibility={true}
                slideshowSpeed={5000}
                version={4}
                leftIcon={true}
                rightIcon={true}>

                <div className="carousel-item1" >
                    <div className="carousel-center">
                        <div>FREE DOMESTIC SHIPPING ON OREDERS OVER 150$</div>
                    </div>
                    <div className="carousel-center"> </div>
                </div>
                <div className="carousel-item1">
                    <div className="carousel-center">
                        <div>ALL ORDERS ARE SHIPPED FROM OUR ISRAEL OFFICE USING ISRAEL POST SERVICES</div>
                    </div>
                </div>
                <div className="carousel-item1" >
                    <div className="carousel-center">
                        <div>PLEASE ALLOW 3 WORKING DAYS FOR ALL ORDERS TO BE ORDERS TO BE PROCESSED AND SHIPPING</div>
                    </div>
                </div>
            </RBCarousel>
        </>
    )
}

export default HeaderCarousel;