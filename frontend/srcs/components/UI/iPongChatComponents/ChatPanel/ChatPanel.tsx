import React, { useRef, useEffect } from "react";
import "./ChatPanel.css";

import { RightChatBubbles } from "../ChatBubbles/ChatBubbles";
import { LeftChatBubbles } from "../ChatBubbles/ChatBubbles";


import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import api from "../../../../api/posts";
import { useDispatch } from "react-redux";

import {formatTimeDifference} from "../../NotificationsBar/NotificationsBar";

import { ScrollShadow } from "@nextui-org/react";
import {setMessages} from "../../../../state/iPongChatState/iPongChatState";
export default function ChatPanel() {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );
  const chatBubbleProps = useSelector(
    (state: RootState) => state.iPongChat.messages
  );
  const [UserIsBlocked, setUserIsBlocked] = React.useState(false);

  const UserId = useSelector((state: RootState) => state.userState.id);
  
  useEffect(() => {
    const checkBlocked = async () => {
      try {
        const response = await api.get(`/friendships/isBlocked/${selectedMessage?.id}`);
        console.log(`User is blocked: ${response.data}`);

      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    }
    checkBlocked();
  }, []);
  
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatBubbleProps]);



  console.log(selectedMessage);
    useEffect(() => {
      const fetchChat = async () => {
        try {
            const response = await api.get(`/messages/room/${selectedMessage?.id}`);
            console.log("haia :", response.data);
            const MessageList = response.data.map((message) => {
              return {
                id: message.id,
                authorId: message.authorId,
                message: message.content,
                time: formatTimeDifference(message.time),
                avatar: message.avatar,
              };
            });
            dispatch(setMessages(MessageList));
        } catch (error) {
          console.error("Error fetching chat:", error);
        }
      }
      fetchChat();
    }, []);

  return (
    <div className="ChatPanel-frame" ref={scrollRef}>
      <ScrollShadow size={10} hideScrollBar ref={scrollRef} className="ChatPanel-frame">
      
      {chatBubbleProps.map((chatBubble, index) => {
        return  chatBubble.authorId !== UserId ? (
          <RightChatBubbles
            className="RightChatBubbles-frame"
            key={index}
            message={chatBubble.message}
            avatarUrl={chatBubble.avatar}
          />
        ) : (
          <LeftChatBubbles
            className="LeftChatBubbles-frame"
            key={index}
            message={chatBubble.message}
            avatarUrl={chatBubble.avatar}
          />
        );
      })}
      </ScrollShadow>
    </div>
  );
}
