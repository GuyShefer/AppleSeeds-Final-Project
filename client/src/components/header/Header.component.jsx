import React from 'react';
import HeaderCarousel from './carousel/HeaderCarousel.component';
import './header.style.css'
import Navbar from './navbar/Navbar.component';

const Header = () => {

    return (
        <>
            <header className="header">
                <HeaderCarousel />
                <Navbar />
            </header>

        </>
    )
}

export default Header;