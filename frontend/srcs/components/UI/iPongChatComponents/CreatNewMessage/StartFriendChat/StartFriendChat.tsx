import React from "react";
import "./StartFriendChat.css";

import { users } from "../../SeeGroup/data";
import "../CreatGroupChat/CreatGroupChat.css";
import { Selection } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Close from "../../../Button/CloseButton/CloseButton";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { StartFriendChatWrapper } from "./StartFriendChatWrapper";
import CustomButton from "../../../Button/SubmitButton/SubmitButton";


export default function StartFriendChat(props) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState<Selection>(new Set([]));
  const [isInvalid, setIsInvalid] = React.useState(false);

  const handleStartChat = () => {
    if (value.size === 0) {
      console.log("Please select a friend");
      setIsInvalid(true);
      return;
    }
    navigate("/Chat/NewChat");
  };

  return (
    <StartFriendChatWrapper>
      <div className="StartFriendChat-frame">
        <Close
          ClassName="closeicons"
          func={props.onCloseComponent}
          id="close"
        />

        <div className="StartFriendChat-header">Start Friend Chat</div>

        <div className="Select-friend">
          <Select
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : undefined}
            items={users}
            label="Friends"
            placeholder="Select a friend"
            className="max-w-xs"
            onSelectionChange={setValue}
            onClick={() => setIsInvalid(false)}
            classNames={{
              label: "group-data-[filled=true]:-translate-y-5",
              trigger: "min-h-16",
              listboxWrapper: "max-h-[400px]",
            }}
            listboxProps={{
              itemClasses: {
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
              },
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.data.avatar}
                  />
                  <div className="flex flex-col">
                    <span>{item.data.name}</span>
                    <span className="text-default-500 text-tiny">
                      ({item.data.email})
                    </span>
                  </div>
                </div>
              ));
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

        <div className="descriptions">
          <p className="text-ovrride">
            Select a friend from the list to start a conversation. You can find
            your friends by their name or email address in the dropdown menu.
            After making your selection, click 'Start Chat' to begin your
            conversation and catch up with them
          </p>
        </div>
        <div className="buttons-target" onClick={handleStartChat}>
          <CustomButton
            classNames="sign-in-competent-sign-in hover:animate-pulse"
            text="Start Chat"
          />
        </div>
      </div>
    </StartFriendChatWrapper>
  );
}
