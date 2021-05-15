import React, { useState } from 'react';
import './loginModal.style.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import url from '../../utilities/serverURL';


const LoginModal = ({ show, close, swapModal, setUser }) => {

    const [userLoginDetails, setUserLoginDetails] = useState({ email: '', password: '' });


    const loginUser = async () => {
        try {
            const response = await axios.post(url + '/api/users/login', userLoginDetails);
            localStorage.setItem('token', JSON.stringify(await response.data.token));
            // setToken(response.data.token);
            console.log(response.data);
            console.log(response.data.token);
            setUser(response.data.user[0])
            close();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Modal show={show} onHide={close} centered>
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
                    <p className="register-q">No account? <span className="sing-up-btn" onClick={swapModal}> Sign up</span></p>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginModal;