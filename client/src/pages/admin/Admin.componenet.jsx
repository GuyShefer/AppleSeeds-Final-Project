import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PurchasesTable from '../../components/purchasesTable/PurchasesTable.component';
import SaveProduct from '../../components/saveProduct/SaveProduct.component';
import UsersTable from '../../components/usersTable/UsersTable.component';
import './admin.style.css';
import { useHistory } from 'react-router-dom';

const Admin = (props) => {

    const [userType, setUserType] = useState('');
    const [componenetToDisplay, setComponenetToDisplay] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (props.location.userType) {
            setUserType(props.location.userType.type)
        }
    }, [props.location.userType])

    const componentSwitch = (param) => {
        switch (param) {
            case 'users':
                return <UsersTable userType={props.location.userType.type} />
            case 'purchases':
                return <PurchasesTable />
            case 'create':
                return <SaveProduct userType={props.location.userType.type} />
            default:
                return <UsersTable userType={props.location.userType.type} />
        }
    }

    return (
        <>
            {props.location.userType ?
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

                    {props.location.userType ? componentSwitch(componenetToDisplay) : null}
                </div>
                : history.push("/404")}
        </>
    )
}

export default Admin;