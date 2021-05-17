import React, { useState } from 'react';
import './loginModal.style.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import url from '../../utilities/serverURL';
import Formsy, { addValidationRule } from 'formsy-react';
import MyInput from '../myInput/MyInput.component';
import error from '../../utilities/formsyErrors';
import { ToastContainer } from 'react-toastify';
import { errorToast, infoToast } from '../../utilities/toast';


const LoginModal = ({ show, close, swapModal, setUser }) => {

    const [canSubmit, setCanSubmit] = useState(false);

    const enableSubmitButton = () => {
        setCanSubmit(true);
    }

    const disableSubmitButton = () => {
        setCanSubmit(false);
    }

    addValidationRule('isStrong', (values, value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (regex.test(value)) {
            return true;
        }
        return false;
    })

    const loginUser = async (loginDetails) => {
        try {
            const response = await axios.post(url + '/api/users/login', loginDetails);
            localStorage.setItem('token', JSON.stringify(await response.data.token));
            setUser(response.data.user[0]);
            infoToast('Login success!')
            close();
        } catch (err) {
            errorToast(err.response.data);
        }
    }

    return (
        <>
            <Modal show={show} onHide={close} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Log in to your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formsy className='form' onValidSubmit={loginUser} onValid={enableSubmitButton} onInvalid={disableSubmitButton}>
                        <MyInput label="Email address" type="text" name="email" validations="maxLength:25,isEmail" validationErrors={error} placeHolder="Type your email address..." required />
                        <MyInput label="Password" type="password" name="password" validations="minLength:8,isStrong" validationErrors={error} placeHolder="Type your password..." required />
                        <div className="div-btn-submit">
                            <button className="large ui inverted green button" type="submit" disabled={!canSubmit}>Sign In</button>
                        </div>
                    </Formsy>

                </Modal.Body>
                <Modal.Footer>
                    <p className="register-q">No account? <span className="sing-up-btn" onClick={swapModal}>Sign up</span></p>
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default LoginModal;