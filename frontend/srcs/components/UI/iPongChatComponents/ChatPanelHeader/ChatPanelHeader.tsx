import React from "react";
import "./ChatPanelHeader.css";

import { Avatar } from "@nextui-org/react";
import ConversationDetailsIcon from "../MessagesItems/select-converstation-icon.svg";

import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { createSelector } from "reselect";

export default function ChatPanelHeader(props) {
  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );



  const ListMessages = useSelector((state: RootState) => state.iPongChat.ListMessages);
  console.log("ListMessages:: Header:> ", ListMessages);
  console.log("selectedMessage:: Header:> ", selectedMessage);
  // if (!selectedMessage) {
  //   return null;
  // }
  return (
    <div className="ChatPanelHeader-frame">
      <div
        className="ChatPanelHeader-title"
        onClick={() => {
          (selectedMessage.type.includes("public") ||
            selectedMessage.type.includes("private") ||
            selectedMessage.type.includes("protected")) &&
            props.SetViewGroupSettings();
          selectedMessage.type === "Dm" && props.SetViewFriendSettings();
        }}
      >
        <Avatar src={selectedMessage?.avatar} className="w-14 h-14" />
        <div className="conversation-name-and-conversation-details">
          <div className="conversation-name">{selectedMessage?.fullname}</div>
          <img
            src={ConversationDetailsIcon}
            alt="conversation-details"
            className="conversation-details"
          />
        </div>
      </div>
    </div>
  );
}
