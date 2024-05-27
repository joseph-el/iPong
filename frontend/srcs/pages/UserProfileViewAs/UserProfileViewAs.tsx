import React from "react";
import "./UserProfileViewAs.css";
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
  User,
  Tooltip,
} from "@nextui-org/react";

import MenuIcon from "./profile-menu-icon.svg";
import EditIcon from "./editicon.svg";
import CoverImage from "./cover-image.jpeg";
import MatchHistory from "../../components/UI/MatchHistoryTable/MatchHistory";
import LocationIcon from "./LocationIcon.svg";
import CalendarIcon from "./CalendarIcon.svg";
import SecutityIcon from "./securityicon.svg";
import VerifiedBadge from "./Verified-badge.svg";
import ArchivementIcon from "./archivementicon.svg";

import AddFriendIcon from "./add-friend-icon.svg";
import BlockIcon from "./block-icon.svg";
import SendMessageIcon from "./send-message.svg";
import UnfriendIcon from "./unfriend-icon.svg";
import GithubIcon from "./githubicon.svg";
import LinkedinIcon from "./Linkedinicon.svg";
import BornIcon from "./bornicon.svg";

import { LevelBar } from "../../components/UI/LevelBar/LevelBar";
import FriendsTable from "../../components/UI/FriendsTable/FriendsTable";
import AchievementList from "../../components/UI/AchievementComponents/AchievementList/AchievementList";
import BlockedTable from "../../components/UI/BlockedTable/BlockedTable";
import CongratulationsBadge from "../../components/UI/AchievementComponents/CongratulationsBadge/CongratulationsBadge";
import EditProfile from "../../components/UI/ProfileSettings/EditProfile/EditProfile";
import EditSecurity from "../../components/UI/ProfileSettings/EditSecurity/EditSecurity";
import TwoFactorAuthenticationProfile from "../../components/UI/ProfileSettings/TwoFactorAuthenticationProfile/TwoFactorAuthenticationProfile";


import FriendsInCommon from "../../components/UI/FriendsInCommon/FriendsInCommon";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
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
          <img className="img" alt="Calendar icon" src={BornIcon} />
          <div className="text-wrapper-2">Born April 2, 2004</div>
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

export default function UserProfileViewAs() {
  const [showAchievementList, setShowAchievementList] = React.useState(false);

  const handleCloseClick = () => {
    setShowAchievementList(false);
  };
  const [UserOptions, setUserOptions] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (UserAction) => {
    setUserOptions(UserAction);
    onOpen();
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
              src="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
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

            <div className="menu-Buttons">

              <div className="Social-Icons">

              <Tooltip color="primary" content="Visit Github">
                <Image
                  src={GithubIcon}
                  radius="none"
                  alt="Github icon"
                  width={"31px"}
                  className="social-icon"
                  />
              </Tooltip>

              <Tooltip color="primary" content="Visit Linkdin">
                <Image
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
                isDisabled
                startContent={
                  <Image
                    width={"20px"}
                    radius="none"
                    src={AddFriendIcon}
                    alt="add-friend-icon"
                  />
                }
              >
                Add friend
              </Button>
           

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

          <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {" "}
                    {UserOptions}{" "}
                  </ModalHeader>
                  <ModalBody>
                    {UserOptions === "Unfriend" ? (
                      <p>Are you sure you want to unfriend this user?</p>
                    ) : UserOptions === "Block" ? (
                      <p>Are you sure you want to block this user?</p>
                    ) : null}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Closed
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      {UserOptions === "Unfriend" ? "Unfriend" : "Block"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
