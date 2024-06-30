import React from "react";
import VersusBadgeImg from "/assets/game/gameLayout/versus-badge.svg";
import "./VersusBadge.css";
import { Avatar } from "@nextui-org/avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface VersusBadgeProps {
  userName: string;
  avatarPath: string;
  playerScore: number;
  SelectedBackground?: string;
}

export default function VersusBadge({
  userName,
  avatarPath,
  playerScore,
  SelectedBackground,
}: VersusBadgeProps) {
  const UserInfo = useSelector((state: RootState) => state.userState);
  return (
    <div className="iPongGame-VersusBadge">
      <img
        className="VersusBadge-img"
        alt="VersusBadge"
        src={avatarPath}
      />

      {/* <img src={SelectedBackground} alt="VersusBadge" className="VersusBadge" />
      <div className="iPongGame-UserBadge-username">
        <img
          src={UserInfo.picture}
          alt="UserAvatar"
          className="VersusBadge-img UserBadge-img-vr"
        />
        <div className="username">{userName}</div>
        <div className="score">{playerScore}</div>
      </div> */}
    </div>
  );
}
