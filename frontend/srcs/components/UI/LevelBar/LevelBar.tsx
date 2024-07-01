import React from "react";
import "./LevelBar.css";

import Level1Svg from "../AchievementComponents/assets/level1.svg";
import Level2Svg from "../AchievementComponents/assets/level2.svg";
import Level3Svg from "../AchievementComponents/assets/level3.svg";
import Level4Svg from "../AchievementComponents/assets/level4.svg";
import Level5Svg from "../AchievementComponents/assets/level5.svg";
import Level6Svg from "../AchievementComponents/assets/level6.svg";

const getLevelSvg = (level) => {
  if (!level || level === undefined) return Level1Svg;
  switch (level) {
    case 1:
      return Level1Svg;
    case 2:
      return Level2Svg;
    case 3:
      return Level3Svg;
    case 4:
      return Level4Svg;
    case 5:
      return Level5Svg;
    case 6:
      return Level6Svg;
    default:
      throw new Error(`Invalid level: ${level}`);
  }
};

import {
  getXpToNextLevel,
  getXpRangeForCurrentLevel,
} from "../../../utils/getCurrentLevel";

const MyComponent = (props) => {
  const [minXp, maxXp] = getXpRangeForCurrentLevel(props.level);

  const progressPercentage = ((props.xp - minXp) / (maxXp - minXp)) * 380;

  return (
    <div className="container-progress">
      {
        props.level === 6 ? (
          <div className="box1" style={{background: "goldenrod"}}   ></div>
        ) : (
          <div className="box1"></div>
        )
      }
    
      <div className="box2" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
};

export function LevelBar(props) {
  return (
    <div className="levels w-max  ">
      <img className="element" alt="Element" src={getLevelSvg(props.level)} />

      <div className="score">
        <p className="LEVEL">
          <span className="text-wrapper">LEVEL</span>
          <span className="span"> </span>
          <span className="text-wrapper-2">
            {props.level}
          </span>
        </p>

        <div className="group">
          <div className="overlap-group">
            <MyComponent xp={props.xp} level={props.level} />

            {props.level === 6 ? (
              <p className="div"  style={{color: "#caf2fe"}}>MAX LEVEL</p>
            ) : (
              <p className="div">
                {getXpToNextLevel(props.xp)}XP to LVL {props.level + 1}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
