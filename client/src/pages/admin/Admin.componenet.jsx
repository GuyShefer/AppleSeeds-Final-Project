import React, { useEffect, useState } from 'react';
import './admin.style.css';

const Admin = (props) => {

    const [userType, setUserType] = useState('');

    useEffect(() => {
        if (props.location.userType) {
            setUserType(props.location.userType.type)
        }
    }, [props.location.userType])

    return (
        <>
            {userType === 'admin' ?
                <div className="main-admin">
                    <hr />
                    <div className="admin-nav-bar">
                        <ul>
                            <li>Users</li>
                            <li>Purchases</li>
                            <li>Products</li>
                        </ul>
                    </div>
                    {/*  */}
                </div>

                : null}
        </>
    )
}

export default Admin;