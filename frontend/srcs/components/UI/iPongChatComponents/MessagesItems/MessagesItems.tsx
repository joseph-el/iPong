import React from "react";
import "./MessagesItems.css";
import { Avatar, Divider } from "@nextui-org/react";

import SelectConversationIcon from "./select-converstation-icon.svg";


export default function MessagesItems(props) {
  if (props.isBanned) {
    return null;
  }


  function truncateString(str: string): string {
    if (str.length > 33) {
        return str.substring(0, 33) + "...";
    } else {
        return str;
    }
}

  return (
    <div>
      <div
        className="MessagesItems-frame"
        onClick={props.handelCLickChat}
        style={{ backgroundColor: props.IsSelectes ? "#3a3a3c" : "#000" }}
      >
        <div className="User-avatar">
          <Avatar src={props.avatar} className="w-14 h-14 text-large" />
        </div>

        <div className="Messages-info">
          <div className="Name-and-Message-time">
            <div className="Name">{props.name}</div>
            <div className="time-and-select-conversation">
              <div className="Message-time">{props.messageTime}</div>
              <img
                src={SelectConversationIcon}
                alt="select-converstation"
                className="select-conversation-icon"
              />
            </div>
          </div>

          <div className="last-Message">
            {truncateString(props.lastMessage)}
          </div>
        </div>

        {/* <div className="message-border"></div> */}
      </div>
      <div className="message-border" />
    </div>
  );
}
