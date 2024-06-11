import React from "react";
import "./StartFriendChat.css";

import "../CreatGroupChat/CreatGroupChat.css";
import { Selection } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Close from "../../../Button/CloseButton/CloseButton";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { StartFriendChatWrapper } from "./StartFriendChatWrapper";
import CustomButton from "../../../Button/SubmitButton/SubmitButton";

import { useState, useEffect } from "react";
import api from "../../../../../api/posts";

export default function StartFriendChat(props) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [CreatChatRoom, setCreatChatRoom] = useState(false);

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
  }, []);

  const handelOnChage = (item) => {
    console.log("Item:::OnChange: ", item);
    setValue(item);

  };



  useEffect(() => {
    const fetchCreatChatRoom = async () => {
      try {

        console.log("UserId:::", value);
        const response = await api.post(`/chatroom/create`, {
          type: "Dm",
          secondUser: value,
        });
          setCreatChatRoom(false);
          navigate(`/ipong/chat/${response.data.id}`);        
      } catch (error) {
        console.error(error);
      }
    }
    CreatChatRoom && fetchCreatChatRoom();
  }, [CreatChatRoom]);

  const handleStartChat = () => {
    if (value.length === 0) {
      setIsInvalid(true);
      return;
    }
    setCreatChatRoom(true);
    
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
                    alt={item.name}
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
              <SelectItem key={user.id} textValue={user.name} onClick={() => handelOnChage(user.userId)} >
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
