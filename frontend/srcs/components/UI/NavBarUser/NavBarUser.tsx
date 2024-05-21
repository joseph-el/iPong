import React from "react";

import  { useState, useEffect } from 'react';

import DropDownArrow from './arrow-down.svg'
import './NavBarUser.css'

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";



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

    const isLongEmail = userName.length > 5 && windowWidth < 1150;

    let truncatedUserName = isLongEmail ? userName.substring(0, 4) : userName;


    return (



    <div className="flex items-center gap-4 NavBarUser w-max-content">
 
      <Dropdown placement="bottom-start" backdrop="blur">




     <DropdownTrigger>
        <User
            name={props.fullName}
            description={truncatedUserName + (isLongEmail ? '..' : '') + '@' + mailType}
            avatarProps={{
                src: props.avatar,
            }}
                    
        />
  
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{'@' + props.username}</p>
          </DropdownItem>
          </DropdownMenu>  

{/*         
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{'@' + props.username}</p>
          </DropdownItem>

     
          <DropdownItem key="SeeProfile">
            See Profile
          </DropdownItem>


          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>   */}
      </Dropdown>


    </div>
    );
}


/*
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

    const isLongEmail = userName.length > 5 && windowWidth < 1150;

    let truncatedUserName = isLongEmail ? userName.substring(0, 4) : userName;

    return (
        <>
            <div className="NavBarUser w-max-content">
                <User
                    name={props.fullName}
                    description={truncatedUserName + (isLongEmail ? '..' : '') + '@' + mailType}
                    avatarProps={{
                        src: props.avatar,
                    }}
                    
                />
                <div className='user-info'>
                    <img src={DropDownArrow} alt='arrow down' onClick={props.onClick} className="img-info"/>
                </div>
            </div>
        </>
    );
}

*/


