import React from "react";
// import { IconsSystem } from "./IconsSystem";
// import { IconsSystemEmail } from "./IconsSystemEmail";
// import { IconsSystemHouse } from "./IconsSystemHouse";
// import { IconsSystemUser } from "./IconsSystemUser";


import "./SideBar.css";
import { useState } from "react";


import iPongLogo from './assets/iPongLogo.svg'

import LogoHomeNoSelected from './assets/LogoHomeNoSelected.svg';
import LogoHomeSelected from './assets/LogoHomeSelected.svg';

import LogoChatNoSelected from './assets/LogoChatNoSelected.svg';
import LogoChatSelected from './assets/LogoChatSelected.svg';

import LogoStoreNoSelected from './assets/LogoStoreNoSelected.svg';
import LogoStoreSelected from './assets/LogoStoreSelected.svg';

import LogoUserProfileNoSelected from './assets/LogoUserProfileNoSelected.svg';
import LogoUserProfileSelected from './assets/LogoUserProfileSelected.svg';


enum SideBarIcons {
    UNK = 0,
    HOME = 1,
    CHAT = 2,
    STORE = 3,
    USER_PROFILE = 4,
}

export  function SideBar() {
    const [selectedIcon, setActive] = useState(SideBarIcons.UNK);
    
    
    const handleIconClick = (param, route) => {
        setActive(param);
        // navigate(route);
    };

    const getIconSrc = (iconIndex) => {
        switch (iconIndex) {
            case SideBarIcons.HOME:
                return selectedIcon === SideBarIcons.HOME ? LogoHomeSelected : LogoHomeNoSelected;
            case SideBarIcons.CHAT:
                return selectedIcon === SideBarIcons.CHAT ? LogoChatSelected : LogoChatNoSelected;
            case SideBarIcons.STORE:
                return selectedIcon === SideBarIcons.STORE ? LogoStoreSelected : LogoStoreNoSelected;
            case SideBarIcons.USER_PROFILE:
                return selectedIcon === SideBarIcons.USER_PROFILE ? LogoUserProfileSelected : LogoUserProfileNoSelected;
            default:
                return null;
        }
    };

    return (
        <div className="side-bar">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <img className="the-logo" alt="The logo" src={iPongLogo} />
                    <div className="sidebar">
                        <div className="menu">
                            <img className="icon-wrapper" alt="Icons system house" src={getIconSrc(SideBarIcons.HOME)} onClick={() => handleIconClick(SideBarIcons.HOME, '/home')} />
                            <img className="icon-wrapper" alt="Icons system house" src={getIconSrc(SideBarIcons.CHAT)} onClick={() => handleIconClick(SideBarIcons.CHAT, '/chat')} />
                            <img className="icon-wrapper" alt="Icons system house" src={getIconSrc(SideBarIcons.STORE)} onClick={() => handleIconClick(SideBarIcons.STORE, '/store')} />
                            <img className="icon-wrapper" alt="Icons system house" src={getIconSrc(SideBarIcons.USER_PROFILE)} onClick={() => handleIconClick(SideBarIcons.USER_PROFILE, '/user-profile')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
