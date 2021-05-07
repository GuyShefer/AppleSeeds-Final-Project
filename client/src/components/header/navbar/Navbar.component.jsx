import React, { useState } from 'react';
import './navbar.style.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Navbar = () => {

    const [show, setShow] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [userLoginDetails, setUserLoginDetails] = useState({ email: '', password: '' });
    const url = 'https://final-project-appleseeds.herokuapp.com';

    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    const handleClose = () => {
        setLoginModalShow(false);
    }

    const handleUserAccount = async () => {
        console.log('asd');
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const response = await axios.get(url + '/api/users/getAccInfo', { headers: { Authorization: `Bearer ${token}` } })
            console.log('lalalala', response);
        } else {
            setLoginModalShow(true);
        }
        // if i got user logged in in the system i have to open new page with user info (thats mean i have token)
        // else i open login modal,
        // in the login modal we have option to register
    }

    const loginUser = async () => {
        try {
            const response = await axios.post(url + '/api/users/login', userLoginDetails);
            localStorage.setItem('token', JSON.stringify(await response.data.token));
            // setToken(response.data.token);
            console.log(response.data);
            handleClose();
        } catch (err) {
            console.log(err);
        }
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
                    <div className="icon-detail" onClick={handleUserAccount}><i className="fas fa-user"></i></div>
                    <div className="icon-detail"><i className="fas fa-shopping-bag"></i><span className="cart-amount">1</span></div>
                </div>
            </div>

            <Modal show={loginModalShow} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Label>Email address :</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required onChange={(e) =>
                        setUserLoginDetails({ email: e.target.value, password: userLoginDetails.password })} />
                    <br />
                    <Form.Label>Password :</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required onChange={(e) =>
                        setUserLoginDetails({ email: userLoginDetails.email, password: e.target.value })} />

                </Modal.Body>
                <Modal.Footer>

                    <button className="ui inverted secondary button" onClick={handleClose}>CLOSE</button>
                    <button className="ui inverted green button" onClick={loginUser}>LOG IN</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navbar;