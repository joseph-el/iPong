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
import { Show } from '@chakra-ui/react';

export default function NavBar() {
    const [activeSearch, setActiveSearch] = React.useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchTerm, setSearchTerm] = React.useState(true); // search bar is active
    const [LogoutButton, setLogoutButton] = React.useState(false); // logout button is active
    const [ShowNotificationBar, setShowNotificationBar] = React.useState(false); // notification bar is active

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
            
            {/* LEFT ITEMS  state: ✅*/}
            <div className="page-name-breadcrumb">
                {/* TODO: set the current page using store redux! */}
                <div className="text-wrapper">Configurations</div>
                <div className="breadcumb">
                    <div className="div">Main Page</div>
                    <div className="text-wrapper-2">&gt;</div>
                    <div className="text-wrapper-3">profile</div>
                </div>
            </div>

            {/* SEARCH ITEMS  */}
            {
                (isWideScreen && searchTerm) ? 
                    <SearchIcon  onClick={handleIconClick}    />
                :
                    <div className="search-bar" >
                        <SearchInput onChange={handleOnChange} /> 
                        {
                            activeSearch.length != 0 ?
                                <div className='SearchList'>
                                    <SearchList users={activeSearch} />
                                </div>  : null
                        }
                    </div>
            }
            
            {/* RIGHT ITEMS  */}
            {
                searchTerm  ?
                    <div className="right-side-menu">

                        <CoinsButton  coins="9999"/>

                        <Dropdown className='drop-down-notifications' placement="bottom" backdrop="blur" isOpen={ShowNotificationBar} shouldBlockScroll={false} >
                            <DropdownTrigger>
                                <img src={NotifactionIcon} alt="noticon" className="notification-button" onClick={
                                    () => {setShowNotificationBar(!ShowNotificationBar);}
                                } />
                            </DropdownTrigger>

                            <DropdownMenu >


                                <DropdownItem className='show-notification-bar centered-notification-bar'>
                                   
                                        <NotificationsBar   func={handelCloseNotificationBar} />
                               
                                </DropdownItem>

                    

                            </DropdownMenu>

                        </Dropdown>

                        <NavBarUser fullName="Taha Naceur" email="tahanaceur48@icloud.ma" username="tnaceur"
                            onClick={() => {}}
                            avatar="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7" />
                    
                    
                    </div> : null
            }
        </div>
    );
};



/*

            {
                (isWideScreen && searchTerm) ? 
                    <SearchIcon  onClick={handleIconClick}    />
                :

                
                    <div className="search-bar" >

                        <Dropdown placement="bottom-start" backdrop="blur" isOpen={searchTerm} shouldBlockScroll={false} >
                        
                    <DropdownTrigger>
                        <SearchInput onChange={handleOnChange} /> 
                    </DropdownTrigger>
                        
                    <DropdownMenu  aria-label="User Actions" variant="flat"  >
                        <DropdownItem >
                        {
                            activeSearch.length != 0 ?
                            <div className='SearchList'>
                                <SearchList users={activeSearch} />
                            </div> : null
                        }
                        </DropdownItem>
                    </DropdownMenu>
                        
                </Dropdown>
                    </div>  


            }
*/