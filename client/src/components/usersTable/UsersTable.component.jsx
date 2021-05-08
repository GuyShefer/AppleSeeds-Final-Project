import React, { useEffect, useState } from 'react';
import './usersTable.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import Table from 'react-bootstrap/Table'

const UsersTable = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const getAllUsers = async () => {
            const response = await axios.get(url + '/api/users/', { headers: { Authorization: `Bearer ${token}` } });
            setUsers(response.data)
        }
        getAllUsers();
    }, [])

    return (
        <>
            <div className="users-table">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName + ' ' + user.lastName}</td>
                                <td>{user.userType}</td>
                                <td>{user.phone}</td>
                                <td>{`${user.address.street} ${user.address.houseNumber} ,${user.address.city} `}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </>

    )
}

export default UsersTable;