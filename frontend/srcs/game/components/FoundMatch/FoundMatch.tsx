import React from "react";
import "./FoundMatch.css";

const FoundMatch = ({ opponent, opponentId }) => (
  <div className="container">
    <h1 className="header">Match Found</h1>
    <div className="card">
      <p className="opponentInfo">Match Found! Opponent: {opponent}</p>
      <p className="opponentInfo">Opponent ID: {opponentId}</p>
    </div>
  </div>
);

export default FoundMatch;
