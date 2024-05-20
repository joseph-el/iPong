import React from "react";
import './FriendNotifications.css';
import {FriendNotificationsWrapper} from "./FriendNotificationsWrapper";
import {User} from "@nextui-org/react";

export const Actions = () => {
    return (
        <div className="actions">

            <div className="alert-item">
                <div className="action">Delete</div>
            </div>

            <div className="action-wrapper">
                <div className="text-wrapper">Confirm</div>
            </div>

        </div>
    );
};



export default function FriendNotifications() {

    return (
        
        <div className="FriendNotifications-frame">

        
            <FriendNotificationsWrapper>

                <div className="wrapper-style-request">
                    <div className="FriendNotifications-content">
                        <User   
                            name="Friend Request"
                            description="Zakaria El-khadir send you a friend request"
                            avatarProps={{
                                src: "https://cdn.intra.42.fr/users/d253bf077c4fb611910625bca09ce269/zel-khad.jpeg"
                            }}
                        />
                        <div className="FriendNotifications-time">
                            15m ago
                        </div>

                    </div>

                </div>

                <Actions />
            
                        

            </FriendNotificationsWrapper>
        </div>
    );
}