import React from "react";
import "./iPongGame.css";
import { User } from "@nextui-org/user";

import Versus3d from "./assets/Versus-3d.svg";
import UserBadge from "./assets/user-badge.svg";
import VersusBadge from "./assets/versus-badge.svg";


import BotMode from "../../game/components/BotMode/BotMode";

function UserBadgeComponent(props) {
  return (
    <div className="iPongGame-UserBadge">
      <img src={UserBadge} alt="UserBadge" className="UserBadge" />
      <div className="iPongGame-UserBadge-username">
        <img
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          alt="UserBadge"
          className="UserBadge-img"
        />
        <div className="username">{props.username}</div>
      </div>
    </div>
  );
}

function VersusBadgeComponent(props) {
  return (
    <div className="iPongGame-VersusBadge">
      <img src={VersusBadge} alt="VersusBadge" className="VersusBadge" />

      <div className="iPongGame-UserBadge-username">
        <img
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          alt="UserBadge"
          className="UserBadge-img UserBadge-img-vr"
        />
        <div className="username">{props.username}</div>
      </div>
    </div>
  );
}

function IPongGameNav(props) {
  return (
    <div className="iPongGame-frame-nav">
      <VersusBadgeComponent username={props.opponent} />
      <img src={Versus3d} alt="Versus3d" className="Versus3d" />
      <UserBadgeComponent username={props.username} />
    </div>
  );
}

export default function iPongGame() {
  return (
    <div className="iPongGame-frame">
      <IPongGameNav username="Taha Naceur" opponent="youssef Naceur" />


      <BotMode />



    </div>
  );
}
