import React, { useState } from "react";
import "./SeeGroup.css";

import { SeeGroupWrapper } from "./SeeGroupWrapper";
import { Avatar } from "@nextui-org/avatar";

import { Grid, GridItem } from "@chakra-ui/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import UnmuteIcon from "./unmute.svg";
import MuteIcon from "./mute.svg";
import EditIcon from "./edit.svg";
import InviteIcon from "./invite.svg";
import RejectIcon from "./reject.svg";
import AcceptIcon from "./approve.svg";
import OptionIcon from "./peopleListOption.svg";
import { Select, SelectItem } from "@nextui-org/react";
import { users } from "./data";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import IPongAlert from "../../iPongAlert/iPongAlert";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

import { EyeFilledIcon } from "../../Input/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Input/EyeSlashFilledIcon";

import { CameraIcon } from "../../ProfileSettings/EditProfile/CameraIcon";

const PeopleListItem = (props) => {
  return (
    <div className="PeopleListItem-frame">
      <div className="User-info-details">
        <img src={props.avatarLink} alt="user-avatar" className="User-avatar" />

        <div className="User-infos">
          <div className="User-fullname">{props.name}</div>
          <div className="User-description">{props.description}</div>
        </div>
      </div>

      <div className="actions">
        {props.Action === "Request" ? (
          <div className="request">
            <img src={RejectIcon} alt="request-icon" className="RejectIcon" />
            <img src={AcceptIcon} alt="request-icon" className="AcceptIcon" />
          </div>
        ) : (
          <div className="options">
            <Dropdown>
              <DropdownTrigger>
                <img
                  src={OptionIcon}
                  alt="options-icon"
                  className="options-icon"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem className="invite-People-list-text" key="new">
                  Remove member
                </DropdownItem>
                <DropdownItem className="invite-People-list-text" key="copy">
                  Mute
                </DropdownItem>
                <DropdownItem className="invite-People-list-text" key="copy">
                  View profile
                </DropdownItem>
                <DropdownItem className="invite-People-list-text" key="copy">
                  Make admin
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

const EditGroup = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        onOpenChange={props.onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-ModalContent invite-People-list-text ">
                Group settings
              </ModalHeader>

              <ModalBody>
                <div className="Edit-profile">
                  
                  <div className="Groups-Info">
                    <Avatar
                      className="User-avatar w-24 h-24"
                      src="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />

                    <CameraIcon
                      className="animate-pulse w-6 h-6 text-default-500 Edit-group-icon"
                      fill="currentColor"
                    />

                    <div className="edit-Group-Name">
                      <Input
                        label="Group Name"
                        value={"Taha Naceur"}
                        className="max-w-xs "
                      />
                    </div>
                  </div>

                  <div className="privacy-setting">
                    <div className="Private-and-Security-title">
                      Private & Security
                    </div>
                    <Select
                      label="Group Type"
                      placeholder="Select Group Type"
                      className="max-w-xs"
                    >
                      <SelectItem className="text-small-ovrride" key={"public"}>
                        public
                      </SelectItem>
                      <SelectItem
                        className="text-small-ovrride"
                        key={"private"}
                      >
                        private
                      </SelectItem>
                      <SelectItem
                        className="text-small-ovrride"
                        key={"protected"}
                      >
                        protected
                      </SelectItem>
                    </Select>

                    <Input
                      label="Group password"
                      value={"tnaceur123"}
                      isDisabled
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      className="max-w-xs Group-Password"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default function SeeGroup() {
  const [MuteMode, setMuteMode] = useState(false);
  const [UserOptions, setUserOptions] = React.useState("");
  const [EditProfileState, setEditProfileState] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (UserAction) => {
    setUserOptions(UserAction);
    onOpen();
  };

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SeeGroupWrapper>
          <ScrollShadow hideScrollBar className="h-full" size={5}>
            <div className="SeeGroup-frame">
              <div className="User-info">
                <Avatar
                  className="User-avatar w-24 h-24"
                  src="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                />

                <div className="info">
                  <div className="User-name">Team 13 Tnaceur</div>

                  <div className="ipongchar">ipongChat</div>
                </div>
              </div>

              <img
                src={MuteMode ? MuteIcon : UnmuteIcon}
                alt="mute-icon"
                className={MuteMode ? "mute-icon" : "unmute-icon"}
                onClick={() => {
                  setMuteMode(!MuteMode);
                }}
              />

              <img
                onClick={() => {
                  setEditProfileState(!EditProfileState);
                }}
                src={EditIcon}
                alt="Customize-chat-icon"
                className="Customize-chat-icon animate-pulse"
              />
              {/* <div className="Customize-chat">
                <div className="Customize-chat-title">Customize Chat</div>
                <div className="Customize-chat-button">
                  <div className="Customize-chat-button-text">
                    Change Name and Photo
                  </div>

                </div>
              </div> */}

              <div className="People-List">
                <div className="PeopleList-title">People</div>

                <div className="peopleContent">
                  <div className="invite-People">
                    <Select
                      items={users}
                      placeholder="Add People..."
                      labelPlacement="outside"
                      className="max-w-xs invite-People-list"
                    >
                      {(user) => (
                        <SelectItem key={user.id} textValue={"Add People..."}>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              alt={user.name}
                              className="flex-shrink-0"
                              size="sm"
                              src={user.avatar}
                            />
                            <div className="flex flex-col">
                              <span className="text-small invite-People-list-text ">
                                {user.name}
                              </span>
                              <span className="text-tiny text-default-400">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  </div>

                  <ScrollShadow hideScrollBar className="h-[300px]">
                    <PeopleListItem
                      name="Mohamed Tnaceur"
                      description="requesting to join"
                      Action="Request"
                      avatarLink="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />
                    <PeopleListItem
                      name="Mohamed Tnaceur"
                      description="Admin"
                      Action="seeOptions"
                      avatarLink="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />

                    <PeopleListItem
                      name="Mohamed Tnaceur"
                      description="requesting to join"
                      Action="Request"
                      avatarLink="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />

                    <PeopleListItem
                      name="Mohamed Tnaceur"
                      description="Admin"
                      Action="seeOptions"
                      avatarLink="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />

                    <PeopleListItem
                      name="Mohamed Tnaceur"
                      description="Admin"
                      Action="seeOptions"
                      avatarLink="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />

                    <PeopleListItem
                      name="Mohamed Tnaceur"
                      description="requesting to join"
                      Action="Request"
                      avatarLink="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />

                    <PeopleListItem
                      name="Mohamed Tnaceur"
                      description="Admin"
                      Action="seeOptions"
                      avatarLink="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
                    />
                  </ScrollShadow>
                </div>
              </div>

              <div className="privacy">
                <div className="privacy-title"> privacy </div>

                <div className="privacy-options">
                  {/* <div className="Private-and-Security">Private & Security</div> */}
                  <div
                    className="DeleteChat"
                    onClick={() => {
                      handleOpen("Delete Chat");
                    }}
                  >
                    {" "}
                    Delete Chat{" "}
                  </div>
                  <div
                    className="Leave-this-conversation"
                    onClick={() => {
                      handleOpen("Leave this Group");
                    }}
                  >
                    Leave this Group
                  </div>
                </div>
              </div>
            </div>
          </ScrollShadow>

          <IPongAlert
            isOpen={isOpen}
            onClose={onClose}
            UserAlertHeader={UserOptions}
            UserAlertMessage={
              UserOptions === "Delete Chat"
                ? "Are you sure you want to Delete this chat ?"
                : UserOptions === "Leave this Group"
                ? "Are you sure you want to Leave this Group?"
                : null
            }
            UserOptions={
              UserOptions === "Delete Chat" ? "Delete Chat" : "Leave Group"
            }
          ></IPongAlert>

          <EditGroup
            isOpen={EditProfileState}
            onClose={() => {
              setEditProfileState(!EditProfileState);
            }}
          />
        </SeeGroupWrapper>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

/**
 * 
 * 

 */
