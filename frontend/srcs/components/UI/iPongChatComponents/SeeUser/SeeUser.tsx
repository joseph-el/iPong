import React, { useEffect, useState } from "react";
import "./SeeUser.css";
import { SeeUsersWrapper } from "./SeeUsersWrapper";
import { Avatar } from "@nextui-org/avatar";

import InviteMatchIcon from "./InviteMatch.svg";
import SeeProfileIcon from "./SeeProfile.svg";

import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { useNavigate } from "react-router-dom";
import Close from "../../Button/CloseButton/CloseButton";
import { useSocket } from "../../../../context/SocketContext";

export default function SeeUser(props) {
  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isInviteDisabled, setIsInviteDisabled] = useState(false);

  // TODO: Change UserId and opponentId values
  const handelInviteMatch = () => {
    const getOpponentId = selectedMessage?.senderId;
    if (!getOpponentId) return;

    if (socket) {
      socket.emit("InviteToGame", { opponentId: getOpponentId });

      socket.on("userStatusError", () => {
        console.log("you can't invite while playing or matchmaking");
      });

      socket.on("opponentOfflineNow", () => {
        console.log("look like opponent is offline");
      });

      socket.on("opponentBusyNow", () => {
        console.log("opponent have another matchmaking/game going");
      });
    }

    /* Disabled the invite button until the invite Accepted or Destroyed */
    setIsInviteDisabled(true);
    setTimeout(() => {
      setIsInviteDisabled(false);
    }, 5000);
  };

  return (
    <SeeUsersWrapper>
      <div className="SeeUser-frame">
        <div className="User-info">
          <Avatar
            isBordered
            className="User-avatar w-24 h-24"
            src={selectedMessage?.avatar}
          />

          <div className="info">
            <div className="User-name">{selectedMessage?.fullname}</div>
            <div className="ipongchar">iPongChat</div>
          </div>
        </div>

        <Close
          func={() => props.handleCloseClick()}
          ClassName={"Customize-chat-icon animate-pulse"}
          id="close"
        />

        <div className="User-options">
          <img
            onClick={() => {
              navigate(`/ipong/users/${props.userId}`);
            }}
            src={SeeProfileIcon}
            alt="See Profile"
            className="User-options-See-Profile-img"
          />
          
          <img
            onClick={handelInviteMatch}
            src={InviteMatchIcon}
            alt="Invite Match"
            className={`User-options-Invite-Match-img ${
              isInviteDisabled ? "disabled" : ""
            }`}
          />
        </div>

        {/* <div className="privacy-frame">
          <div className="privacy-text">privacy</div>

          <div className="User-options-buttons">
            <div className="DeleteChat">Delete Chat</div>
          </div>
        </div> */}
      </div>
    </SeeUsersWrapper>
  );
}
