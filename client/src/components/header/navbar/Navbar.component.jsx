import React, { useState } from 'react';
import './navbar.style.css';
import Dropdown from 'react-bootstrap/Dropdown'

const Navbar = () => {

    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    return (
        <>
            <div className="nav-bar">
                <div className="logo"></div>

                <div className="nav-list-menu">
                    <ul className="nav-list">

                        <li>
                            <Dropdown show={show}
                                onMouseEnter={showDropdown}
                                onMouseLeave={hideDropdown}>
                                <Dropdown.Toggle className="nav-item" > SHOP </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item>Best Sellers</Dropdown.Item>
                                    <Dropdown.Item>Shop All</Dropdown.Item>
                                    <Dropdown.Item>Earings</Dropdown.Item>
                                    <Dropdown.Item>Rings</Dropdown.Item>
                                    <Dropdown.Item>Necklaces</Dropdown.Item>
                                    <Dropdown.Item>Bracelets</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="nav-list-item"><span>FAQ</span></li>
                        <li className="nav-list-item"><span>OUR STORY</span></li>
                    </ul>
                </div>

                <div className="user-details">
                    asd
                </div>
            </div>
        </>
    )
}

export default Navbar;