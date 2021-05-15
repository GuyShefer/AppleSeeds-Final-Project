import React, { useEffect, useState } from 'react';
import './logoutModal.style.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import url from '../../utilities/serverURL';
import { useHistory } from 'react-router-dom';

const LogoutModal = ({ show, close, clearUserState }) => {

    const [showModal, setShowModal] = useState();
    const [logoutAll, setLogoutAll] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setShowModal(show);
    }, [setShowModal, show])

    const handleClose = () => {
        setShowModal(false);
        close();
    }

    const logout = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        let subUrl = logoutAll ? '/api/users/logout/all' : '/api/users/logout';

        try {
            await axios.post(url + subUrl, null, { headers: { Authorization: `Bearer ${token}` } });
        } catch (err) {
            console.log(err.response.data);
        }
        localStorage.removeItem('token');
        handleClose();
        clearUserState();
        history.push('/');
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>LOG OUT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are tou sure you want to sign out?</p>

                    <div className="ui checkbox">
                        <input type="checkbox" name="logoutall" value={logoutAll} onChange={e => setLogoutAll(e.target.checked)} />
                        <label>Log out from all devices</label>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-btns">
                        <button className="ui inverted primary  button" onClick={logout}>Yes, log out</button>
                        <button className="ui inverted secondary button" onClick={handleClose}>Cancel</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LogoutModal;