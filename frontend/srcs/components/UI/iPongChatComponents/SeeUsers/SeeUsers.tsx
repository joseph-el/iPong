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
            src="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
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
