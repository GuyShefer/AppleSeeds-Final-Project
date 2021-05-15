import React, { useState } from 'react';
import './registerModal.style.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import url from '../../utilities/serverURL';
import axios from 'axios';


const RegisterModal = ({ show, close, swapModal }) => {

    const initRegisterAccount = { email: '', password: '', firstName: '', lastName: '', address: { city: '', street: '', houseNumber: '', zip: '' }, phone: '' };
    const [registerAccount, setRegisterAccount] = useState(initRegisterAccount);

    const register = async () => {
        console.log(registerAccount);
        try {
            const response = await axios.post(url + '/api/users/', registerAccount);
            localStorage.setItem('token', JSON.stringify(await response.data.token));
            close();
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <Modal show={show} onHide={close} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body className="register-modal">

                    <Form.Control type="email" placeholder="Enter Email" required onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, email: e.target.value });
                    }} />

                    <Form.Control type="password" placeholder="Enter Password" required onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, password: e.target.value });
                    }} />

                    <Form.Control type="text" placeholder="First Name" onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, firstName: e.target.value });
                    }} />

                    <Form.Control type="text" placeholder="Last Name" onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, lastName: e.target.value });
                    }} />

                    <Form.Control type="text" placeholder="Phone Number" onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, phone: e.target.value });
                    }} />

                    <Form.Control type="text" placeholder="City" onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, address: { ...registerAccount.address, city: e.target.value } });
                    }} />

                    <Form.Control type="text" placeholder="Street" onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, address: { ...registerAccount.address, street: e.target.value } });
                    }} />

                    <Form.Control type="number" placeholder="House Number" onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, address: { ...registerAccount.address, houseNumber: e.target.value } });
                    }} />

                    <Form.Control type="number" placeholder="Zip Code" onChange={(e) => {
                        return setRegisterAccount({ ...registerAccount, address: { ...registerAccount.address, zip: e.target.value } });
                    }} />

                    <div className="modal-btns">
                        <button className="ui inverted green button" onClick={register}>REGISTER</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <p className="register-q">Already have an account? <span className="sing-up-btn" onClick={swapModal}> Log in</span></p>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterModal;