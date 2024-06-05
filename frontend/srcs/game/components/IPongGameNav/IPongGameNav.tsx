import React from "react";
import UserBadge from "../UserBadge/UserBadge";
import VersusBadge from "../VersusBadge/VersusBadge";
import Versus3d from "/assets/game/gameLayout/Versus-3d.svg";
import "./IPongGameNav.css";

interface IPongGameNavProps {
  opponentName: string;
  opponentAvatarPath: string;
}

export default function IPongGameNav(props: IPongGameNavProps) {
  return (
    <div className="iPongGame-frame-nav">
      <UserBadge />
      <img src={Versus3d} alt="Versus3d" className="Versus3d" />
      <VersusBadge
        userName={props.opponentName}
        avatarPath={props.opponentAvatarPath}
      />
    </div>
  );
}
