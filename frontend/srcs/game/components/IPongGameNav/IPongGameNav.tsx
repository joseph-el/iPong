import React, { useEffect } from "react";
import UserBadge from "../UserBadge/UserBadge";
import VersusBadge from "../VersusBadge/VersusBadge";
import Versus3d from "/assets/game/gameLayout/Versus-3d.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import "./IPongGameNav.css";

interface IPongGameNavProps {
  opponentName: string;
  opponentAvatarPath: string;
  playerPos: number;
  player1Score: number;
  player2Score: number;
  SelectedBackground?: string;
}

import { User } from "@nextui-org/react";

export default function IPongGameNav(props: IPongGameNavProps) {
  const {
    opponentName,
    opponentAvatarPath,
    playerPos,
    player1Score,
    player2Score,
    SelectedBackground,
  } = props;

  useEffect(() => {
    console.log("my pos is: ");
    console.log(playerPos);
  });

  const UserInfo = useSelector((state: RootState) => state.userState);

  return (
    <div className="iPongGame-frame-nav">
      {playerPos === 1 ? (
        <>
          <div className="Versus-opp">
            <User
              name={UserInfo.username}
              // description="Yoel-idrssssss"
              avatarProps={{
                className: "VersusBadge-img",
                isBordered: true,
                size: "lg",
                src: UserInfo.picture,
              }}
            />
            <p className="iPongGame-UserBadge-score">
              {playerPos === 1 ? player1Score : player2Score}
            </p>
          </div>

          <img src={Versus3d} alt="Versus3d" className="Versus3d" />

          <div className="Versus-opp">
            <User
              name={opponentName}
              // description="Yoel-idrssssss"
              avatarProps={{
                className: "VersusBadge-img",
                isBordered: true,
                size: "lg",
                src: opponentAvatarPath,
              }}
            />
            <p className="iPongGame-UserBadge-score">{player2Score}</p>
          </div>
        </>
      ) : (
        <>
          <div className="Versus-opp">
            <User
              name={opponentName}
              // description="Yoel-idrssssss"
              avatarProps={{
                className: "VersusBadge-img",
                isBordered: true,
                size: "lg",
                src: opponentAvatarPath,
              }}
            />
            <p className="iPongGame-UserBadge-score">{player2Score}</p>
          </div>

          <img src={Versus3d} alt="Versus3d" className="Versus3d" />

          <div className="Versus-opp">
            <User
              name={UserInfo.username}
              // description="Yoel-idrssssss"
              avatarProps={{
                className: "VersusBadge-img",
                isBordered: true,
                size: "lg",
                src: UserInfo.picture,
              }}
            />
            <p className="iPongGame-UserBadge-score">{player1Score}</p>
          </div>
        </>
      )}
    </div>
  );
}

{
  /* <VersusBadge
        SelectedBackground={SelectedBackground}
        playerScore={player1Score}
        userName={opponentName}
        avatarPath={opponentAvatarPath}
      /> */
}

{
  /**
   * 
   *       {playerPos === 1 ? (
        <>
          <UserBadge SelectedBackground={SelectedBackground} playerScore={player1Score}/>
          <img src={Versus3d} alt="Versus3d" className="Versus3d" />
          <VersusBadge
            SelectedBackground={SelectedBackground}
            playerScore={player2Score}
            userName={opponentName}
            avatarPath={opponentAvatarPath}
          />
        </>
      ) : (
        <>
          <VersusBadge
            SelectedBackground={SelectedBackground}
            playerScore={player1Score}
            userName={opponentName}
            avatarPath={opponentAvatarPath}
          />
          
          <img src={Versus3d} alt="Versus3d" className="Versus3d" />
          <UserBadge  SelectedBackground={SelectedBackground} playerScore={player1Score}/>
        </>
      )}
   * 
   */
}
