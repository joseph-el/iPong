import React from "react";
import "./CreatGroupChat.css";
import { CreatGroupChatWrapper } from "./CreatGroupChatWrapper";
import { Input, Avatar } from "@nextui-org/react";
import { CameraIcon } from "../../../ProfileSettings/EditProfile/CameraIcon";
import {
  Select,
  SelectItem,
  ScrollShadow,
  Chip,
  Selection,
  SelectedItems,
} from "@nextui-org/react";
// import { users } from "../../SeeGroup/data";
import CustomButton from "../../../Button/SubmitButton/SubmitButton";
import { EyeFilledIcon } from "../../../Input/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../Input/EyeSlashFilledIcon";
import Close from "../../../Button/CloseButton/CloseButton";
import { useEffect, useState } from "react";
import api from "../../../../../api/posts";
import DefaultGroupImage from "./memoji/alta1r.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state/store";
type User = {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
};

export default function CreatGroupChat(props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [GroupName, setGroupName] = useState("");
  const [GroupType, setGroupType] = useState<Selection>(new Set([]));
  const [GroupPassword, setGroupPassword] = useState("");
  const [GroupMembers, setGroupMembers] = useState<Selection>(new Set([]));
  const [GroupNameIsValid, setGroupNameIsValid] = useState(false);
  const [GroupTypeIsValid, setGroupTypeIsValid] = useState(false);
  const [GroupPasswordIsValid, setGroupPasswordIsValid] = useState(false);
  const [GroupMembersIsValid, setGroupMembersIsValid] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [AvatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [ReadyToSubmit, setReadyToSubmit] = useState(false);
  const displayGroupType = Array.from(GroupType).join(" ");
  const [testID, setTestID] = useState("");

  const UpdateApp = useSelector((state: RootState) => state.update.update);
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
        setUsers(friendsList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [UpdateApp]);

  useEffect(() => {
    const fetchReadyToSubmit = async () => {
      try {
        let NewRoom;
        console.log("response roomooooo : |", displayGroupType, "|");
        console.log(
          "response roomooooo : ",
          displayGroupType,
          GroupPassword,
          GroupName
        );
        const response = await api.post("chatroom/create", {
          type: displayGroupType,
          password: GroupPassword,
          roomName: GroupName,
        });
        console.log("response room : ", response.data);
        NewRoom = response.data.id;

        console.log("response room : ", NewRoom);

        if (AvatarFile) {
          const formDataAvatar = new FormData();
          formDataAvatar.append("file", AvatarFile!);
          try {
            const response = await api.post(
              `chatroom/rooomIcon/${NewRoom}`,

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
        GroupMembers.forEach(async (member) => {
          try {
            const response2 = await api.post(
              `chatroom/invite/${users[member].userId}/${NewRoom}`
            );
            console.log("invite:: ", response2.data);
          } catch (error) {
            console.log("error add members :", error);
          }
        });
      } catch (error) {}
    };
    ReadyToSubmit && fetchReadyToSubmit();
  }, [ReadyToSubmit, UpdateApp]);
  /* POST REQUEST TO CREATE A NEW GROUP
          const handleCreateGroup = () => {}
  */

  const handelPassingData = () => {
    if (GroupName === "" || GroupName.length < 3 || GroupName.length > 20) {
      setGroupNameIsValid(true);
      return;
    } else {
      setGroupNameIsValid(false);
    }

    if (GroupMembers.size === 0) {
      setGroupMembersIsValid(true);
      return;
    } else {
      setGroupMembersIsValid(false);
    }

    if (displayGroupType === "") {
      setGroupTypeIsValid(true);
      return;
    } else {
      setGroupTypeIsValid(false);
    }

    if (
      displayGroupType === "protected" &&
      (GroupPassword === "" ||
        GroupPassword.length < 5 ||
        GroupPassword.length > 20)
    ) {
      setGroupPasswordIsValid(true);
      return;
    } else {
      setGroupPasswordIsValid(false);
    }

    console.log("everything is valid");
    console.log("Group Name: ", GroupName);
    console.log("Group Type: ", GroupType);
    console.log("Group Password: ", GroupPassword);
    console.log("Group Members: ", GroupMembers);
    console.log("extract type : ", displayGroupType);

    const membersArray = Array.from(GroupMembers);
    console.log(membersArray);

    if (GroupMembers === "all") {
      console.log("All members selected");
    } else if (GroupMembers instanceof Set) {
      GroupMembers.forEach((member) => {
        console.log(member);
        setTestID(users[member].userId);
      });
    }

    // TODO: wait for the backend to be ready
    setReadyToSubmit(true);
  };

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
    <CreatGroupChatWrapper>
      <ScrollShadow className="h-[550px]" size={5} hideScrollBar>
        <div className="CreatGroupChat-frame">
          <Close
            ClassName="closeicons"
            func={props.onCloseComponent}
            id="close"
          />

          <div className="Groups-Info">
            <label htmlFor="avatarInput">
              <div className="Edit-avatar">
                <Avatar
                  isBordered
                  className="User-avatar w-24 h-24"
                  src={selectedAvatar ? selectedAvatar : DefaultGroupImage}
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
                isInvalid={GroupNameIsValid}
                errorMessage={"Group Name must be between 3 and 20 characters"}
                // label="Group Name"
                onClick={() => setGroupNameIsValid(false)}
                placeholder="Enter Group Name"
                value={GroupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>

          <div className="Add-people">
            <div className="Add-people-title">Invite people</div>

            <Select
              errorMessage={"Please select at least one user"}
              items={users}
              label=""
              onClick={() => setGroupMembersIsValid(false)}
              isInvalid={GroupMembersIsValid}
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Select a user"
              labelPlacement="outside"
              onSelectionChange={setGroupMembers}
              classNames={{
                base: "max-w-xs",
                trigger: "min-h-12 py-2",
              }}
              renderValue={(items: SelectedItems<User>) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Chip key={item.key}>{item.data.name}</Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(user) => (
                <SelectItem key={user.id} textValue={user.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={user.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={user.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{user.name}</span>
                      <span className="text-tiny text-default-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          <div className="group-privaty">
            <div className="group-privaty-title">Group Privacy</div>
            <div className="group-privaty-select">
              <Select
                errorMessage={"Please select a group type"}
                onClick={() => setGroupTypeIsValid(false)}
                isInvalid={GroupTypeIsValid}
                placeholder="Select Group Type"
                className="max-w-xs"
                selectedKeys={GroupType}
                onSelectionChange={setGroupType}
              >
                <SelectItem className="text-small-ovrride" key={"public"}>
                  public
                </SelectItem>
                <SelectItem className="text-small-ovrride" key={"private"}>
                  private
                </SelectItem>
                <SelectItem className="text-small-ovrride" key={"protected"}>
                  protected
                </SelectItem>
              </Select>

              <Input
                onClick={() => setGroupPasswordIsValid(false)}
                errorMessage={
                  "Group password must be between 5 and 20 characters"
                }
                placeholder="Enter Group Password"
                isInvalid={GroupPasswordIsValid}
                isDisabled={displayGroupType == "protected" ? false : true}
                value={displayGroupType == "protected" ? GroupPassword : ""}
                onChange={(e) => setGroupPassword(e.target.value)}
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

          <div
            className="buttons-target"
            onClick={() => {
              handelPassingData();
            }}
          >
            <CustomButton
              classNames="sign-in-competent-sign-in hover:animate-pulse"
              text="Creat Group"
            />
          </div>
        </div>
      </ScrollShadow>
    </CreatGroupChatWrapper>
  );
}
