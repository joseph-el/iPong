import React from "react";
import "./ChatPanelFooter.css";
import Autocomplete from "react-google-autocomplete";

import SendMessageIcon from "./Messages-sendIcon.svg";
import { Suggestions } from "./exampleSuggestions";

import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";

import { useState, useEffect } from "react";
import api from "../../../../api/posts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import UserSlice from "../../../../state/UserInfo/UserSlice";
import { useSocket } from "../../../../context/SocketContext";
import { current } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import { add, random } from "lodash";
import { addMessage } from "../../../../state/iPongChatState/iPongChatState";
import { User } from "@nextui-org/user";
import { user } from "@nextui-org/react";
export default function ChatPanelFooter({socket}) {

  const dispatch = useDispatch();
  const UserId = useSelector((state: RootState) => state.userState.id);
  const [IsReady, setIsReady] = useState(false);
  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );
  const UserInfo = useSelector((state: RootState) => state.userState);

  const [IsMuted, setIsMuted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {

    if (inputValue.length > 500) {
      return;
    }
    const newValue = event.target.value;

    if (!newValue) {
      // setStyle("20px");
      setSuggestions([]);
      setInputValue(newValue);
      return;
    }
    const lastWord = newValue.split(" ").pop();
    const filteredSuggestions = Suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(lastWord.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      // setStyle("20px");
      setSuggestions([]);
      setInputValue(newValue);
      return;
    }
    // setStyle("0px");
    setSuggestions(filteredSuggestions);
    setInputValue(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    const words = inputValue.split(" ");
    words.pop();
    setInputValue(words.join(" ") + " " + suggestion);
    setSuggestions([]);
    // setStyle("20px");
  };

 
  useEffect(() => {
    const fetchChat = async () => {
      try {
        await api.post(
          `/messages/room/${selectedMessage?.id}`,
          {
            content: inputValue,
          }
        );
        
        socket.current?.emit("sendMessages", {
          roomId: selectedMessage?.id,
          content: inputValue,
          senderId: UserId,
        });
        // dispatch(setUpdate());

        dispatch(
          addMessage({
            id: random(1000, 9999).toString(),
            message: inputValue,
            time: new Date().toISOString(),
            avatar: UserInfo.picture,
            authorId: UserInfo.id,
            user: UserInfo.username})
        )
        setInputValue("");
        setIsReady(false);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    IsReady && fetchChat();
  }, [IsReady]);


  useEffect(() => {
    const _IsMuted = async () => {
      try {
        const response = await api.get(`/chatroom/isMuted/${selectedMessage?.id}/${UserId}`);
        setIsMuted(response.data);
      
      } catch (error) {
      }
    }

    _IsMuted();
  }, [ selectedMessage, UserId])


  const handelSendMessage = () => {
    setIsReady(true);
  };


  const [userIsBlocked, setUserIsBlocked] = useState(false);

  useEffect(() => {
    const checkBlocked = async () => {
      try {
        const response =  await api.post(`/friendship/isBlocked/${selectedMessage?.senderId}`);
        if (response.data) {
          setUserIsBlocked(true);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    }
    checkBlocked();
  }, [ selectedMessage]);

  return (
    <div className="ChatPanelFooter-frame">
      <div className="autocomplete">
        {suggestions.slice(0, 6).map((suggestion, index) => (
          <Chip className="subtitles-chip" key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </Chip>
        ))}
      </div>

      <Input
        isDisabled={userIsBlocked || IsMuted}
        className="ChatPanelFooter-Input"
        value={inputValue}
        placeholder={userIsBlocked ? "You are blocked by this person!" :   "Type a message"}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handelSendMessage();
          }
        }}
        endContent={
          <img
            onClick={handelSendMessage}
            src={SendMessageIcon}
            className="SendMessage"
            alt="Send Message"
          />
        }
      />
    </div>
  );
}
