import React, { useEffect, useState } from "react";
import "./iPongUserProfileViewAs.css";
import {
  Tabs,
  Tab,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Image,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";

import { useParams } from "react-router-dom";
import BornIcon from "../assets/bornicon.svg";
import BlockIcon from "../assets/block-icon.svg";
import GithubIcon from "../assets/githubicon.svg";
import CoverImage from "../assets/cover-image.jpeg";
import LocationIcon from "../assets/LocationIcon.svg";
import CalendarIcon from "../assets/CalendarIcon.svg";
import SendMessageIcon from "../assets/send-message.svg";
import LinkedinIcon from "../assets/Linkedinicon.svg";
import UnfriendIcon from "../assets/unfriend-icon.svg";
import VerifiedBadge from "../assets/Verified-badge.svg";
import ArchivementIcon from "../assets/archivementicon.svg";
import AddFriendIcon from "../assets/add-friend-icon.svg";
import MenuIcon from "../assets/profile-menu-icon.svg";
import PenddingIcon from "../assets/penddingicon.svg";
import AlreadyFriendIcon from "../assets/alreadyFriendIcon.svg";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LevelBar } from "../../../components/UI/LevelBar/LevelBar";
import IPongAlert from "../../../components/UI/iPongAlert/iPongAlert";
import FriendsInCommon from "../../../components/UI/FriendsInCommon/FriendsInCommon";
import MatchHistory from "../../../components/UI/MatchHistoryTable/MatchHistory";
import AchievementList from "../../../components/UI/AchievementComponents/AchievementList/AchievementList";

import { formatJoinDate } from "../../../utils/formatJoinDate";

import api from "../../../api/posts";

const UserDescriptions = ({ UserprofileInfo }) => {
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountry = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        setCountry(response.data.countryName);
      } catch (err) {
        setError("Failed to fetch country name");
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
            setError("Geolocation permission denied");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser");
      }
    };
    getPosition();
  }, []);

  return (
    <div className="info">
      <p className="description">
        {UserprofileInfo.bio}
        hey there! I am using iPong
      </p>
      <div className="meta-details">
        <div className="div-2">
          <img className="img" alt="Location icon" src={LocationIcon} />
          <div className="text-wrapper-2"> {error ? "Morocco" : country} </div>
        </div>

        <div className="div-2">
          <img className="img" alt="Calendar icon" src={CalendarIcon} />
          <div className="text-wrapper-2">
            {formatJoinDate(UserprofileInfo.createdAt)}
          </div>
        </div>
      </div>

      <div className="follower-counts">
        <div className="following">
          <div className="text-wrapper">{UserprofileInfo.FriendsCount}</div>
          <div className="div">Following</div>
        </div>
      </div>
    </div>
  );
};

