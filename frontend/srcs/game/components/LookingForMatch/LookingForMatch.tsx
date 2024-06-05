import React from "react";
import "./LookingForMatch.css";

const LookingForMatch = ({ leaveMatchMaking }) => (
  <div className="container">
    <h1 className="header">Finding Random Player</h1>
    <div className="card">
      <p className="statusMessage">Looking for a match...</p>
      <div className="spinner"></div>
      <button className="leaveBtn" onClick={leaveMatchMaking}>
        Leave MatchMaking
      </button>
    </div>
  </div>
);

export default LookingForMatch;
