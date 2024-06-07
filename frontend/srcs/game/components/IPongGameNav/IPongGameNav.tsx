import React, { useEffect } from "react";
import UserBadge from "../UserBadge/UserBadge";
import VersusBadge from "../VersusBadge/VersusBadge";
import Versus3d from "/assets/game/gameLayout/Versus-3d.svg";
import "./IPongGameNav.css";

interface IPongGameNavProps {
  opponentName: string;
  opponentAvatarPath: string;
  playerPos: number;
}

export default function IPongGameNav(props: IPongGameNavProps) {
  const { opponentName, opponentAvatarPath, playerPos } = props;

  useEffect(() => {
    console.log("my pos is: ");
    console.log(playerPos);
  });

  return (
    <div className="iPongGame-frame-nav">
      {playerPos === 1 ? (
        <>
          <UserBadge />
          <img src={Versus3d} alt="Versus3d" className="Versus3d" />
          <VersusBadge
            userName={opponentName}
            avatarPath={opponentAvatarPath}
          />
        </>
      ) : (
        <>
          <VersusBadge
            userName={opponentName}
            avatarPath={opponentAvatarPath}
          />
          <img src={Versus3d} alt="Versus3d" className="Versus3d" />
          <UserBadge />
        </>
      )}
    </div>
  );
}
