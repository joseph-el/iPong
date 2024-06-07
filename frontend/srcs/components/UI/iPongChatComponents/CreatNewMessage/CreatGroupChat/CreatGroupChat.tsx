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
import { users } from "../../SeeGroup/data";

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

import CustomButton from "../../../Button/SubmitButton/SubmitButton";

import { EyeFilledIcon } from "../../../Input/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../Input/EyeSlashFilledIcon";
import Close from "../../../Button/CloseButton/CloseButton";

export default function CreatGroupChat(props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [GroupName, setGroupName] = React.useState("");
  const [GroupType, setGroupType] = React.useState<Selection>(new Set([]));
  const [GroupPassword, setGroupPassword] = React.useState("");
  const [GroupMembers, setGroupMembers] = React.useState<Selection>(
    new Set([])
  );

  const [GroupNameIsValid, setGroupNameIsValid] = React.useState(false);
  const [GroupTypeIsValid, setGroupTypeIsValid] = React.useState(false);
  const [GroupPasswordIsValid, setGroupPasswordIsValid] = React.useState(false);
  const [GroupMembersIsValid, setGroupMembersIsValid] = React.useState(false);

  /* POST REQUEST TO CREATE A NEW GROUP
          const handleCreateGroup = () => {}
  */

  const displayGroupType = Array.from(GroupType).join(", ");

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
      displayGroupType === "private" &&
      (GroupPassword === "" ||
        GroupPassword.length < 5 ||
        GroupPassword.length > 20)
    ) {
      setGroupPasswordIsValid(true);
      return;
    } else {
      setGroupPasswordIsValid(false);
    }
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
            <div className="Edit-avatar">
              <Avatar
                className="User-avatar w-24 h-24"
                src="https://scontent.fcmn1-2.fna.fbcdn.net/v/t39.30808-6/340242838_159501407041277_2734451423562002343_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFyvo2pTF2mgIKANMob3z8USQ34jUDh201JDfiNQOHbTVONa7_GVq_51GNSwIdNq3o3_3XY57rylLV5N4uofeIH&_nc_ohc=Okm3Jt5r4DoQ7kNvgFvUVUq&_nc_ht=scontent.fcmn1-2.fna&oh=00_AYBnMKq1nwB-R-wVuQCwpnEe2lySQW1DXDZZnBw3hNuViQ&oe=66610A17"
              />

              <CameraIcon
                className="animate-pulse w-6 h-6 text-default-500 Edit-group-icon"
                fill="currentColor"
              />
            </div>

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
                isDisabled={displayGroupType == "private" ? false : true}
                value={displayGroupType == "private" ? GroupPassword : ""}
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
              // console.log("Group Name: ", GroupName);
              // console.log("Group Type: ", GroupType);
              // console.log("Group Password: ", GroupPassword);
              // console.log("Group Members: ", GroupMembers);
              // console.log("eee: ", displayGroupType);
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
