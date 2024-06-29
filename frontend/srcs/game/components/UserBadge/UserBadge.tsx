import UserBadgeImg from "/assets/game/gameLayout/user-badge.svg";
import "./UserBadge.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {Avatar} from "@nextui-org/avatar";

export default function UserBadge({playerScore, SelectedBackground}) {
  const UserInfo = useSelector((state: RootState) => state.userState);

  return (
    <div className="iPongGame-UserBadge">
      <Avatar
        radius="lg"
        src={UserInfo.picture}
      />
      <p className="iPongGame-UserBadge-username">{UserInfo.username}</p>

      <p className="iPongGame-UserBadge-score">{playerScore}</p>

    </div>
  );
}
