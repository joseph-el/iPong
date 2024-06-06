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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";

import api from "../../../api/posts";
import { set } from "lodash";

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
  const UserInfo = useSelector((state: RootState) => state.userState);

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
        // console.log("user data: ", response.data);
      } catch (error) {
        console.log("Error fetching data");
      }
    };
    fetchData();
  }, []); // USER PROFILE

  
  const [ButtonFriendStatus, setButtonFriendStatus] = useState("");
  const [FriendshipStatus, setFriendshipStatus] = useState("");
  const [DropdownButtonStatus, setDropdownButtonStatus] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/friendship/friendshipStatus${userId}`);
        if (!response.data) {
          setButtonFriendStatus("ADD FRIEND");
        } else {
          if (response.data.status === "ACCEPTED") {
            setButtonFriendStatus("ACCEPTED");
            return;
          }
          if (response.data.from.userId === UserInfo.id) {
            setButtonFriendStatus("CANCEL");
          } else {
            setButtonFriendStatus("ACCEPT");
          }
        }
      } catch (error) {
        console.log("ERROR FETCHING FRIENDS STATUS");
      }
    };
    fetchData();
  }, []);

  const dropdownOptions = {
    MAKE_FRIEND: {
      first: "Accept Friend",
      second: "Reject",
    },
    SET_CANCEL: {
      first: "Cancel Request",
      second: "",
    },
  };

  const handelFriendButton = () => {
    if (ButtonFriendStatus === "ADD FRIEND") {
      setFriendshipStatus("SET_FRIEND");
      setButtonFriendStatus("CANCEL");
    }
    if (ButtonFriendStatus === "ACCEPT") {
      setFriendshipStatus("MAKE_FRIEND");
      setDropdownButtonStatus(dropdownOptions.MAKE_FRIEND);
    }
    if (ButtonFriendStatus === "CANCEL") {
      setFriendshipStatus("SET_CANCEL");
      setButtonFriendStatus("ADD FRIEND");
      setDropdownButtonStatus(dropdownOptions.SET_CANCEL);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (FriendshipStatus === "SET_FRIEND") {
          const response = await api.post(`/friendship/add`, {
            friendId: userId,
          });
          // console.log("response: add ", response);
        }
        if (FriendshipStatus === "MAKE_FRIEND") {
          const response = await api.post(`/friendship/accept`, {
            friendId: userId,
          });
          // console.log("response: make friend ", response);
        }
        if (FriendshipStatus === "SET_CANCEL") {
          const response = await api.post(`/friendship/reject`, {
            friendId: userId,
          });
          // console.log("response: reject ", response);
        }
      } catch (error) {
        console.log("ERROR POST FRIENDSHIP");
      }
    };
    ButtonFriendStatus !== "ACCEPTED" && fetchData();
  }, [FriendshipStatus]);

  const [isUnfriend, setIsUnfriend] = useState<Boolean | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isUnfriend) {
          const response = await api.post(`/friendship/unfriend`, {
            friendId: userId,
          });
          console.log("response: remove ", response);
        } else {
          const response = await api.post(`/friendship/block`, {
            friendId: userId,
          });
          console.log("response: block ", response);
        }
      } catch (error) {
        console.log("ERROR POST FRIENDSHIP");
      }
    };
    isUnfriend != null && fetchData();
  }, [isUnfriend]);

  const handelRemoveUser = (_isUnfriend) => {
    console.log("isUnfriend: ", _isUnfriend);
    if (_isUnfriend) {
      setIsUnfriend(true);
    } else {
      setIsUnfriend(false);
    }
  };

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

              {ButtonFriendStatus !== "ACCEPTED" ? (
                <Dropdown
                  showArrow
                  radius="sm"
                  className="modal-header-text-color"
                  classNames={{
                    base: "before:bg-default-700",
                    content: "p-0 border-small border-divider bg-background",
                  }}
                >
                  <DropdownTrigger onClick={() => {}}>
                    <Button
                      color="primary"
                      onClick={
                        ButtonFriendStatus === "ADD FRIEND"
                          ? handelFriendButton
                          : () => {
                              if (ButtonFriendStatus === "ACCEPT") {
                                setDropdownButtonStatus(
                                  dropdownOptions.MAKE_FRIEND
                                );
                              }
                              if (ButtonFriendStatus === "CANCEL") {
                                setDropdownButtonStatus(
                                  dropdownOptions.SET_CANCEL
                                );
                              }
                            }
                      }
                      startContent={
                        <Image
                          width={"20px"}
                          radius="none"
                          src={AddFriendIcon}
                          alt="add-friend-icon"
                        />
                      }
                    >
                      {ButtonFriendStatus}
                    </Button>
                  </DropdownTrigger>

                  {ButtonFriendStatus !== "ADD FRIEND" ? (
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        onClick={() => {
                         if (DropdownButtonStatus.first == "Accept Friend")
                            setFriendshipStatus("MAKE_FRIEND");
                          else
                            setFriendshipStatus("SET_CANCEL");
                        }}
                        variant="faded"
                      >
                        {"--accept: " +  DropdownButtonStatus.first}
                      </DropdownItem>

                      {ButtonFriendStatus === "ACCEPT" ? (
                        <DropdownItem
                          onClick={() => {
                            setFriendshipStatus("SET_CANCEL");
                          }}
                          variant="faded"
                          className="text-danger"
                          color="danger"
                        >
                          {"--cancel: " + DropdownButtonStatus.second}
                        </DropdownItem>
                      ) : null}
                    </DropdownMenu>
                  ) : null}
                </Dropdown>
              ) : null}

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
            handelRemoveUser={() => {
              handelRemoveUser(UserOptions === "Unfriend" ? true : false);
            }}
            UserOptions={UserOptions === "Unfriend" ? "Unfriend" : "Block"}
          ></IPongAlert>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
