import React from "react";
import "./UserProfile.css";
import { Image } from "@nextui-org/react";
import { LevelBar } from "../../components/UI/LevelBar/LevelBar";
import CoverImage from "./cover-image.jpeg";
import { Avatar } from "@nextui-org/react";
import MenuIcon from "./profile-menu-icon.svg";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import VerifiedBadge from "./Verified-badge.svg";
import MatchHistory from "../../components/UI/MatchHistoryTable/MatchHistory";

import LocationIcon from "./LocationIcon.svg";
import CalendarIcon from "./CalendarIcon.svg";

import ArchivementIcon from "./archivementicon.svg";
import SecutityIcon from "./securityicon.svg";
import EditIcon from "./editicon.svg";

import FriendsTable from "../../components/UI/FriendsTable/FriendsTable";

import AchievementList from "../../components/UI/AchievementComponents/AchievementList/AchievementList";

import BlockedTable from "../../components/UI/BlockedTable/BlockedTable";

const UserDescriptions = () => {
  return (
    <div className="info">
      {/* <p className="description">
                أُحِبُّ الصَّالِحِينَ وَلَسْتُ مِنْهُمْ لَـعَـلِّـي أَنْ أَنَـالَ بِـهِـمْ شَـفَاعَة وَأَكْـرَهُ مَـنْ
                تِـجَارَتُهُ الْمَعَاصِي وَلَـوْ كُـنَّـا سَـوَاءً فِي الْبِضَاعَة🌼
            </p> */}
      <p className="description">
        Unraveling the mysteries of life, from cells to ecosystems. Join the
        journey! 🌱🔬 Science and discovery.
      </p>
      <div className="meta-details">
        <div className="div-2">
          <img className="img" alt="Location icon" src={LocationIcon} />
          <div className="text-wrapper-2">Maroc</div>
        </div>
        <div className="div-2">
          <img className="img" alt="Calendar icon" src={CalendarIcon} />
          <div className="text-wrapper-2">Joined fav 2024</div>
        </div>
      </div>

      <div className="follower-counts">
        <div className="following">
          <div className="text-wrapper">95</div>
          <div className="div">Following</div>
        </div>
      </div>
    </div>
  );
};

export default function UserProfile() {
  const [showAchievementList, setShowAchievementList] = React.useState(false);

  const handleCloseClick = () => {
    setShowAchievementList(false);
  };

  return (
    <div className="UserProfile-frame">
      <div className="profile-cover">
        <img
          className="user-cover-image"
          alt="NextUI Fruit Image with Zoom"
          src={CoverImage}
        />
        <Avatar
          src="https://cdn.intra.42.fr/users/1e212df3b450650d04418d1c03827563/tnaceur.jpg"
          className="w-28 h-28 text-large avatar"
        />
        <div className="user-LevelBar">
          <LevelBar />
        </div>
      </div>

      <div className="User-details-and-menu">
        <div className="user-fullname-and-username">
          <div className="user-fullname-and-verification-badge">
            <p className="user-fullname"> Taha Naceur </p>
            <img
              src={VerifiedBadge}
              alt="verified-badge"
              className="user-verification-badge"
            />
          </div>

          <div className="groupParent">
            <div className="tnaceur">@tnaceur</div>
          </div>
          <UserDescriptions />
        </div>

        <Dropdown backdrop="blur" className="menu-icon-dropdown-frame">
          <DropdownTrigger>
            <img src={MenuIcon} alt="menu-icon" className="menu-icon" />
          </DropdownTrigger>

          <DropdownMenu color="primary" aria-label="Dropdown menu with icons">
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
    </div>
  );
}
