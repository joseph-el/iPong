import React from "react";
import VersusBadgeImg from "/assets/game/gameLayout/versus-badge.svg";
import "./VersusBadge.css";

interface VersusBadgeProps {
  userName: string;
  avatarPath: string;
}

export default function VersusBadge({
  userName,
  avatarPath,
}: VersusBadgeProps) {
  return (
    <div className="iPongGame-VersusBadge">
      <img src={VersusBadgeImg} alt="VersusBadge" className="VersusBadge" />
      <div className="iPongGame-UserBadge-username">
        <img
          src={avatarPath}
          alt="UserAvatar"
          className="UserBadge-img UserBadge-img-vr"
        />
        <div className="username">{userName}</div>
      </div>
    </div>
  );
}
