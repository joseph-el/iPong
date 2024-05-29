import React from "react";
import "./LiveChatBubbles.css";

import { Avatar } from "@nextui-org/avatar";
export default function LiveChatBubbles(props) {

    return (
        <div className="LiveChatBubbles-frame">
            <Avatar src="https://avatars.dicebear.com/api/human/1.svg" alt="Avatar" size="sm" />
            <div className="LiveChatBubbles-bubble">
                <div className="fullname">
                {props.fullname}
                </div>
                <div className="user-message">
                {props.message}

                </div>
            </div>
        </div>
    );
}