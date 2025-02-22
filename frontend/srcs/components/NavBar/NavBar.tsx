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
import { useSocket } from "../../context/SocketContext";

import { set } from "lodash";
import { selectUser } from "../../state/iPongChatState/iPongChatState";

export default function NavBar() {
  const UserInfo = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();

  const [activeSearch, setActiveSearch] = React.useState([]);
  const [activeGroups, setActiveGroups] = React.useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = React.useState<String | Boolean>(true);
  const [ShowNotificationBar, setShowNotificationBar] = React.useState(false);
  const NotificationCount = useSelector(
    (state: RootState) => state.notification.NotificationCount
  );
  const [users, setUsers] = useState([]);
  const [isReadAll, setIsReadAll] = useState(false);
  const { socket } = useSocket();

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

  const [Groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/chatroom/getAllUnjoinedRooms");

        setGroups(response.data);
      } catch (error) {
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

  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setInputValue(searchTerm);

    if (searchTerm === "") {
      setActiveSearch([]);
      setActiveGroups([]);
      if (!searchTerm) setSearchTerm(true);
      return;
    }

    const matchedGroups = Groups.filter((group) =>
      group.roomName?.toLowerCase().includes(searchTerm)
    );

    const matchedUsers = users
      .filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm) ||
          user.name.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8);

    setActiveGroups(matchedGroups);
    setActiveSearch(matchedUsers);
    // console.log(matchedUsers);
  };

  const handleIconClick = () => {
    setSearchTerm(!searchTerm);
  };

  const handelCloseSearchBar = () => {
    setInputValue("");
    setActiveSearch([]);
    setActiveGroups([]);
  };

  const handelCloseNotificationBar = () => {
    setShowNotificationBar(!ShowNotificationBar);
  };

  const NotificationObject = useSelector(
    (state: RootState) => state.notification.notifications
  );

  useEffect(() => {
    if (socket) {
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

        if (data.entityType === "MessageSent") {
          console.log("socket catched by success ! ", data);
          dispatch(selectUser());
          // dispatch(setUpdate());
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
    }

    return () => {
      socket?.off("notification");
    };
  }, [socket]);

  const handelRouterStateTypeLenght = (routerStateType) => {
    if (routerStateType === null || routerStateType === "" || routerStateType === undefined) {
      return "";
    }
    if ( routerStateType.length > 15) {
      return routerStateType.slice(0, 15) + "...";
    }
    return routerStateType;
  }
  const RouterSlice = useSelector((state: RootState) => state.routerSlice);
  return (
    <div className="nav-bar">
      <div className="page-name-breadcrumb-new">
        <div className="App-Name">{"iPong"}</div>
        <div className="RouterState">
          <div className="Current-page">{RouterSlice.routerState}</div>
          {RouterSlice.routerStateType !== null && (
            <>
              <div className="shift-style">&gt;</div>
              <div className="RouterStateType">
                {handelRouterStateTypeLenght(RouterSlice.routerStateType)}
              </div>
            </>
          )}
        </div>
      </div>

      {isWideScreen && searchTerm ? (
        <SearchIcon onClick={handleIconClick} />
      ) : (
        <div className="search-bar">
          <SearchInput inputValue={inputValue} onChange={handleOnChange} />
          {activeSearch.length != 0 || activeGroups.length != 0 ? (
            <div className="SearchList">
              <SearchList
                InputValue={setInputValue}
                Groups={activeGroups}
                users={activeSearch}
                func={handelCloseSearchBar}
              />
            </div>
          ) : null}
        </div>
      )}

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
                    // style={{ zIndex: ShowNotificationBar ? 9999999 : 0 }}
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
