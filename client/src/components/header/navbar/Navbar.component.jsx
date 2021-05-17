import React, { useEffect, useState } from 'react';
import './navbar.style.css';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { Link } from 'react-router-dom';
import url from '../../../utilities/serverURL';
import { connect } from 'react-redux';
import LogoutModal from '../../logoutModal/LogoutModal.component';
import RegisterModal from '../../registerModal/RegisterModal.component';
import LoginModal from '../../loginModal/LoginModal.component';


const Navbar = ({ cart }) => {

    const [user, setUser] = useState({});
    const [showNavDropDown, setShowNavDropDown] = useState(false);
    const [showUserDropDown, setShowUserDropDown] = useState(false);
    const [cartCounter, setCartCounter] = useState(0);

    const [logoutModal, setLogoutModal] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [registerModalShow, setRegisterModalShowModalShow] = useState(false);

    useEffect(() => {
        let count = 0;
        cart.forEach(item => {
            count += item.qty;
        });
        setCartCounter(count);
    }, [cart, cartCounter])

    const showDropdown = () => {
        setShowNavDropDown(!showNavDropDown);
    }
    const hideDropdown = () => {
        setShowNavDropDown(!showNavDropDown);
    }
    const handleClose = () => {
        setLoginModalShow(false);
        setRegisterModalShowModalShow(false);
    }

    const handleShowUserDropDown = () => {
        setShowUserDropDown(!showUserDropDown);
    }

    const handleUserAccount = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const response = await axios.get(url + '/api/users/getAccInfo', { headers: { Authorization: `Bearer ${token}` } })
            setUser(response.data);
            console.log(response.data);
            /// notificate the user that the log in succsess

        } else {
            setLoginModalShow(true);
        }
    }

    const onLoginSetUser = (userAcc) => {
        setUser(userAcc);
    }

    const swapModal = () => {
        setLoginModalShow(!loginModalShow);
        setRegisterModalShowModalShow(!registerModalShow);
    }

    // logout modal handle
    const handleLogoutModal = () => {
        setLogoutModal(!logoutModal);
    }

    const clearUserState = () => {
        setUser({});
    }

    return (
        <>
            <div className="nav-bar">
                <Link to="/"><div className="logo"></div></Link>

                <div className="nav-list-menu">
                    <ul className="nav-list">
                        <li>
                            <Dropdown show={showNavDropDown}
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
                        <li className="nav-list-item"><Link to={"/faq"}><span>FAQ</span></Link></li>
                        <li className="nav-list-item"><span>OUR STORY</span></li>
                        {user.userType === 'admin' ? <Link to={{ pathname: "/admin", userType: { type: `${user.userType}` } }}> <li className="nav-list-item"><span>ADMIN</span></li> </Link> : null}
                    </ul>
                </div>

                <div className="user-details">
                    <Dropdown show={showUserDropDown && Object.keys(user).length > 0} menualign={{ lg: 'left' }} onMouseEnter={handleShowUserDropDown} onMouseLeave={handleShowUserDropDown}>
                        <Dropdown.Toggle className="user-icon-dropdown" onClick={Object.keys(user).length === 0 ? handleUserAccount : null} ><i className="fas fa-user"></i> </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Link to={{ pathname: "/myAccount", userDetails: user, display: 'usersAccount' }} className="dropdown-item" role="button">My Account</Link>
                            <Link to={{ pathname: "/myAccount", userDetails: user, display: 'userHistory' }} className="dropdown-item" role="button">Purchases History</Link>
                            <Dropdown.Item onClick={handleLogoutModal}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="icon-detail"><Link to="/cart"><i className="fas fa-shopping-bag"></i><span className="cart-amount">{cartCounter}</span></Link></div>
                </div>
            </div>

            <LoginModal show={loginModalShow} close={handleClose} swapModal={swapModal} setUser={onLoginSetUser} />
            <RegisterModal show={registerModalShow} close={handleClose} swapModal={swapModal} />
            <LogoutModal show={logoutModal} close={handleLogoutModal} clearUserState={clearUserState} />
        </>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.shop.cart,
    }
}

export default connect(mapStateToProps)(Navbar);