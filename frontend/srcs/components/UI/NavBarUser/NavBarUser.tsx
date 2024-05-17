import React from "react";
import {User} from "@nextui-org/react";
import  { useState, useEffect } from 'react';

import DropDownArrow from './arrow-down.svg'
import './NavBarUser.css'


export default function NavBarUser(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const userName = props.email.split('@')[0];
    const mailType = props.email.split('@')[1];

    const isLongEmail = userName.length > 5 && windowWidth < 760;

    let truncatedUserName = isLongEmail ? userName.substring(0, 4) : userName;

    return (
        <>
            <div className="NavBarUser w-full w-48 sm:w-48 md:w-64 lg:w-max-content xl:w-max-content 2xl:w-max-content">
                <User
                    name={props.fullName}
                    description={truncatedUserName + (isLongEmail ? '..' : '') + '@' + mailType}
                    avatarProps={{
                        src: props.avatar,
                    }}
                />
                <div className='user-info'>
                    <img src={DropDownArrow} alt='arrow down' className="img-info"/>
                </div>
            </div>
        </>
    );
}


