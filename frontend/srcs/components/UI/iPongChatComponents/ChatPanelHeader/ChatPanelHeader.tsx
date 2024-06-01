import React from "react";
import "./ChatPanelHeader.css";

import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";
import ConversationDetailsIcon from "../MessagesItems/select-converstation-icon.svg";

export default function ChatPanelHeader(props) {
    return (
        <div className="ChatPanelHeader-frame">
            <div className="ChatPanelHeader-title" onClick={()  => {props.SetViewChatSettings} }>
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" className="w-14 h-14"/>
                <div className="conversation-name-and-conversation-details">
                    <div className="conversation-name">Taha Naceur</div>
                    <img  src={ConversationDetailsIcon} alt="conversation-details" className="conversation-details"/>
                </div>
            </div>
        </div>
    )
}