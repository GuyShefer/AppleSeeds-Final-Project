import React, { useState } from 'react';
import './registerModal.style.css';
import Modal from 'react-bootstrap/Modal';
import url from '../../utilities/serverURL';
import axios from 'axios';
import Formsy, { addValidationRule } from 'formsy-react';
import MyInput from '../myInput/MyInput.component';
import error from '../../utilities/formsyErrors';
import { ToastContainer } from 'react-toastify';
import { errorToast, infoToast } from '../../utilities/toast';

const RegisterModal = ({ show, close, swapModal }) => {

    const initRegisterAccount = { email: '', password: '', firstName: '', lastName: '', address: { city: '', street: '', houseNumber: '', zip: '' }, phone: '' };
    const [canSubmit, setCanSubmit] = useState(false);

    const enableSubmitButton = () => {
        setCanSubmit(true);
    }

    const disableSubmitButton = () => {
        setCanSubmit(false);
    }

    addValidationRule('isValidPhone', (values, value) => {
        if (value != null) {
            if (value.length < 10) {
                return false
            }
        }
        return true;
    })

    const register = async (registerDetails) => {

        const registerData = initRegisterAccount;
        Object.entries(initRegisterAccount).forEach(([key, value]) => {
            if (key === 'address') {
                Object.keys(initRegisterAccount[key]).forEach(addressKey => {
                    registerData[key][addressKey] = registerDetails[addressKey]
                })
            } else {
                registerData[key] = registerDetails[key];
            }
        })

        try {
            const response = await axios.post(url + '/api/users/', registerData);
            localStorage.setItem('token', JSON.stringify(await response.data.token));
            infoToast('User Registration Successfull!');
            close();
        } catch (err) {
            errorToast(err.response);
        }
    }

    return (
        <>
            <div className="register-modal">
                <Modal show={show} onHide={close} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Create Your Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Formsy className='form' onValidSubmit={register} onValid={enableSubmitButton} onInvalid={disableSubmitButton}>

                            <MyInput label="Email address" type="text" name="email" validations="maxLength:25,isEmail" validationErrors={error} placeHolder="Type your email address..." required />
                            <MyInput label="Password" type="password" name="password" validations="minLength:8,isStrong" validationErrors={error} placeHolder="Type your password..." required />
                            <MyInput label="Confirm password" type="password" name="repassword" validations="equalsField:password" validationErrors={error} placeHolder="Type your password again..." required />
                            <hr />
                            <div className="acc-details-grid">
                                <MyInput label="First name" type="text" name="firstName" validations="isAlpha" validationErrors={error} placeHolder="Type your first name..." required />
                                <MyInput label="Last name" type="text" name="lastName" validations="isAlpha" validationErrors={error} placeHolder="Type your last name..." required />
                                <MyInput label="Phone" type="text" name="phone" validations="isValidPhone" validationErrors={error} placeHolder="Type your phone number..." required />
                                <MyInput label="City" type="text" name="city" validations="isWords" validationErrors={error} placeHolder="Type your city name..." required />
                                <MyInput label="Street" type="text" name="street" validations="isWords" validationErrors={error} placeHolder="Type your street name..." required />
                                <MyInput label="House number" type="number" name="houseNumber" validations="isInt" validationErrors={error} placeHolder="Type your house number.." required />
                                <MyInput label="Zip" type="number" name="zip" validations="isInt" validationErrors={error} placeHolder="Type your zip code.." required />
                            </div>

                            <div className="modal-reg-btn">
                                <button className="large ui inverted green button" type="submit" onClick={register} disabled={!canSubmit}>Sign Up</button>
                            </div>
                        </Formsy>

                    </Modal.Body>
                    <Modal.Footer>
                        <p className="register-q">Already have an account? <span className="sing-up-btn" onClick={swapModal}> Log in</span></p>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
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
            </div>
        </>
    )
}

export default RegisterModal;