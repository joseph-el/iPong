import React from "react";
import "./ChatPanelFooter.css";

import SendMessageIcon from "./Messages-sendIcon.svg";

import { Input } from "@nextui-org/input";
export default function ChatPanelFooter() {
  return (
    <div className="ChatPanelFooter-frame">
      <Input
        className="ChatPanelFooter-Input"
        placeholder="Type a message"
        endContent={<img src={SendMessageIcon} className="SendMessage" alt="Send Message" />}
      />
    </div>
  );
}
