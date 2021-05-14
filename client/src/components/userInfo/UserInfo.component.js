import React, { useState } from 'react';
import './userInfo.style.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import url from '../../utilities/serverURL';


const UserInfo = (props) => {

    const [userData, setUserData] = useState(props.user);

    const updateUser = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            delete userData._id;
            delete userData.__v;
            delete userData.userType;
            const response = await axios.put(url + '/api/users', userData, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data)
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <>
            <div className="user-info-form">
                <Form onSubmit={updateUser}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={userData.email} onChange={(e) => {
                            return setUserData({ ...userData, email: e.target.value });
                        }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" value={userData.firstName} onChange={(e) => {
                            return setUserData({ ...userData, firstName: e.target.value });
                        }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" value={userData.lastName} onChange={(e) => {
                            return setUserData({ ...userData, lastName: e.target.value });
                        }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Phone Number" value={userData.phone} onChange={(e) => {
                            return setUserData({ ...userData, phone: e.target.value });
                        }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>City Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter City Name" value={userData.address.city} onChange={(e) => {
                            return setUserData({ ...userData, address: { ...userData.address, city: e.target.value } });
                        }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" placeholder="Enter Street" value={userData.address.street} onChange={(e) => {
                            return setUserData({ ...userData, address: { ...userData.address, street: e.target.value } });
                        }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter House Number" value={userData.address.houseNumber} onChange={(e) => {
                            return setUserData({ ...userData, address: { ...userData.address, houseNumber: e.target.value } });
                        }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="number" placeholder="Enter Zip" value={userData.address.zip} onChange={(e) => {
                            return setUserData({ ...userData, address: { ...userData.address, zip: e.target.value } });
                        }} />
                    </Form.Group>
                    <div className="btn-submit">
                        <Button variant="primary" type="submit">Update</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default UserInfo;