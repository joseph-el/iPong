import React from "react";
import "./ChatPanelHeader.css";

import { Avatar } from "@nextui-org/react";
import ConversationDetailsIcon from "../MessagesItems/select-converstation-icon.svg";

import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { createSelector } from "reselect";

const getListMessages = (state) => state.iPongChat.ListMessages;
const getSelectedMessage = createSelector(
  [getListMessages],
  (listMessages) => listMessages.find((message) => message.isSelect) || null
);

export default function ChatPanelHeader(props) {
  const selectedMessage = useSelector(getSelectedMessage);

  if (!selectedMessage) {
    return null;
  }
  return (
    <div className="ChatPanelHeader-frame">
      <div
        className="ChatPanelHeader-title"
        onClick={() => {
          console.log(selectedMessage);
          console.log(selectedMessage.type);
          console.log(selectedMessage.fullname);
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
