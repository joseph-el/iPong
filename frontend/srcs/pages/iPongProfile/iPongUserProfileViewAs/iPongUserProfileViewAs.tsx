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
  User,
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
import { getAvatarSrc } from "../../../utils/getAvatarSrc";
import api from "../../../api/posts";
import { set } from "lodash";
import {useNavigate} from "react-router-dom";
import { getUserLevel } from "../../../utils/getCurrentLevel";

const UserDescriptions = ({ UserprofileInfo, UserIsBlocked }) => {
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

      </p>

      <div>
        <div className="meta-details">
          <div className="div-2">
            <img className="img" alt="Location icon" src={LocationIcon} />
            <div className="text-wrapper-2">
              {" "}
              {error ? "Morocco" : country}{" "}
            </div>
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
            <div className="text-wrapper">
              {UserIsBlocked
                ? 0
                : UserprofileInfo.FriendsCount <= 0
                ? 0
                : UserprofileInfo.FriendsCount}
            </div>
            <div className="div">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function UserProfileViewAs() {
  // const { userId } = useParams();

  const { userId: paramUserId } = useParams();
  const [userId, setUserId] = useState(paramUserId);

  useEffect(() => {
    setUserId(paramUserId);
  }, [paramUserId]);

  const [showAchievementList, setShowAchievementList] = React.useState(false);
  const [ShowZindex, setShowZindex] = React.useState(false);
  const handleCloseClick = () => {
    setShowAchievementList(false);
  };
  const [UserOptions, setUserOptions] = React.useState("");
  const UserInfo = useSelector((state: RootState) => state.userState);
  const [ButtonFriendStatus, setButtonFriendStatus] = useState("");
  const [FriendshipStatus, setFriendshipStatus] = useState("");
  const [DropdownButtonStatus, setDropdownButtonStatus] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (UserAction) => {
    setUserOptions(UserAction);
    onOpen();
  };
  const navigate = useNavigate();
  const [UserprofileInfo, setUserprofileInfo] = useState([]);

  const [UserIsBlocked, setUserIsBlocked] = useState<String | null>(null);

  // me
  // navigate user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(`/friendship/isBlocked`, {
          friendId: userId, // navigate user
        });

        // console.log("response.data", response.data);

        if (response.data.blockedBy === UserInfo.id) {
          setUserIsBlocked("BLOCKED_BY_ME");
        } else if (response.data.blocked === UserInfo.id) {
          setUserIsBlocked("BLOCKED_BY_FRIEND");
        }
      } catch (error) {}
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await api.get(`/user-profile/getinfoById${userId}`);
        setUserprofileInfo(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [userId]); // USER PROFILE

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
      } catch (error) {}
    };
    fetchData();
  }, [userId]);

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
           await api.post(`/friendship/add`, {
            friendId: userId,
          });
          // console.log("response: add ", response);
        }
        if (FriendshipStatus === "MAKE_FRIEND") {
          await api.post(`/friendship/accept`, {
            friendId: userId,
          });
          // console.log("response: make friend ", response);
        }
        if (FriendshipStatus === "SET_CANCEL") {
          await api.post(`/friendship/reject`, {
            friendId: userId,
          });
          if (response.status !== 200) {
            setButtonFriendStatus("ACCEPTED");
          }
          // console.log("response: reject ", response);
        }
      } catch (error) {}
    };
    ButtonFriendStatus !== "ACCEPTED" && fetchData();
  }, [FriendshipStatus, userId]);

  const [isUnfriend, setIsUnfriend] = useState<Boolean | null | String>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof isUnfriend === "string") {
          await api.post(`/friendship/unblock`, {
            friendId: userId,
          });
          return;
        }
        if (isUnfriend) {
          await api.post(`/friendship/unfriend`, {
            friendId: userId,
          });
        } else {
          await api.post(`/friendship/block`, {
            friendId: userId,
          });
        }
      } catch (error) {}
    };
    isUnfriend != null && fetchData();
  }, [isUnfriend, userId]);

  const handelRemoveUser = (_isUnfriend) => {
    if (typeof _isUnfriend === "string") {
      setIsUnfriend("unblock");
      return;
    }
    if (_isUnfriend) {
      setIsUnfriend(true);
    } else {
      setIsUnfriend(false);
    }
  };

  const [startChat, setStartChat] = useState(false);
  useEffect(() => {
    const fetchCreatChatRoom = async () => {
      try {
        const response = await api.post(`/chatroom/create`, {
          type: "Dm",
          secondUser: userId,
        });
        setStartChat(false);
        console.log("response.data.id", response.data);
        navigate(`/ipong/chat/${response.data.id}`);
      } catch (error) {
        console.error(error);
      }
    }
    startChat && fetchCreatChatRoom();
  }, [startChat]);



  console.log("GithubLink: ", UserInfo.githubLink);
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="UserProfile-frame">
          <div className="profile-cover">
            <img
              className="user-cover-image"
              alt="NextUI Fruit Image with Zoom"
              src={ UserprofileInfo.cover }
            />
            <Avatar
              src={
                UserIsBlocked === null
                  ? getAvatarSrc(
                      UserprofileInfo.picture,
                      UserprofileInfo.gender
                    )
                  : getAvatarSrc(null, UserprofileInfo.gender)
              }
              className="w-28 h-28 text-large avatar"
            />
            {UserIsBlocked === null ? (
              <div className="user-LevelBars">
                <LevelBar xp={UserprofileInfo.xp} level={getUserLevel(UserprofileInfo.xp)} />
              </div>
            ) : null}
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
                <div className="tnaceur">
                  {UserIsBlocked === null
                    ? "@" + UserprofileInfo.username
                    : "@iPong User"}
                </div>
              </div>
              <UserDescriptions
                UserIsBlocked={UserIsBlocked}
                UserprofileInfo={UserprofileInfo}
              />
            </div>

            <div className="menu-Buttons">
              {UserIsBlocked === null ? (
                <div className="Social-Icons">
                  {UserprofileInfo.githubLink != "" ? (
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
                  ) : null}

                  {UserprofileInfo.linkedInLink != "" ? (
                    <Tooltip color="primary" content="Visit Linkdin">
                      <Image
                        onClick={() => window.open(UserprofileInfo.linkedInLink)}
                        radius="none"
                        src={LinkedinIcon}
                        alt="Linkedin icon"
                        width={"31px"}
                        className="social-icon"
                      />
                    </Tooltip>
                  ) : null}

                  <Tooltip color="primary" content="send a message">
                    <Image
                      onClick={() => {
                        setStartChat(true);
                      }}
                      radius="none"
                      src={SendMessageIcon}
                      alt="Linkedin icon"
                      width={"33px"}
                      className="social-icon"
                    />
                  </Tooltip>
                </div>
              ) : null}

              {ButtonFriendStatus !== "ACCEPTED" && UserIsBlocked === null ? (
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
                          else setFriendshipStatus("SET_CANCEL");
                        }}
                        variant="faded"
                      >
                        {"--accept: " + DropdownButtonStatus.first}
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

              {UserIsBlocked === "BLOCKED_BY_ME" ? (
                <Button
                  color="primary"
                  onClick={() => handleOpen("Unblock")}
                  startContent={
                    <Image
                      width={"20px"}
                      radius="none"
                      src={BlockIcon}
                      alt="block-icon"
                    />
                  }
                >
                  Unblock
                </Button>
              ) : null}

              {UserIsBlocked === null ? (
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
                      isDisabled={ButtonFriendStatus === "ADD FRIEND"}
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
              ) : null}
            </div>
          </div>

          {UserIsBlocked === null ? (
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
                    <MatchHistory UserId={userId} />
                  </Tab>

                  <Tab
                    isDisabled={ButtonFriendStatus !== "ACCEPTED"}
                    key="friends"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Friends</span>
                      </div>
                    }
                  >
                    <FriendsInCommon UserId={userId} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          ) : null}

          {showAchievementList ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <AchievementList
                  level={getUserLevel(UserInfo.xp)}
                  closeList={handleCloseClick}
                />
              </div>
            </div>
          ) : null}

          <IPongAlert
            isOpen={isOpen}
            onClose={onClose}
            UserAlertHeader={UserOptions}
            UserAlertMessage={
              UserOptions === "Unfriend"
                ? `Are you sure you want to unfriend ${UserprofileInfo.username}?`
                : UserOptions === "Block"
                ? `Are you sure you want to block ${UserprofileInfo.username}?`
                : `Are you sure you want to unblock ${UserprofileInfo.username}?`
            }
            handelRemoveUser={() => {
              handelRemoveUser(
                UserOptions === "Unfriend"
                  ? true
                  : UserOptions === "Unblock"
                  ? "Unblock"
                  : false
              );
            }}
            UserOptions={
              UserOptions === "Unfriend"
                ? "Unfriend"
                : UserOptions === "Unblock"
                ? "Unblock"
                : "Block"
            }
          ></IPongAlert>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
