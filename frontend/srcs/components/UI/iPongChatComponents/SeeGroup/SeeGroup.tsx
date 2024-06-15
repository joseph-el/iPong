import React, { useEffect, useState } from "react";
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
import { Select, SelectItem } from "@nextui-org/select";
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
import { Selection } from "@nextui-org/react";
import Close from "../../Button/CloseButton/CloseButton";

import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import api from "../../../../api/posts";
import { useDispatch } from "react-redux";
import { setGroupSetting } from "../../../../state/iPongChatState/iPongChatState";

const PeopleListItem = ({ Members, MyId }) => {
  console.log("Members: |", Members, "|");
  console.log("MyId: |", MyId, "|");
  if (Members.UserId === MyId)
     return null;
  return (
    <div className="PeopleListItem-frame">
      <div className="User-info-details">
        <img src={Members.Avatar} alt="user-avatar" className="User-avatar" />

        <div className="User-infos">
          <div className="User-fullname">{Members.Name}</div>
          <div className="User-description">
            {Members.IsAdmin ? "Admin" : "Member"}
          </div>
        </div>
      </div>

      <div className="actions">
        <div className="options">
          <Dropdown>
            <DropdownTrigger>
              <img
                src={OptionIcon}
                alt="options-icon"
                className="options-icon"
              />
            </DropdownTrigger>
            {Members.IsAdmin === true && (
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem className="invite-People-list-text" key="new">
                  Remove member
                </DropdownItem>
                <DropdownItem className="invite-People-list-text" key="copy">
                  Mute member
                </DropdownItem>
                <DropdownItem className="invite-People-list-text" key="copy">
                  Make admin
                </DropdownItem>
                <DropdownItem className="invite-People-list-text" key="copy">
                  Ban member
                </DropdownItem>

                <DropdownItem className="invite-People-list-text" key="copy">
                  View profile
                </DropdownItem>
              </DropdownMenu>
            )}
            {Members.IsAdmin === false && (
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem className="invite-People-list-text" key="copy">
                  View profile
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const EditGroup = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [selectedAvatar, setSelectedAvatar] = useState(
    props.selectedMessage.avatar
  );
  const [AvatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState("");

  const [GroupName, setGroupName] = useState("");
  const [GroupType, setGroupType] = React.useState<Selection>(new Set([]));
  const [GroupPassword, setGroupPassword] = useState("");
  const [IsReady, setIsReady] = useState(false);

  const displayGroupType = Array.from(GroupType).join(", ");

  const handelSubmitData = () => {
    // TODO: check validation

    console.log("Group Name:", GroupName);
    console.log("Group Type:", displayGroupType);
    console.log("Group Password:", GroupPassword);
    // console.log("Avatar File:", AvatarFile);

    // setIsReady(true);
  };

  // POST Group Setting  TODO:
  useEffect(() => {
    const PostGroupSetting = async () => {
      try {
      } catch (error) {}
    };
    IsReady && PostGroupSetting();
  }, [IsReady]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => {
        if (image.width < 50 || image.height < 50) {
          setError("Avatar image should be at least 50x50 pixels");
        } else {
          setError("");
          setAvatarFile(file);
          setSelectedAvatar(reader.result);
        }
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        onOpenChange={props.onOpenChange}
        backdrop={"opaque"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-ModalContent invite-People-list-text ">
                Group settings
              </ModalHeader>

              <ModalBody>
                <div className="Edit-profile EditGroup-blurbackground">
                  <div className="Groups-Info">
                    <label htmlFor="avatarInput">
                      <div className="Edit-avatar">
                        <Avatar
                          isBordered
                          className="User-avatar w-24 h-24"
                          src={selectedAvatar}
                        />
                        <CameraIcon
                          className="animate-pulse w-6 h-6 text-default-500 Edit-group-icon"
                          fill="currentColor"
                        />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="avatarInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(event) => handleImageChange(event)}
                    />

                    {error != "" && (
                      <p className="text-default-500 text-small">{error}</p>
                    )}

                    <div className="edit-Group-Name">
                      <Input
                        label="Group Name"
                        onChange={(e) => {
                          setGroupName(e.target.value);
                        }}
                        defaultValue={props.selectedMessage.fullname}
                        className="max-w-xs "
                      />
                    </div>
                  </div>

                  <div className="privacy-setting">
                    <div className="Private-and-Security-title">
                      Private & Security
                    </div>
                    <Select
                      selectedKeys={GroupType}
                      className="max-w-xs"
                      onSelectionChange={setGroupType}
                      label="Group Type"
                      placeholder="Select Group Type"
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
                      defaultValue={"tnaceur123"}
                      onChange={(e) => {
                        setGroupPassword(e.target.value);
                      }}
                      isDisabled={
                        displayGroupType == "protected" ? false : true
                      }
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
                <Button color="primary" onClick={handelSubmitData}>
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

export default function SeeGroup(props) {
  const [MuteMode, setMuteMode] = useState(false);
  const [UserOptions, setUserOptions] = React.useState("");
  const [EditProfileState, setEditProfileState] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );
  const UserId = useSelector((state: RootState) => state.userState.id);

  const handleOpen = (UserAction) => {
    setUserOptions(UserAction);
    onOpen();
  };

  // TODO: Get Friends List from the server And List Group Members and filter the friends that are not in the group
  const [filteredUsers, setFilteredUsers] = useState([]);

  /*
isAdmin
: 
true
isBanned
: 
false
isMuted
: 
false
joinedAt
: 
"2024-06-12T14:08:13.192Z"
member
: 
{userId: '66a1feef-4fce-48cf-99da-475a7dfaa6f7', email: 'mmounaji@student.1337.ma', username: 'mmounaji', intraId: '115443', online: false, …}
muted_exp
: 
null
  */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(
          `/chatroom/${selectedMessage?.id}/members`
        );
        console.log("Room members:> ", response.data);
        const Members = response.data.map((member) => {
          return {
            IsAdmin: member.isAdmin,
            IsMuted: member.isMuted,
            IsBanned: member.isBanned,
            Email: member.member.email,
            Name: member.member.firstName + " " + member.member.lastName,
            Avatar: member.member.avatar,
            UserId: member.member.userId,
            Username: member.member.username,
          };
        });
        console.log("Members:>>>>>> ", Members);
        setFilteredUsers(Members);
      } catch (err) {
        console.error("can`t get members> ", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      className={
        !EditProfileState
          ? "z-50 bg-overlay/50 backdrop-opacity-disabled w-screen h-screen fixed inset-0"
          : ""
      }
    >
      <div className="AchievementList-place fade-in">
        <NextUIProvider style={{ display: EditProfileState ? "none" : "" }}>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <SeeGroupWrapper>
              <ScrollShadow hideScrollBar className="h-full" size={5}>
                <div className="SeeGroup-frame">
                  <div className="User-info">
                    <Avatar
                      isBordered
                      className="User-avatar w-24 h-24"
                      src={selectedMessage?.avatar}
                    />
                    <div className="info">
                      <div className="User-name">
                        {selectedMessage?.fullname}
                      </div>

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

                  <Close
                    func={() => props.handleCloseClick()}
                    ClassName={"Customize-chat-icon animate-pulse"}
                    id="close"
                  />

                  <div
                    className="Customize-chat"
                    onClick={() => {
                      // dispatch(setGroupSetting(!ShowGroupChatSettings));
                      setEditProfileState(true);
                    }}
                  >
                    <div className="Customize-chat-title">Customize Chat</div>
                    <div className="Customize-chat-button">
                      <div className="Customize-chat-button-text">
                        Change Name and Photo
                      </div>
                      <img
                        src={EditIcon}
                        alt="Customize-chat-icon"
                        className=""
                      />
                    </div>
                  </div>

                  <div className="People-List">
                    <div className="PeopleList-title">People</div>

                    <div className="peopleContent">
                      <div className="invite-People">
                        <Select
                          items={users} // TODO: set Users by List Firends and not alearady in the group
                          placeholder="Add People..."
                          labelPlacement="outside"
                          className="max-w-xs invite-People-list"
                        >
                          {(user) => (
                            <SelectItem
                              key={user.id}
                              textValue={"Add People..."}
                            >
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

                                  {/* <div className="flex "> */}
                                  <span className="text-tiny text-default-400">
                                    {user.email}
                                  </span>
                                  {/* <img
                                  src={AcceptIcon}
                                  className="w-[20px] h-[20px] gap-2"
                                  alt="AddIcon"
                                /> */}

                                  {/* </div> */}
                                </div>
                              </div>
                            </SelectItem>
                          )}
                        </Select>
                      </div>

                      <ScrollShadow hideScrollBar className="h-[300px]">
                        {filteredUsers.map((person, index) => (
                          <PeopleListItem Members={person} MyId={UserId} />
                        ))}
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
                selectedMessage={selectedMessage}
                isOpen={EditProfileState}
                onClose={() => {
                  setEditProfileState(!EditProfileState);
                }}
              />
            </SeeGroupWrapper>
          </NextThemesProvider>
        </NextUIProvider>
      </div>
    </div>
  );
}