export default function UserProfileViewAs() {
  const { userId } = useParams();

  const [showAchievementList, setShowAchievementList] = React.useState(false);
  const [ShowZindex, setShowZindex] = React.useState(false);
  const handleCloseClick = () => {
    setShowAchievementList(false);
  };
  const [UserOptions, setUserOptions] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (UserAction) => {
    setUserOptions(UserAction);
    onOpen();
  };

  const [UserprofileInfo, setUserprofileInfo] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user-profile/getinfoById${userId}`);
        setUserprofileInfo(response.data);
      } catch (error) {
        console.log("Error fetching data");
      }
    };
    fetchData();
  }, []);










  const [UserFriendStatus, setUserFriendStatus] = React.useState("Pendding");
  const handelFriendButton = () => {};



  useEffect(() => {
    try {
        
    }catch (error) {
      console.log("Error fetching data");
    }


  }, [UserprofileInfo]);





  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="UserProfile-frame">
          <div className="profile-cover">
            <img
              className="user-cover-image"
              alt="NextUI Fruit Image with Zoom"
              src={CoverImage}
            />
            <Avatar
              src={UserprofileInfo.picture}
              className="w-28 h-28 text-large avatar"
            />
            <div className="user-LevelBars">
              <LevelBar level={UserprofileInfo.level} />
            </div>
          </div>

          <div className="User-details-and-menu">
            <div className="user-fullname-and-username">
              <div className="user-fullname-and-verification-badge">
                <p className="user-fullname">
                  {" "}
                  {UserprofileInfo.firstName +
                    " " +
                    UserprofileInfo.lastName}{" "}
                </p>

                {UserprofileInfo.isVerified ? (
                  <img
                    src={VerifiedBadge}
                    alt="verified-badge"
                    className="user-verification-badge"
                  />
                ) : null}
              </div>

              <div className="groupParent">
                <div className="tnaceur">{"@" + UserprofileInfo.username}</div>
              </div>
              <UserDescriptions UserprofileInfo={UserprofileInfo} />
            </div>

            <div className="menu-Buttons">
              <div className="Social-Icons">
                <Tooltip color="primary" content="Visit Github">
                  <Image
                    onClick={() => window.open(UserprofileInfo.githubLink)}
                    src={GithubIcon}
                    radius="none"
                    alt="Github icon"
                    width={"31px"}
                    className="social-icon"
                  />
                </Tooltip>

                <Tooltip color="primary" content="Visit Linkdin">
                  <Image
                    onClick={() => window.open("https://www.linkedin.com/")}
                    radius="none"
                    src={LinkedinIcon}
                    alt="Linkedin icon"
                    width={"31px"}
                    className="social-icon"
                  />
                </Tooltip>

                <Tooltip color="primary" content="send a message">
                  <Image
                    radius="none"
                    src={SendMessageIcon}
                    alt="Linkedin icon"
                    width={"33px"}
                    className="social-icon"
                  />
                </Tooltip>
              </div>

              <Button
                color="primary"
                onClick={handelFriendButton}
                startContent={
                  <Image
                    width={"20px"}
                    radius="none"
                    src={
                      UserFriendStatus === "Pendding"
                        ? PenddingIcon
                        : UserFriendStatus === "AlreadyFriend"
                        ? AlreadyFriendIcon
                        : AddFriendIcon
                    }
                    alt="add-friend-icon"
                  />
                }
              >
                {UserFriendStatus === "Pendding"
                  ? "Pendding"
                  : UserFriendStatus === "AlreadyFriend"
                  ? "Already Friend"
                  : "Add Friend"}
              </Button>

              <Dropdown backdrop="blur" className="menu-icon-dropdown-frame">
                <DropdownTrigger onClick={() => setShowZindex(!ShowZindex)}>
                  <img
                    src={MenuIcon}
                    alt="menu-icon"
                    className="menu-icon"
                    style={{ zIndex: ShowZindex ? 999999 : 0 }}
                  />
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
                    onPress={() => handleOpen("Unfriend")}
                    className="menu-item-dropdown-font"
                    key="new"
                    // isDisabled={true}
                    startContent={
                      <img
                        src={UnfriendIcon}
                        alt="menu-icon"
                        className="menu-icon-dropdown"
                      />
                    }
                  >
                    Unfriend
                  </DropdownItem>

                  <DropdownItem
                    onPress={() => handleOpen("Block")}
                    className="menu-item-dropdown-font"
                    key="new"
                    color="danger"
                    startContent={
                      <img
                        src={BlockIcon}
                        alt="menu-icon"
                        className="menu-icon-dropdown"
                      />
                    }
                  >
                    Block
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
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
                      <span> Match History </span>
                    </div>
                  }
                >
                  <MatchHistory flag={true} />
                </Tab>

                <Tab
                  key="friends"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Friends</span>
                    </div>
                  }
                >
                  <FriendsInCommon />
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

          <IPongAlert
            isOpen={isOpen}
            onClose={onClose}
            UserAlertHeader={UserOptions}
            UserAlertMessage={
              UserOptions === "Unfriend"
                ? "Are you sure you want to unfriend tnaceur?"
                : UserOptions === "Block"
                ? "Are you sure you want to block tnaceur?"
                : null
            }
            UserOptions={UserOptions === "Unfriend" ? "Unfriend" : "Block"}
          ></IPongAlert>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
