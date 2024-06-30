import React, { useEffect } from "react";
import "./SideBar.css";
import { useState } from "react";

import iPongLogo from "./assets/iPongLogo.svg";
import LogoHomeNoSelected from "./assets/LogoHomeNoSelected.svg";
import LogoHomeSelected from "./assets/LogoHomeSelected.svg";
import LogoChatNoSelected from "./assets/LogoChatNoSelected.svg";
import LogoChatSelected from "./assets/LogoChatSelected.svg";
import LogoStoreNoSelected from "./assets/LogoStoreNoSelected.svg";
import LogoStoreSelected from "./assets/LogoStoreSelected.svg";
import LogoUserProfileNoSelected from "./assets/LogoUserProfileNoSelected.svg";
import LogoUserProfileSelected from "./assets/LogoUserProfileSelected.svg";

import { useLocation , useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setRouterState,
  setRouterStateType,
} from "../../state/RouterState/routerSlice";
import { get } from "lodash";

enum SideBarIcons {
  UNK = 0,
  HOME = 1,
  CHAT = 2,
  STORE = 3,
  USER_PROFILE = 4,
}

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const [selectedIcon, setActive] = useState(SideBarIcons.UNK);
  const getRouterState = (path) => {
    switch (path) {
      case "/ipong/home":
        return "Main Page";
      case "/ipong/chat":
        return "Chat";
      case "/ipong/store":
        return "Store";
      case "/ipong/profile":
        return "Profile";
      case "/ipong/users":
        return "Profile";
      default:
        return "Main Page";
    }
  }
  useEffect(() => {
    setActive(() => {

      if (chatId)
        return SideBarIcons.CHAT;
      switch (location.pathname) {
        case "/ipong/home":
          return SideBarIcons.HOME;
        case "/ipong/chat":
          return SideBarIcons.CHAT;
        case "/ipong/store":
          return SideBarIcons.STORE;
        case "/ipong/profile":
          return SideBarIcons.USER_PROFILE;
        case "/ipong/users":
          return SideBarIcons.USER_PROFILE;
        default:
          return SideBarIcons.UNK;
      }
    });
    
    dispatch(setRouterStateType(null));
    dispatch(setRouterState(getRouterState(location.pathname)));
  }, [location.pathname, chatId]);

  const handleIconClick = (param, route) => {
    setActive(param);
    navigate(route);
  };

  const getIconSrc = (iconIndex) => {
    switch (iconIndex) {
      case SideBarIcons.HOME:
        return selectedIcon === SideBarIcons.HOME
          ? LogoHomeSelected
          : LogoHomeNoSelected;
      case SideBarIcons.CHAT:
        return selectedIcon === SideBarIcons.CHAT
          ? LogoChatSelected
          : LogoChatNoSelected;
      case SideBarIcons.STORE:
        return selectedIcon === SideBarIcons.STORE
          ? LogoStoreSelected
          : LogoStoreNoSelected;
      case SideBarIcons.USER_PROFILE:
        return selectedIcon === SideBarIcons.USER_PROFILE
          ? LogoUserProfileSelected
          : LogoUserProfileNoSelected;
      default:
        return null;
    }
  };

  return (
    <div className="side-bar">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <img
            className="the-logo"
            alt="The logo"
            src={iPongLogo}
            onClick={() => {
              setActive(SideBarIcons.HOME);

              navigate("/ipong/home");
            }}
          />
          <div className="sidebar">
            <div className="menu">
              <img
                className="icon-wrapper"
                alt="Icons system house"
                src={getIconSrc(SideBarIcons.HOME)}
                onClick={() =>
                  handleIconClick(SideBarIcons.HOME, "/ipong/home")
                }
              />
              <img
                className="icon-wrapper"
                alt="Icons system house"
                src={getIconSrc(SideBarIcons.CHAT)}
                onClick={() =>
                  handleIconClick(SideBarIcons.CHAT, "/ipong/chat")
                }
              />
              <img
                className="icon-wrapper"
                alt="Icons system house"
                src={getIconSrc(SideBarIcons.STORE)}
                onClick={() =>
                  handleIconClick(SideBarIcons.STORE, "/ipong/store")
                }
              />
              <img
                className="icon-wrapper"
                alt="Icons system house"
                src={getIconSrc(SideBarIcons.USER_PROFILE)}
                onClick={() =>
                  handleIconClick(SideBarIcons.USER_PROFILE, "/ipong/profile")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
