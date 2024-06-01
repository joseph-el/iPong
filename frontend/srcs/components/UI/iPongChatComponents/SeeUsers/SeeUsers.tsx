import React, { useEffect, useState } from "react";
import "./SeeUsers.css";
import { SeeUsersWrapper } from "./SeeUsersWrapper";
import { Avatar } from "@nextui-org/avatar";

import InviteMatchIcon from "./InviteMatch.svg";
import SeeProfileIcon from "./SeeProfile.svg";

export default function SeeUsers() {
  return (
    <SeeUsersWrapper>
      <div className="SeeUser-frame">
        <div className="User-info">
          <Avatar
            className="User-avatar w-24 h-24"
            src="https://scontent.fcmn1-2.fna.fbcdn.net/v/t39.30808-6/340242838_159501407041277_2734451423562002343_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFyvo2pTF2mgIKANMob3z8USQ34jUDh201JDfiNQOHbTVONa7_GVq_51GNSwIdNq3o3_3XY57rylLV5N4uofeIH&_nc_ohc=Okm3Jt5r4DoQ7kNvgFvUVUq&_nc_ht=scontent.fcmn1-2.fna&oh=00_AYBnMKq1nwB-R-wVuQCwpnEe2lySQW1DXDZZnBw3hNuViQ&oe=66610A17"
          />

          <div className="info">
            <div className="User-name">Taha Naceur</div>
            <div className="ipongchar">iPong</div>
          </div>
        </div>

        <div className="User-options">
          <img
            src={SeeProfileIcon}
            alt="See Profile"
            className="User-options-See-Profile-img"
          />
          <img
            src={InviteMatchIcon}
            alt="Invite Match"
            className="User-options-Invite-Match-img"
          />
        </div>

        <div className="privacy-frame">
          <div className="privacy-text">privacy</div>

          <div className="User-options-buttons">
            <div className="DeleteChat">Delete Chat</div>
            <div className="DeleteChat">Block</div>
          </div>
        </div>
      </div>
    </SeeUsersWrapper>
  );
}
