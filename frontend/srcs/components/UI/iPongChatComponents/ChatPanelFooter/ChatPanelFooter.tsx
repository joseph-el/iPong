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

export default function ChatPanelFooter({socket}) {

  const UserId = useSelector((state: RootState) => state.userState.id);
  const [IsReady, setIsReady] = useState(false);
  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );
  if (!selectedMessage) {
    return null;
  }
  const [IsMuted, setIsMuted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [style, setStyle] = useState("30px");

  const handleInputChange = (event) => {
    if (inputValue.length > 500) {
      return;
    }
    const newValue = event.target.value;

    if (!newValue) {
      setStyle("20px");
      setSuggestions([]);
      setInputValue(newValue);
      return;
    }
    const lastWord = newValue.split(" ").pop();
    const filteredSuggestions = Suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(lastWord.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      setStyle("20px");
      setSuggestions([]);
      setInputValue(newValue);
      return;
    }
    setStyle("0px");
    setSuggestions(filteredSuggestions);
    setInputValue(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    const words = inputValue.split(" ");
    words.pop();
    setInputValue(words.join(" ") + " " + suggestion);
    setSuggestions([]);
    setStyle("20px");
  };
  const UpdateApp = useSelector((state: RootState) => state.update.update);
  useEffect(() => {
    const fetchChat = async () => {
      try {
        console.log("i try to send selectedMessage: ", selectedMessage);
        const response = await api.post(
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
        setInputValue("");
        setIsReady(false);
        console.log("post :", response.data);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    IsReady && fetchChat();
  }, [IsReady, UpdateApp]);


  useEffect(() => {
    const IsMuted = async () => {
      try {
        const response = await api.get(`/chatroom/isMuted/${selectedMessage?.id}/${UserId}`);
        setIsMuted(response.data);
      
      } catch (error) {
        console.log("Ismuted:> ", error);
      }
    }

    IsMuted();
  }, [UpdateApp])


  const handelSendMessage = () => {
    console.log("Message sent: ", inputValue);
    setIsReady(true);
  };


  const [userIsBlocked, setUserIsBlocked] = useState(false);

  useEffect(() => {
    const checkBlocked = async () => {
      try {
        const response =  await api.post(`/friendship/isBlocked/${selectedMessage?.senderId}`);
        console.log("blocked:  ", response.data);
        if (response.data) {
          console.log("User is blocked");
          setUserIsBlocked(true);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    }
    checkBlocked();
  }, [UpdateApp]);

  return (
    <div className="ChatPanelFooter-frame">
      <div className="autocomplete" style={{ marginTop: style }}>
        {suggestions.slice(0, 6).map((suggestion, index) => (
          <Chip key={index} onClick={() => handleSuggestionClick(suggestion)}>
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
