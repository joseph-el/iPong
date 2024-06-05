import React from "react";
import "./LevelBar.css";
import LevelImg from "./level-max.svg";

const MyComponent = () => {
  const progressPercentage = (2000 / 2000) * 100;

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
            <MyComponent />
            <p className="div">30,000 XP to LVL 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
