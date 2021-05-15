import React, { useEffect, useState } from 'react';
import './userHistory.style.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import url from '../../utilities/serverURL';

const UserHistory = () => {

    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const getAllUserPurchases = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            try {
                const response = await axios.get(url + '/api/purchases/byUser', { headers: { Authorization: `Bearer ${token}` } });
                setPurchases(response.data)
            } catch (err) {
                console.log(err.response.data);
            }
        }
        getAllUserPurchases();
    }, [])

    const converJsonToDate = (date) => {
        const currentTime = new Date(date);
        const month = currentTime.getMonth() + 1;
        const day = currentTime.getDate();
        const year = currentTime.getFullYear();
        return  day + "/" + month + "/" + year; 
    }

    return (
        <>
            <div className="user-purchase-history">

                <div className="user-history-table">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Items</th>
                                <th>Date</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase, index) => {
                                return (
                                    <tr key={purchase._id}>
                                        <td>{index + 1}</td>
                                        <td>{purchase.products.length}</td>
                                        <td>{converJsonToDate(purchase.date)}</td>
                                        <td>&#8362;{purchase.totalPrice}</td>
                                    </tr>)
                            })}
                        </tbody>
                    </Table>
                </div>

                <div className="account-history-img"></div>
            </div>
        </>
    )
}

export default UserHistory;