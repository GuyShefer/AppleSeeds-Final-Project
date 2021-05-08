import React, { useEffect, useState } from 'react';
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
            case 'products':
                // <UsersTable/>
                return <h4>products</h4>
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
                            <li onClick={() => setComponenetToDisplay('products')}>Products</li>
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