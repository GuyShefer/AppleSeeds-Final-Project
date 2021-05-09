import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateProduct from '../../components/createProduct/CreateProduct.component';
import PurchasesTable from '../../components/purchasesTable/PurchasesTable.component';
import UsersTable from '../../components/usersTable/UsersTable.component';
import './admin.style.css';

const Admin = (props) => {

    const [userType, setUserType] = useState('');
    const [componenetToDisplay, setComponenetToDisplay] = useState('');

    useEffect(() => {
        if (props.location.userType) {
            setUserType(props.location.userType.type)
        }
    }, [props.location.userType])

    const componentSwitch = (param) => {
        switch (param) {
            case 'users':
                return <UsersTable />
            case 'purchases':
                return <PurchasesTable />
            case 'create':
                return <CreateProduct />
            default:
                return <UsersTable />
        }
    }

    return (
        <>
            {userType === 'admin' ?
                <div className="main-admin">
                    <hr />
                    <div className="admin-nav-bar">
                        <ul>
                            <li onClick={() => setComponenetToDisplay('users')}>Users</li>
                            <li onClick={() => setComponenetToDisplay('purchases')}>Purchases</li>
                            <li onClick={() => setComponenetToDisplay('create')}>Create Product</li>
                            <li><Link to={{ pathname: "/products", userType: { type: `${userType}` } }}><span> All Products</span></Link></li>
                        </ul>
                    </div>
                    {/*  */}
                    {componentSwitch(componenetToDisplay)}
                </div>

                : null}
        </>
    )
}

export default Admin;