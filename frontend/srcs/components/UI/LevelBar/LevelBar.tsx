import React from "react";
import "./LevelBar.css";



import LevelImg from "./level-max.svg";

import {getXpToNextLevel, getXpRangeForCurrentLevel} from "../../../utils/getCurrentLevel";


const MyComponent = (props) => {

  const [minXp, maxXp] = getXpRangeForCurrentLevel(props.level);

  const progressPercentage = ((props.xp - minXp) / (maxXp - minXp)) * 100;
  console.log("progressPercentage: ", progressPercentage);

  return (
    <div className="container">
      <div className="box1"></div>
      <div className="box2" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
};

export function LevelBar(props) {
  return (
    <div className="levels w-max  ">
      <img className="element" alt="Element" src={LevelImg} />

      <div className="score">
        <p className="LEVEL">
          <span className="text-wrapper">LEVEL</span>
          <span className="span"> </span>
          <span className="text-wrapper-2">{props.level}</span>
        </p>

        <div className="group">
          <div className="overlap-group">
            <MyComponent xp={props.xp} level={props.level} />
            <p className="div">{   getXpToNextLevel(props.xp)  }XP to LVL {props.level + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
