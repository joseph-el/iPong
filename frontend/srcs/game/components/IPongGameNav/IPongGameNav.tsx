import React, { useEffect } from "react";
import UserBadge from "../UserBadge/UserBadge";
import VersusBadge from "../VersusBadge/VersusBadge";
import Versus3d from "/assets/game/gameLayout/Versus-3d.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import api from "../../../api/posts";
import "./IPongGameNav.css";

interface IPongGameNavProps {
  opponentName: string;
  opponentAvatarPath: string | null;
  playerPos: number;
  player1Score: number;
  player2Score: number;
  SelectedBackground?: string;
  opponentId: string | null;
}

import { User } from "@nextui-org/react";

export default function IPongGameNav(props: IPongGameNavProps) {
  const {
    opponentName,
    opponentAvatarPath,
    playerPos,
    player1Score,
    player2Score,
    opponentId,
    SelectedBackground,
  } = props;

  useEffect(() => {
    console.log("my pos is: ");
    console.log(playerPos);
  });

  const UserInfo = useSelector((state: RootState) => state.userState);


  const [opponentAvatar, setOpponentAvatar] = React.useState<string>("");

  useEffect(() => {
    const fetchOpponentAvatar = async () => {
      const response = await api.get(`/user-profile/getinfoById${opponentId}`);
      setOpponentAvatar(response.data.picture);
    }
    fetchOpponentAvatar();
  }, []);



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
                src: opponentAvatarPath === null ? opponentAvatar : opponentAvatarPath,
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
                src: opponentAvatarPath === null ? opponentAvatar : opponentAvatarPath,
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
