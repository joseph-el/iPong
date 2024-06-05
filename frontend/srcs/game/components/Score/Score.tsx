import React from "react";
import "./Score.css";

const Scores = ({ player1Score, player2Score }) => {
  return (
    <div className="scores">
      <div className="score">
        <span>{player1Score}</span>
      </div>
      <div>
        <span> - </span>
      </div>
      <div className="score">
        <span>{player2Score}</span>
      </div>
    </div>
  );
};

export default Scores;
