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
        var currentTime = new Date(parseInt(date));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var date = day + "/" + month + "/" + year;
        return date
    }

    return (
        <>
            user history
            {/* data, amount of items, total price */}
            <div className="user-purchase-history">

                {console.log(purchases)}
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
                                    <td>{new Date(purchase.date).toUTCString()}</td>
                                    <td>{converJsonToDate(purchase.date)}</td>
                                    <td>{purchase.totalPrice}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default UserHistory;