import React from 'react';
import './footer.style.css';

const Footer = () => {

    return (
        <>
            <footer className="footer">
                <div className="top-footer-serction">
                    <div className="logo footer-logo"></div>
                    <div className="contact">
                        <p className="tag-name"> Havaya Jewelry</p>
                        <p> Shuk Hacarmel, Carmel st. 19</p>
                        <p> Tel Aviv, ISRAEL</p>
                        <p> Sunday - Friday</p>
                        <p> 9:00 - 17:00 </p>
                    </div>
                </div>
                <hr />
                <p className="rights">© 2021 Havaya Jewelry. All rights reserved</p>
            </footer>
        </>
    )
}

export default Footer;