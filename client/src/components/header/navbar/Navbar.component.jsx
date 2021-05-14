import React, { useEffect, useState } from 'react';
import './navbar.style.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import url from '../../../utilities/serverURL';
import { connect } from 'react-redux';


const Navbar = ({ cart }) => {

    const [show, setShow] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [registerModalShow, setRegisterModalShowModalShow] = useState(false);
    const [userLoginDetails, setUserLoginDetails] = useState({ email: '', password: '' });
    const [userRegister, setUserRegister] = useState({ email: '', password: '', firstName: '', lastName: '', address: { city: '', street: '', houseNumber: '', zip: '' }, phone: '' });
    const [user, setUser] = useState({});
    const [showUserDropDown, setShowUserDropDown] = useState(false);
    const [cartCounter, setCartCounter] = useState(0);

    useEffect(() => {
        let count = 0;
        cart.forEach(item => {
            count += item.qty;
        });
        setCartCounter(count);
    }, [cart, cartCounter])

    const showDropdown = () => {
        setShow(!show);
    }
    const hideDropdown = () => {
        setShow(!show);
    }
    const handleClose = () => {
        setLoginModalShow(false);
        setRegisterModalShowModalShow(false);
    }

    const handleShowUserDropDown = () => {
        setShowUserDropDown(!showUserDropDown);
    }

    const handleUserAccount = async () => {
        console.log(user);
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const response = await axios.get(url + '/api/users/getAccInfo', { headers: { Authorization: `Bearer ${token}` } })
            setUser(response.data);
            console.log(response.data);
            /// notificate the user that the log in succsess

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
            console.log(response.data.token);
            setUser(response.data.user[0])
            handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    const registerUser = async () => {
        console.log(userRegister);
        try {
            const response = await axios.post(url + '/api/users/', userRegister);
            console.log(response.data);
            // setToken(response.data.token);
            handleClose();
        } catch (err) {
            console.log(err.message);
        }
    }

    const swapToRegisterModal = () => {
        setLoginModalShow(false);
        setRegisterModalShowModalShow(true);
    }

    const swapToLoginModal = () => {
        setRegisterModalShowModalShow(false);
        setLoginModalShow(true);
    }

    return (
        <>
            <div className="nav-bar">
                <Link to="/"><div className="logo"></div></Link>

                <div className="nav-list-menu">
                    <ul className="nav-list">
                        <li>
                            <Dropdown show={show}
                                onMouseEnter={showDropdown}
                                onMouseLeave={hideDropdown}>
                                <Dropdown.Toggle className="nav-item" > SHOP </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Link to="/products" className="dropdown-item" role="button">Shop All</Link>
                                    <Link to={{ pathname: "/products/byType", productsType: 'earrings', userType: user.userType }} className="dropdown-item" role="button">Earrings</Link>
                                    <Link to={{ pathname: "/products/byType", productsType: 'rings', userType: user.userType }} className="dropdown-item" role="button">Rings</Link>
                                    <Link to={{ pathname: "/products/byType", productsType: 'necklaces', userType: user.userType }} className="dropdown-item" role="button">Necklaces</Link>
                                    <Link to={{ pathname: "/products/byType", productsType: 'bracelets', userType: user.userType }} className="dropdown-item" role="button">Bracelets</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="nav-list-item"><span>FAQ</span></li>
                        <li className="nav-list-item"><span>OUR STORY</span></li>
                        {user.userType === 'admin' ? <Link to={{ pathname: "/admin", userType: { type: `${user.userType}` } }}> <li className="nav-list-item"><span>ADMIN</span></li> </Link> : null}
                    </ul>
                </div>

                <div className="user-details">
                    <Dropdown show={showUserDropDown && Object.keys(user).length > 0} menualign={{ lg: 'left' }} onMouseEnter={handleShowUserDropDown} onMouseLeave={handleShowUserDropDown}>
                        {/* ############## */}
                        <Dropdown.Toggle className="user-icon-dropdown" onClick={Object.keys(user).length === 0 ? handleUserAccount : null} ><i className="fas fa-user"></i> </Dropdown.Toggle>
                        <Dropdown.Menu >
                        <Link to="/myAccount" className="dropdown-item" role="button">My Account</Link>
                            <Dropdown.Item eventKey="1">My Account</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Purchases History</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    <div className="icon-detail"><Link to="/cart"><i className="fas fa-shopping-bag"></i><span className="cart-amount">{cartCounter}</span></Link></div>
                </div>
            </div>

            {/* LOGIN MODAL */}
            <Modal show={loginModalShow} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Log in to your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Label>Email address :</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required onChange={(e) =>
                        setUserLoginDetails({ email: e.target.value, password: userLoginDetails.password })} />
                    <br />
                    <Form.Label>Password :</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required onChange={(e) =>
                        setUserLoginDetails({ email: userLoginDetails.email, password: e.target.value })} />
                    <br />
                    <div className="modal-btns">
                        <button className="ui inverted green button" onClick={loginUser}>LOG IN</button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <p className="register-q">No account? <span className="sing-up-btn" onClick={swapToRegisterModal}> Sign up</span></p>
                </Modal.Footer>
            </Modal>

            {/* REGISTER MODAL */}
            <Modal show={registerModalShow} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Control type="email" placeholder="Enter Email" required onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.email = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="password" placeholder="Enter Password" required onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.password = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="text" placeholder="First Name" onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.firstName = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="text" placeholder="Last Name" onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.lastName = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="text" placeholder="Phone Number" onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.phone = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="text" placeholder="City" onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.address.city = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="text" placeholder="Street" onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.address.street = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="number" placeholder="House Number" onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.address.houseNumber = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />
                    <Form.Control type="number" placeholder="Zip Code" onChange={(e) => {
                        const tempUser = userRegister;
                        tempUser.address.zip = e.target.value;
                        setUserRegister(tempUser)
                    }} />
                    <br />

                    <div className="modal-btns">
                        <button className="ui inverted green button" onClick={registerUser}>REGISTER</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <p className="register-q">Already have an account? <span className="sing-up-btn" onClick={swapToLoginModal}> Log in</span></p>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.shop.cart,
    }
}

export default connect(mapStateToProps)(Navbar);