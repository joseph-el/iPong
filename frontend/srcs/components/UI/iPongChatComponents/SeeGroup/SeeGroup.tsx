import React, { useEffect, useState } from "react";
import "./SeeGroup.css";

import { SeeGroupWrapper } from "./SeeGroupWrapper";
import { Avatar } from "@nextui-org/avatar";

import { ScrollShadow } from "@nextui-org/scroll-shadow";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Divider,
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

import IPongAlert from "../../iPongAlert/iPongAlert";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
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
import { useNavigate } from "react-router-dom";
import { set } from "lodash";

const PeopleListItem = ({ Members, MyId, RoomId, IsAdmin }) => {
  const navigate = useNavigate();

  if (Members.UserId === MyId) return null;
  const [ActionType, setActionType] = useState<String | null>(null);
  useEffect(() => {
    const PostActions = async () => {
      try {
        const response = await api.post(`/chatroom/${ActionType}`, {
          memberId: Members.UserId,
          roomId: RoomId,
        });

        console.log("response in PostActions: ", response);
      } catch (error) {
        console.log("error in PostActions: ", error);
      }
      setActionType(null);
    };
    ActionType != null && PostActions();
  }, [ActionType]);

  return (
    <div className="PeopleListItem-frame">
      <div className="User-info-details">
        <Avatar
          src={Members.Avatar}
          alt="user-avatar"
          className="User-avatar"
        />

        <div className="User-infos">
          <div className="User-fullname">{Members.Name}</div>
          <div className="User-description">
            {Members.IsAdmin ? "Admin" : "Member"}
          </div>
        </div>
      </div>

      <div className="actions">
        <div className="options">
          <Dropdown className="Memebers-dropdown">
            <DropdownTrigger>
              <img
                src={OptionIcon}
                alt="options-icon"
                className="options-icon"
              />
            </DropdownTrigger>

            {IsAdmin && (
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  className="invite-People-list-text"
                  key="new"
                  onClick={() => setActionType("kickMember")}
                >
                  Remove member
                </DropdownItem>
                
                {!Members.IsAdmin && (
                  <DropdownItem
                    className="invite-People-list-text"
                    key="copy"
                    onClick={() => setActionType("setAdmin")}
                  >
                    Make admin
                  </DropdownItem>
                )}

                <DropdownItem
                  className="invite-People-list-text"
                  key="copy"
                  onClick={() =>
                    setActionType(
                      Members.IsMuted ? "unmuteMember" : "muteMember"
                    )
                  }
                >
                  {Members.IsMuted ? "Unmute Member" : "Mute Member"}
                </DropdownItem>

                <DropdownItem
                  className="invite-People-list-text"
                  key="copy"
                  onClick={() =>
                    setActionType(
                      Members.IsBanned ? "unbanMember" : "banMember"
                    )
                  }
                >
                  {Members.IsBanned ? "Unban Member" : "Ban Member"}
                </DropdownItem>

                <DropdownItem
                  className="invite-People-list-text"
                  key="copy"
                  onClick={() => navigate(`/ipong/users/${Members.UserId}`)}
                >
                  View profile
                </DropdownItem>
              </DropdownMenu>
            )}

            {!IsAdmin && (
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
  const [AvatarRrror, setAvatarError] = useState("");

  const [GroupName, setGroupName] = useState(props.selectedMessage.fullname);
  const [GroupType, setGroupType] = React.useState<Selection>(
    new Set([props.selectedMessage.type])
  );
  const CurrentGroupType = props.selectedMessage.type;
  console.log("CurrentGroupType: ", CurrentGroupType);

  const [GroupPassword, setGroupPassword] = useState("");
  const [IsReady, setIsReady] = useState(false);

  const [GroupNameIsInvalid, setGroupNameIsInvalid] = useState(false);
  const [GroupTypeIsInvalid, setGroupTypeIsInvalid] = useState(false);
  const [GroupPasswordIsInvalid, setGroupPasswordIsInvalid] = useState(false);

  const displayGroupType = Array.from(GroupType).join(", ");

  const [Loading, setLoading] = useState(false);
  const handelSubmitData = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    setAvatarError("");

    if (GroupName === "") {
      setError("Group Name is required");
      setGroupNameIsInvalid(true);
      return;
    }
    if (nameRegex.test(GroupName) === false || GroupName.length < 3) {
      setError(
        GroupName.length < 3 ? "Group Name is too short" : "Invalid Group Name"
      );
      setGroupNameIsInvalid(true);
      return;
    }

    if (GroupType.size === 0) {
      setError("Group Type is required");
      setGroupTypeIsInvalid(true);
      return;
    }
    if (GroupPassword === "" && displayGroupType === "protected" && CurrentGroupType !== "protected") {
      setError("Group Password is required");
      setGroupPasswordIsInvalid(true);
      return;
    }
    if (GroupPassword.length < 6 && displayGroupType === "protected" && CurrentGroupType !== "protected") {
      setError("Group Password is too short");
      setGroupPasswordIsInvalid(true);
      return;
    }

    setIsReady(true);
  };

  useEffect(() => {
    const PostGroupSetting = async () => {
      try {
        setLoading(true);
        if (AvatarFile !== null) {
          const formDataAvatar = new FormData();
          formDataAvatar.append("file", AvatarFile!);
          try {
            const response = await api.post(
              `chatroom/rooomIcon/${props.selectedMessage.id}`,

              formDataAvatar,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("response upload avatar :", response);
          } catch (error) {
            console.log("error upload avatar :", error);
          }
        }
        const response = await api.post("/chatroom/update", {
          roomName: GroupName,
          type: displayGroupType,
          roomId: props.selectedMessage.id,
          password: GroupPassword,
        });
        setLoading(false);
        props.onClose();
      } catch (error) {}
    };
    IsReady && PostGroupSetting();
  }, [IsReady]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("File size should not exceed 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => {
        if (image.width < 50 || image.height < 50) {
          setAvatarError("Avatar image should be at least 50x50 pixels");
        } else {
          setAvatarError("");
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
        className="group-settings-modal"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onOpenChange={props.onOpenChange}
        backdrop={"opaque"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col EditGroup-title  gap-1 border-ModalContent invite-People-list-text ">
                Group settings
              </ModalHeader>

              <ModalBody>
                
                
                <div className="Edit-profile EditGroup-blurbackground ">
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

                    {AvatarRrror != "" && (
                      <p className="text-default-500 text-small">{error}</p>
                    )}

                    <div className="edit-Group-Name">
                      <Input
                        isInvalid={GroupNameIsInvalid}
                        placeholder="Enter Group Name"
                        errorMessage={error}
                        label="Group Name"
                        onChange={(e) => {
                          if (GroupNameIsInvalid) {
                            setGroupNameIsInvalid(false);
                            setGroupTypeIsInvalid(false);
                            setGroupPasswordIsInvalid(false);
                          }
                          setGroupName(e.target.value);
                        }}
                        defaultValue={props.selectedMessage.fullname}
                        className="max-w-xs some-padding"
                      />
                    </div>
                  </div>

                  <div className="privacy-setting">
                    <div className="Private-and-Security-title">
                      Private & Security
                    </div>
                    <Select
                      isInvalid={GroupTypeIsInvalid}
                      errorMessage={error}
                      selectedKeys={GroupType}
                      className="max-w-xs some-padding"
                      onClick={() => {
                        if (GroupTypeIsInvalid) {
                          setGroupNameIsInvalid(false);
                          setGroupTypeIsInvalid(false);
                          setGroupPasswordIsInvalid(false);
                        }
                      }}
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
                      isInvalid={GroupPasswordIsInvalid}
                      errorMessage={error}
                      defaultValue={GroupPassword}
                      placeholder="Enter Group Password"
                      onChange={(e) => {
                        if (GroupPasswordIsInvalid) {
                          setGroupNameIsInvalid(false);
                          setGroupTypeIsInvalid(false);
                          setGroupPasswordIsInvalid(false);
                        }
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
                      className="max-w-xs Group-Password some-padding"
                    />
                  </div>
                </div>


              </ModalBody>

             
              <ModalFooter className="EditGroup-blurbackground Group-setting-footer">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={Loading} color="primary" onClick={handelSubmitData}>
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

  const [filteredUsers, setFilteredUsers] = useState([]);
  const UpdateApp = useSelector((state: RootState) => state.update.update);
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
  }, [UpdateApp]);

  const IsAdmin = filteredUsers.find((member) => {
    return member.UserId === UserId && member.IsAdmin === true;
  });

  const [FriendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/friendship/`);

        const friendsList = response.data.map((friend, index) => {
          return {
            userId: friend.userId,
            id: index,
            name: friend.firstName + " " + friend.lastName,
            avatar: friend.avatar,
            username: friend.uername,
            email: friend.email,
          };
        });
        setFriendsList(friendsList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [UpdateApp]);

  const FriendsNotInRoom = FriendsList.filter((friend) => {
    return !filteredUsers.find((member) => member.UserId === friend.userId);
  });

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const InviteUser = async () => {
      try {
        const response2 = await api.post(
          `chatroom/invite/${selectedUser}/${selectedMessage?.id}`
        );
        console.log("response in invite user: ", response2);
      } catch (error) {
        console.log("error in invite user: ", error);
      }
      setSelectedUser(null);
    };
    selectedUser != null && InviteUser();
  }, [selectedUser]);

  const [MutCHat, setMuteChat] = useState(false);

  useEffect(() => {
    const MuteChat = async () => {
      try {
        const response = await api.post(
          `chatroom/muteChat/${selectedMessage?.id}`
        );
        console.log("response in mute chat: ", response);
      } catch (error) {
        console.log("error in mute chat: ", error);
      }
      setMuteChat(false);
    };
    MutCHat && MuteChat();
  }, [MutCHat]);

  const [LeaveGroup, setLeaveGroup] = useState(false);
  useEffect(() => {
    const LeaveGroupChat = async () => {
      try {
        const response = await api.post("chatroom/leaveRoom/", {
          roomId: selectedMessage?.id,
        });
        console.log("response in leave chat: ", response);
      } catch (error) {
        console.log("error in leave chat: ", error);
      }
      setLeaveGroup(false);
    };
    LeaveGroup && LeaveGroupChat();
  }, [LeaveGroup]);

  return (
    <div
      className={
        !EditProfileState
          ? "z-50 bg-overlay/50 backdrop-opacity-disabled Group-setting w-screen h-screen fixed inset-0"
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

                  <Close
                    func={() => props.handleCloseClick()}
                    ClassName={"Customize-chat-icon animate-pulse"}
                    id="close"
                  />

                  {IsAdmin && (
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
                  )}

                  <div className="People-List">
                    <div className="PeopleList-title">People</div>

                    <div className="peopleContent">
                      <div className="invite-People">
                        <Select
                          items={FriendsNotInRoom}
                          placeholder="Add People..."
                          labelPlacement="outside"
                          className="max-w-xs invite-People-list"
                        >
                          {(user) => (
                            <SelectItem
                              key={user.id}
                              textValue={"Add People..."}
                            >
                              <div
                                className="flex gap-2 items-center"
                                onClick={() => {
                                  setSelectedUser(user.userId);
                                }}
                              >
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
                        {filteredUsers.map((person) => (
                          <PeopleListItem
                            Members={person}
                            MyId={UserId}
                            RoomId={selectedMessage?.id}
                            IsAdmin={IsAdmin}
                          />
                        ))}
                      </ScrollShadow>
                    </div>
                  </div>

                  <div className="privacy">
                    <div className="privacy-title"> privacy </div>

                    <div className="privacy-options">
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
                handelRemoveUser={() => {
                  setLeaveGroup(true);
                }}
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
