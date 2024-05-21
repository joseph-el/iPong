import React from "react";
import './iMessagesNotifications.css';
import { ImessagesNotificationsWrapper } from "./iMessagesNotificationsWrapper";
import ImessageIcon from './imessage.svg'
import {User} from "@nextui-org/react";

export default function ImessagesNotifications(props) {
    return (
        <ImessagesNotificationsWrapper>
            <div className="notification-content">
                <User   
                    name="iMessages"
                    description={props.name +  " send you a message"}
                    avatarProps={{
                        src: props.avatar
                    }}
                />
                <div className="time-of-notification">
                    {props.time}
                </div>
                {
                    /* <img src={ImessageIcon} alt="iMessage" className="imessage-icon"/> */ 
                }
            </div>
        </ImessagesNotificationsWrapper>
    );
}
