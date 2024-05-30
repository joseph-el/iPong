import React from "react";
import "./ChatBubbles.css";

import { Avatar } from "@nextui-org/avatar";

export function RightChatBubbles(props) {
  return (
    <div className="RightChatBubbles-frame">
      <Avatar  className="User-avatar w-12 h-12" src={props.avatarUrl} />
      <div className="yours messages">
        <div className="message last">{props.message}</div>
      </div>
    </div>
  );
}

export function LeftChatBubbles(props) {
  return (
    <div className="LeftChatBubbles-frame">
      <div className="LeftChatBubbles-yours LeftChatBubbles-messages">
        <div className="LeftChatBubbles-message LeftChatBubbles-last">
          {props.message}
        </div>
      </div>
      <Avatar  className="User-avatar w-12 h-12" src={props.avatarUrl} />
    </div>
  );
}
