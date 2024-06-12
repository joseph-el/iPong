import React from "react";
import "./NavBar.css";

import NavBarUser from "../UI/NavBarUser/NavBarUser";
import { useEffect, useRef, useState } from "react";

// import NotificationButton from '../UI/Button/Notifications/Notifications';
import CoinsButton from "../UI/Button/CoinsButton/CoinsButton";
import SearchInput from "../UI/Input/SearchInput/SearchInput";
import SearchList from "../UI/SearchList/SearchList";
// import { users } from "../UI/SearchList/data";
import { SearchIcon } from "../UI/Input/SearchInput/SearchIcon";
import NotifactionIcon from "../UI/Button/Notifications/notificationicon.svg";
import Logout from "../UI/Logout/Logout";
import NotificationsBar from "../UI/NotificationsBar/NotificationsBar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Spacer,
  DropdownItem,
} from "@nextui-org/react";

import { Badge } from "@nextui-org/react";
import api from "../../api/posts";
import { useSelector } from "react-redux";
import { addNotification } from "../../state/Notifications/NotificationsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { io } from "socket.io-client";
import {
  setNotificationCount,
  setNotification,
} from "../../state/Notifications/NotificationsSlice";
import { getAvatarSrc } from "../../utils/getAvatarSrc";

export default function NavBar() {
  const UserInfo = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();

  const [activeSearch, setActiveSearch] = React.useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = React.useState(true);
  const [ShowNotificationBar, setShowNotificationBar] = React.useState(false);
  const NotificationCount = useSelector(
    (state: RootState) => state.notification.NotificationCount
  );
  const [users, setUsers] = useState([]);
  const [isReadAll, setIsReadAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/notifications/readAllNotifications");
        dispatch(setNotificationCount(0));

      } catch (error) {
        console.error("error: ", error);
      }
    };
    isReadAll && fetchData();
  }, [isReadAll]);


  // TODO: fetch all users from the server
  
  const [Groups, setGroups] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try { 

        const response = api.get("/groups/allgroups");


      } 
      catch (error) {
        console.error("error Groups: ", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users/allusers");

        const _users = response.data.map((user, index) => {
          return {
            gender: user.username.startsWith("F-;") ? "female" : "male",
            id: index,
            UserId: user.userId,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            avatar: user.avatar,
          };
        });
        setUsers(_users);
      } catch (error) {
        console.error("error: ", error);
      }
    };
    fetchData();
  }, []);

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
    // console.log(matchedUsers);
  };

  const handleIconClick = () => {
    setSearchTerm(!searchTerm);
  };

  const handelCloseSearchBar = () => {
    setActiveSearch([]);
  };

  const handelCloseNotificationBar = () => {
    setShowNotificationBar(!ShowNotificationBar);
  };

  let socket;
  const accessToken = document?.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

  const NotificationObject = useSelector(
    (state: RootState) => state.notification.notifications
  );
  useEffect(() => {
    socket = io("http://localhost:3000/notifications", {
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
    });
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("sendNotification", (data) => {
      // TODO: check if the notification is already exist in the store

 
      const existingNotificationIndex = NotificationObject.findIndex(
        (notification) =>
          notification.entityType === data.entityType &&
          notification.senderId === data.senderId
      );

      if (existingNotificationIndex !== -1) {
        const updatedNotifications = [...NotificationObject];
        updatedNotifications.splice(existingNotificationIndex, 1);
        dispatch(setNotification(updatedNotifications));
      }

      dispatch(
        addNotification({
          NotificationId: data.id,
          senderId: data.senderId,
          receiverId: data.receiverId,
          RoomId: data.roomId,
          entityType: data.entityType,
          createdAt: data.createdAt,
        })
      );

      dispatch(setNotificationCount(NotificationCount + 1));
      
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="nav-bar">
      {/* LEFT ITEMS  state: ✅*/}
      <div className="page-name-breadcrumb">

        {/* TODO: set the current page using store redux! */}
        <div className="text-wrapper">
          {"iPong" + "\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f"}
        </div>
        <div className="breadcumb">
          <div className="div">Main Page</div>
          <div className="text-wrapper-2">&gt;</div>
          <div className="text-wrapper-3">profile</div>
        </div>
      </div>


      {isWideScreen && searchTerm ? (
        <SearchIcon onClick={handleIconClick} />
      ) : (
        <div className="search-bar">
          <SearchInput onChange={handleOnChange} />
          {activeSearch.length != 0 || Groups.length != 0 ? (
            <div className="SearchList">
              <SearchList Groups={Groups} users={activeSearch} func={handelCloseSearchBar} />
            </div>
          ) : null}
        </div>
      )}
      

      {/* RIGHT ITEMS  */}
      {searchTerm ? (
        <div className="right-side-menu">
          <CoinsButton coins={UserInfo.wallet} />

          <Dropdown
            className="drop-down-notifications"
            placement="bottom"
            backdrop="blur"
            isOpen={ShowNotificationBar}
            shouldBlockScroll={false}
          >
            <DropdownTrigger>
              <div className="notificationBadge">
                <Badge
                  isInvisible={NotificationCount === 0}
                  size="md"
                  color="primary"
                  content={NotificationCount > 9 ? "9+" : NotificationCount}
                  isOneChar
                  shape="rectangle"
                  showOutline={true}
                >
                  <img
                    src={NotifactionIcon}
                    alt="noticon"
                    className="notification-button"
                    style={{ zIndex: ShowNotificationBar ? 999999 : 0 }}
                    onClick={() => {
                      setIsReadAll(true);
                
                      setShowNotificationBar(!ShowNotificationBar);
                    }}
                  />
                </Badge>
              </div>
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
            avatar={getAvatarSrc(UserInfo.picture, UserInfo.gender)}
          />
        </div>
      ) : null}



    </div>
  );
}
