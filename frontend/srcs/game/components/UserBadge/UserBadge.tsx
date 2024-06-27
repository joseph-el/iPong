import UserBadgeImg from "/assets/game/gameLayout/user-badge.svg";
import "./UserBadge.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {Avatar} from "@nextui-org/avatar";

export default function UserBadge({playerScore}) {
  const UserInfo = useSelector((state: RootState) => state.userState);

  return (
    <div className="iPongGame-UserBadge">
      <img src={UserBadgeImg} alt="UserBadge" className="UserBadge" />
      <div className="iPongGame-UserBadge-username">
        <img
  
          src={UserInfo.picture}
          alt="UserAvatar"
          
          className="UserBadge-img"
        />
        <div className="username">{UserInfo.username}</div>
        <div className="score">{playerScore}</div>
      </div>
    </div>
  );
}
