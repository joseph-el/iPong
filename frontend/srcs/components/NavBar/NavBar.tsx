import React from "react";
import "./NavBar.css";

import NavBarUser from "../UI/NavBarUser/NavBarUser";
import { useEffect, useState } from "react";

// import NotificationButton from '../UI/Button/Notifications/Notifications';
import CoinsButton from "../UI/Button/CoinsButton/CoinsButton";
import SearchInput from "../UI/Input/SearchInput/SearchInput";
import SearchList from "../UI/SearchList/SearchList";
import { users } from "../UI/SearchList/data";
import { SearchIcon } from "../UI/Input/SearchInput/SearchIcon";
import NotifactionIcon from "../UI/Button/Notifications/notificationicon.svg";
import Logout from "../UI/Logout/Logout";
import NotificationsBar from "../UI/NotificationsBar/NotificationsBar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { Show } from "@chakra-ui/react";


import api from "../../api/posts"
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";


export default function NavBar() {

  const UserInfo = useSelector(
    (state: RootState) => state.userState
  );

  const [activeSearch, setActiveSearch] = React.useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = React.useState(true); // search bar is active
  const [LogoutButton, setLogoutButton] = React.useState(false); // logout button is active
  const [ShowNotificationBar, setShowNotificationBar] = React.useState(false); // notification bar is active

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isWideScreen = windowWidth < 600;

  const handleOnChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      console.log("empty");
      setActiveSearch([]);
      if (!searchTerm) setSearchTerm(true);
      return;
    }
    const matchedUsers = users
      .filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm) ||
          user.name.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8);

    setActiveSearch(matchedUsers);
    console.log(matchedUsers);
  };

  const handleIconClick = () => {
    setSearchTerm(!searchTerm);
  };

  const handelCloseNotificationBar = () => {
    setShowNotificationBar(!ShowNotificationBar);
  };


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
      {isWideScreen && searchTerm ? (
        <SearchIcon onClick={handleIconClick} />
      ) : (
        <div className="search-bar">
          <SearchInput onChange={handleOnChange} />
          {activeSearch.length != 0 ? (
            <div className="SearchList">
              <SearchList users={activeSearch} />
            </div>
          ) : null}
        </div>
      )}

      {/* RIGHT ITEMS  */}
      {searchTerm ? (
        <div className="right-side-menu">
          <CoinsButton coins="9999" />

          <Dropdown
            className="drop-down-notifications"
            placement="bottom"
            backdrop="blur"
            isOpen={ShowNotificationBar}
            shouldBlockScroll={false}
          >
            <DropdownTrigger>
              <img
                src={NotifactionIcon}
                alt="noticon"
                className="notification-button"
                style={{ zIndex: ShowNotificationBar ? 999999 : 0}}
                onClick={() => {
                  setShowNotificationBar(!ShowNotificationBar);
                }}
              />
            </DropdownTrigger>

            <DropdownMenu>
              <DropdownItem className="show-notification-bar centered-notification-bar">
                <NotificationsBar func={handelCloseNotificationBar} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavBarUser
            fullName={UserInfo.firstName + " " + UserInfo.lastName}
            email={UserInfo.email}
            username={UserInfo.username}
            onClick={() => {}}
            avatar={UserInfo.picture}
         />

        </div>
      ) : null}
    </div>
  );
}
