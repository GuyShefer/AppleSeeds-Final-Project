import React, { useEffect, useState } from 'react';
import './purchasesTable.style.css';
import axios from 'axios';
import url from '../../utilities/serverURL';
import Table from 'react-bootstrap/Table'


const PurchasesTable = () => {

    const [purchases, setPurchases] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));
    

    useEffect(() => {
        const getAllPurchases = async () => {
            const response = await axios.get(url + '/api/purchases/', { headers: { Authorization: `Bearer ${token}` } });
            setPurchases(response.data)
        }
        getAllPurchases();
    }, [token]);



    const deletePurchaseById = (id, index) => {
        axios.delete(url + '/api/purchases/' + id, { headers: { Authorization: `Bearer ${token}` } });
        const tempPurchases = purchases;
        tempPurchases.splice(index, 1);
        setPurchases(tempPurchases);
        setForceUpdate(!forceUpdate);
    }

    return (
        <>
            <div className="purchases-table">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Total Price</th>
                            <th>Purchase Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => {
                            return <tr key={purchase._id}>
                                <td>{index + 1}</td>
                                <td>{purchase.ownerName}</td>
                                <td>{purchase.totalPrice}</td>
                                <td>{new Date(purchase.date).toLocaleDateString("en-US")}</td>
                                <td onClick={() => deletePurchaseById(purchase._id, index)}><i className="far fa-trash-alt"></i></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default PurchasesTable;