import React from "react";
import './iMessagesNotifications.css';
import { ImessagesNotificationsWrapper } from "./iMessagesNotificationsWrapper";
import ImessageIcon from './imessage.svg'
import {User} from "@nextui-org/react";

export default function ImessagesNotifications() {
    return (
        <ImessagesNotificationsWrapper>
        

            <div className="time-of-notification">
            15m ago
            </div>
        <User   
            name="iMessages"
            description="Taha Naceur send you a message"
            avatarProps={{
                src: "https://cdn.intra.42.fr/users/1e212df3b450650d04418d1c03827563/tnaceur.jpg"
            }}
    
        />
        </ImessagesNotificationsWrapper>
        );
}