import React from "react";
import "./LevelBar.css";
import LevelImg from "./level-max.svg"

const ProgressBar = ({ level, xp, maxXp }) => {
    const progressPercentage = (xp / maxXp) * 100;
  
    return (
      <div className="progress-container">
        <div className="level-indicator">LEVEL {level}</div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="xp-indicator">{xp.toLocaleString()} XP to LVL {level + 1}</div>
      </div>
    );
  };




const MyComponent = () => {
  return (
    <div className="container">
      <div className="box1"></div>
      <div className="box2"></div>
    
    </div>
  );
};

export default MyComponent;


export const LevelBar = () => {
    return (
        <div className="level">




            <div className="overlap">
                <p className="LEVEL">
                    <span className="text-wrapper">LEVEL</span>
                    <span className="span">&nbsp;</span>
                    <span className="text-wrapper-2">2</span>
                </p>
                <div className="group">
                    <div className="overlap-group">
                    <MyComponent/>
                        {/* <img className="vector" alt="Vector" src="vector-1.svg" />
                        <img className="img" alt="Vector" src="vector-2.svg" /> */}
                        <p className="div">30,000 XP to LVL 3</p>
                    </div>
                </div>
            </div>


            <img className="element" alt="Element" src={LevelImg} />
        
        
        
        
        </div>
    );
};
