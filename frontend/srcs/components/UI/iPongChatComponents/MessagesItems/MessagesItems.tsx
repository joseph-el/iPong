import React from "react";
import "./MessagesItems.css";
import { Avatar } from "@nextui-org/react";

import SelectConversationIcon from "./select-converstation-icon.svg";

const handleLastMessageSize = (message) => {
  const comparisonLength = 71;

  // console.log("data: ", message.length);
  if (message.length > comparisonLength) {
    return `${message.slice(0, comparisonLength)}...`;
  } else return message;
};

const MessageLenght = (message) => {
  // console.log("margin:", message.lenght);
  return message.lenght;
};

export default function MessagesItems(props) {


  const [IsSelectes, setIsSelectes] = React.useState(false);
  // style={ {backgroundColor: (props.IsSelectes ? "#3a3a3c" : "#000")} } 
  return (
    <div className="MessagesItems-frame"  onClick={ () => {setIsSelectes(true)} } style={ {backgroundColor: (IsSelectes ? "#3a3a3c" : "#000")} }  >
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
          {handleLastMessageSize(props.lastMessage)}
        </div>
      </div>
    </div>
  );
}
