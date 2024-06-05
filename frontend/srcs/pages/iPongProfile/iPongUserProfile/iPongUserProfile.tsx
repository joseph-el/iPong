import React from "react";
import "./iPongUserProfile.css";
import {
  Tabs,
  Tab,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import EditIcon from "../assets/editicon.svg";

import CoverImage from "../assets/cover-image.jpeg";
import LocationIcon from "../assets/LocationIcon.svg";
import CalendarIcon from "../assets/CalendarIcon.svg";
import SecutityIcon from "../assets/securityicon.svg";
import MenuIcon from "../assets/profile-menu-icon.svg";
import VerifiedBadge from "../assets/Verified-badge.svg";
import ArchivementIcon from "../assets/archivementicon.svg";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LevelBar } from "../../../components/UI/LevelBar/LevelBar";
import FriendsTable from "../../../components/UI/FriendsTable/FriendsTable";
import BlockedTable from "../../../components/UI/BlockedTable/BlockedTable";
import MatchHistory from "../../../components/UI/MatchHistoryTable/MatchHistory";
import EditProfile from "../../../components/UI/ProfileSettings/EditProfile/EditProfile";
import EditSecurity from "../../../components/UI/ProfileSettings/EditSecurity/EditSecurity";
import AchievementList from "../../../components/UI/AchievementComponents/AchievementList/AchievementList";
import CongratulationsBadge from "../../../components/UI/AchievementComponents/CongratulationsBadge/CongratulationsBadge";
import TwoFactorAuthenticationProfile from "../../../components/UI/ProfileSettings/TwoFactorAuthenticationProfile/TwoFactorAuthenticationProfile";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";

import { useEffect, useState } from "react";
import axios from "axios";
import { getAvatarSrc } from "../../../utils/getAvatarSrc";




const UserDescriptions = ({ UserInfo }) => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountry = async (latitude, longitude) => {
      try {
        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        setCountry(response.data.countryName);
      } catch (err) {
        setError('Failed to fetch country name');
      }
    };
    const getPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchCountry(latitude, longitude);
          },
          (err) => {
            setError('Geolocation permission denied');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser');
      }
    };
    getPosition();
  }, []);
  return (
    <div className="info">
      <p className="description">
        {UserInfo.bio}
        Unraveling the mysteries of life, from cells to ecosystems. Join the
        journey! 🌱🔬 Science and discovery.
      </p>
      <div className="meta-details">
        <div className="div-2">
          <img className="img" alt="Location icon" src={LocationIcon} />
          <div className="text-wrapper-2"> {error ? "morocco" : country} </div>
        </div>
        <div className="div-2">
          <img className="img" alt="Calendar icon" src={CalendarIcon} />
          <div className="text-wrapper-2">Joined fav 2024</div>
        </div>
      </div>

      <div className="follower-counts">
        <div className="following">
          <div className="text-wrapper">{UserInfo.FriendsCount}</div>
          <div className="div">Following</div>
        </div>
      </div>
    </div>
  );
};

export default function UserProfile() {
  const [showAchievementList, setShowAchievementList] = React.useState(false);
  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const [showEditSecurity, setShowEditSecurity] = React.useState(false);
  const [showTwoFactorAuthentication, setShowTwoFactorAuthentication] =
    React.useState(false);

  const handleCloseClick = () => {
    setShowAchievementList(false);
    setShowEditProfile(false);
    setShowEditSecurity(false);
    setShowTwoFactorAuthentication(false);
  };

  const UserInfo = useSelector((state: RootState) => state.userState);

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="UserProfile-frame">
          <div className="profile-cover">
            <img
              className="user-cover-image"
              alt="cover-image"
              src={CoverImage} // TODO: Tell mouad to set the default cover image
            />
            <Avatar
              src={getAvatarSrc(UserInfo.picture, UserInfo.username)}
              className="w-28 h-28 text-large avatar"
            />
            <div className="user-LevelBar">
              <LevelBar level={UserInfo.level} />
            </div>
          </div>

          <div className="User-details-and-menu">
            <div className="user-fullname-and-username">
              <div className="user-fullname-and-verification-badge">
                <p className="user-fullname">
                  {" "}
                  {UserInfo.firstName + " " + UserInfo.lastName}{" "}
                </p>

                {UserInfo.isVerified ? (
                  <img
                    src={VerifiedBadge}
                    alt="verified-badge"
                    className="verified-badge"
                  />
                ) : null}
              </div>

              <div className="groupParent">
                <div className="tnaceur">{"@" + UserInfo.username}</div>
              </div>
              <UserDescriptions UserInfo={UserInfo} />
            </div>

            <Dropdown backdrop="blur" className="menu-icon-dropdown-frame">
              <DropdownTrigger>
                <img src={MenuIcon} alt="menu-icon" className="menu-icon" />
              </DropdownTrigger>

              <DropdownMenu
                color="primary"
                aria-label="Dropdown menu with icons"
              >
                <DropdownItem
                  onClick={() => setShowAchievementList(true)}
                  className="menu-item-dropdown-font"
                  key="new"
                  startContent={
                    <img
                      src={ArchivementIcon}
                      alt="menu-icon"
                      className="menu-icon-dropdown"
                    />
                  }
                >
                  Achievement
                </DropdownItem>

                <DropdownItem
                  onClick={() => setShowEditProfile(true)}
                  className="menu-item-dropdown-font"
                  key="new"
                  startContent={
                    <img
                      src={EditIcon}
                      alt="menu-icon"
                      className="menu-icon-dropdown"
                    />
                  }
                >
                  Edit Profile
                </DropdownItem>

                <DropdownItem
                  onClick={() => setShowEditSecurity(true)}
                  className="menu-item-dropdown-font"
                  key="new"
                  startContent={
                    <img
                      src={SecutityIcon}
                      alt="menu-icon"
                      className="menu-icon-dropdown"
                    />
                  }
                >
                  Edit Security
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="users-tabs">
            <div className="flex w-full flex-col">
              <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-[#119CF1]",
                  tab: "max-w-fit px-0 h-12",
                  tabContent:
                    "group-data-[selected=true]:text-[#ECECEC] text-styled-primary",
                }}
              >
                <Tab
                  key="history"
                  title={
                    <div className="flex items-center space-x-2 ">
                      <span>Match History </span>
                    </div>
                  }
                >
                  <MatchHistory />
                </Tab>

                <Tab
                  key="friends"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Friends</span>
                    </div>
                  }
                >
                  <FriendsTable />
                </Tab>

                <Tab
                  key="blocked"
                  title={
                    <div className="flex items-center space-x-2 ">
                      <span>Blocked</span>
                    </div>
                  }
                >
                  <BlockedTable />
                </Tab>
              </Tabs>
            </div>
          </div>

          {showAchievementList ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <AchievementList closeList={handleCloseClick} />
              </div>
            </div>
          ) : null}

          {showEditProfile ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <EditProfile closeEditProfile={handleCloseClick} />
              </div>
            </div>
          ) : null}

          {showEditSecurity ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <EditSecurity
                  setShowTwoFactorAuthentication={() =>
                    setShowTwoFactorAuthentication(true)
                  }
                  closeEditSecurity={handleCloseClick}
                />
              </div>
            </div>
          ) : null}

          {showTwoFactorAuthentication ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <TwoFactorAuthenticationProfile
                  handelLeftTitle={() => {
                    setShowTwoFactorAuthentication(false);
                    setShowTwoFactorAuthenticationContent(true);
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
