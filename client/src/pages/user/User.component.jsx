import React, { useState } from 'react';
import UserHistory from '../../components/userHistory/UserHistory.component';
import UserInfo from '../../components/userInfo/UserInfo.component';
import './user.style.css';

const User = (props) => {

    const [user] = useState(props.location.userDetails);
    const [componenetToDisplay, setComponenetToDisplay] = useState(props.location.display);


    const componentSwitch = (param) => {
        switch (param) {
            case 'usersAccount':
                return <UserInfo user={user} />
            case 'userHistory':
                return <UserHistory />
            default:
                return <UserInfo user={user} />
        }
    }

    return (
        <>
            <div className="user-details-main">
                <div className="nav-user">
                    <ul className="user-nav-list">
                        <li onClick={() => setComponenetToDisplay('usersAccount')}>ACCOUNT</li>
                        <li onClick={() => setComponenetToDisplay('userHistory')}>MY HISTORY</li>
                    </ul>
                </div>
                {componentSwitch(componenetToDisplay)};
            </div>
        </>
    )
}

export default User;