import React from "react";
import "./UserListMessages.css";
import { Grid, GridItem, Divider } from "@chakra-ui/react";
import { ScrollShadow } from "@nextui-org/react";
import UserListHeader from "../UserListHeader/UserListHeader";
import MessagesItems from "../MessagesItems/MessagesItems";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { useNavigate } from "react-router-dom";
import { setIsSelectedMessage } from "../../../../state/iPongChatState/iPongChatState";
import api from "../../../../api/posts";
import {formatTimeDifference} from "../../NotificationsBar/NotificationsBar";
import { setListMessages } from "../../../../state/iPongChatState/iPongChatState";
export default function UserListMessages(props) {
  const UserChat = useSelector((state: RootState) => state.iPongChat);
  const UserId = useSelector((state: RootState) => state.userState.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await api.get(`/chatroom/myrooms`);


        console.log("myrooms::> ", response.data);
          const MessageList = response.data.map((message) => {
          let memberInfo;

          if (message.type === "Dm") {
            message.members.find((member) => {
              if (member.member.userId !== UserId) {
                memberInfo = member.member;
              }
            });
          }
          return {
            id: message.id,
            type: message.type,
            senderId: (message.type === "Dm" ? memberInfo.userId : ""),
            fullname: (message.type === "Dm" ? memberInfo.firstName + " " + memberInfo.lastName : message.name),
            time: formatTimeDifference(message.lastMessage.createdAt),
            avatar: (message.type === "Dm" ? memberInfo.avatar : message.icon),
            isSelect: false,
            lastMessage: message.lastMessage.content,
          };

        });
        dispatch(setListMessages(MessageList));

      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers()

  }, []);


  const handelListChatItem = (id) => {
    dispatch(setIsSelectedMessage(id));
    navigate(`/ipong/chat/${id}`);
  };

  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "main"`}
      gridTemplateRows={"130px 1fr 30px"}
      h="100%"
      w={"100%"}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" w={"full"} area={"header"}>
        <UserListHeader ShowCreateNewChat={props.ShowCreateNewChat} />
      </GridItem>
      <GridItem pl="2" bg="black" className="kkk" area={"main"}>
        <ScrollShadow hideScrollBar className="h-full">
          {UserChat.ListMessages.map((message, index) => (
            <React.Fragment key={index}>
              <MessagesItems
                IsSelectes={message.isSelect}
                handelCLickChat={() => handelListChatItem(message.id)}
                name={message.fullname}
                messageTime={message.time}
                lastMessage={message.lastMessage}
                avatar={message.avatar}
              />
            </React.Fragment>
          ))}
        </ScrollShadow>
      </GridItem>
    </Grid>
  );
}
