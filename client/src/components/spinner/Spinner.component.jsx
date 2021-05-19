import React from 'react';
import './spinner.style.css';

const Spinner = () => {

    return (
        <>
            <div className="cube-spinner">
                <lottie-player
                    src="https://assets3.lottiefiles.com/private_files/lf30_k8g6n0xu.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "300px", height: "300px" }}
                    loop autoplay>
                </lottie-player>
            </div>
        </>
    )
}

export default Spinner;