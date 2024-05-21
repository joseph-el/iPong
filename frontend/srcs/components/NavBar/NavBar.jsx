import React from 'react'
import './NavBar.css'

import NavBarUser from '../UI/NavBarUser/NavBarUser';
import { useEffect, useState } from 'react';

// import NotificationButton from '../UI/Button/Notifications/Notifications';
import CoinsButton from '../UI/Button/CoinsButton/CoinsButton';
import SearchInput from '../UI/Input/SearchInput/SearchInput';
import SearchList from '../UI/SearchList/SearchList';
import {users} from "../UI/SearchList/data";
import { SearchIcon } from '../UI/Input/SearchInput/SearchIcon';
import NotifactionIcon from "../UI/Button/Notifications/notificationicon.svg"
import Logout from '../UI/Logout/Logout';
import NotificationsBar from '../UI/NotificationsBar/NotificationsBar';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";

export default function NavBar() {
    const [activeSearch, setActiveSearch] = React.useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchTerm, setSearchTerm] = React.useState(true);
    const [LogoutButton, setLogoutButton] = React.useState(false);
    const [ShowNotificationBar, setShowNotificationBar] = React.useState(false);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const isWideScreen = windowWidth < 600;
      
    const handleOnChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            console.log('empty');
            setActiveSearch([]);
            if (!searchTerm)
                setSearchTerm(true);
            return;
        }
        const matchedUsers = users.filter(user => 
            user.email.toLowerCase().includes(searchTerm) ||
            user.name.toLowerCase().includes(searchTerm)
        ).slice(0, 8);
        
        setActiveSearch(matchedUsers);
        console.log(matchedUsers);
    };


    const handleIconClick = () => {
        setSearchTerm(!searchTerm);
    };

    const handelCloseNotificationBar = () => {
        setShowNotificationBar(!ShowNotificationBar);
    }


    return (
        <div className="nav-bar">
            

            <div className="page-name-breadcrumb">
                
                <div className="text-wrapper">Configurations</div>
                <div className="breadcumb">
                    <div className="div">Main Page</div>
                    <div className="text-wrapper-2">&gt;</div>
                    <div className="text-wrapper-3">profile</div>
                </div>
            </div>


                {
                    (isWideScreen && searchTerm) ? 
                        <SearchIcon  onClick={handleIconClick}    />
                    :
                        <div className="search-bar" >
                            <SearchInput onChange={handleOnChange} /> 
                            {
                                activeSearch.length != 0 ?
                                <div className='SearchList'>
                                    <SearchList  users={activeSearch} />
                                </div> : null
                            }   

                        </div>  
                }
            {
                searchTerm  ?
                    <div className="right-side-menu">


                        <CoinsButton  coins="9999"/>
                        <Dropdown placement="bottom-start" backdrop="blur">
                            <DropdownTrigger>
                                <img src={NotifactionIcon} alt="noticon" className="notification-button" onClick={
                                    () => setShowNotificationBar(!ShowNotificationBar)
                                } />
                            </DropdownTrigger>
                           
                            <DropdownMenu aria-label="User Actions" variant="flat">
                            
                            
                            <DropdownItem>
                                <div className="show-notification-bar">
                                    <NotificationsBar func={handelCloseNotificationBar} />
                                </div>  
                            </DropdownItem>


                            </DropdownMenu>
                             
                            


                        </Dropdown>



                        <NavBarUser fullName="Taha Naceur" email="tahanaceur48@icloud.ma" username="tnaceur"
                            onClick={() => {setLogoutButton(!LogoutButton)}}
                        avatar="https://cdn.intra.42.fr/users/1e212df3b450650d04418d1c03827563/tnaceur.jpg" />
                        


                        
                        {
                            LogoutButton ? 
                                <div className="logout-button-down">
                                    <Logout />
                                </div> : null
                        }

                    
                    
                    </div> : null
            }


            
        </div>
    );
};
