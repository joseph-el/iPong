import React from 'react'
import './Home.css'

import Logout from '../../components/UI/Logout/Logout';
import NotificationsBar from '../../components/UI/NotificationsBar/NotificationsBar';
import ImessagesNotifications from '../../components/UI/iMessagesNotifications/iMessagesNotifications';


export default function Home() {
    return (
        <div className="Home">
            {/* <NotificationCenter/> */}
                {/* <Logout /> */}

                <ImessagesNotifications />
                <br></br>
                <ImessagesNotifications />
                <br></br>

                <ImessagesNotifications />
                <br></br>

                <ImessagesNotifications />
                <br></br>

                <ImessagesNotifications />

        </div>
    );
};