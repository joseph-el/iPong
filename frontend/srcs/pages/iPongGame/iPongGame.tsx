import "./iPongGame.css";
import { User } from "@nextui-org/user";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../game/constants/paths";
import BotMode from "../../game/components/BotMode/BotMode";
import MatchMaking from "../../game/components/MatchMaking/MatchMaking";

export default function iPongGame() {
  type ModeType = "practice" | "onlineBattle" | null;
  const [mode, setMode] = useState<ModeType>(null);
  const [urlMode, setUrlMode] = useState("default");
  const location = useLocation();
  const navigate = useNavigate();

  /* i checked the path to extract coming from: mode */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get("mode");
    if (modeParam === "default") {
      setUrlMode("default");
      setMode(null);
    }
  }, [location.search, urlMode]);

  function vsBotHandler() {
    setMode("practice");
    navigate(PATHS.PRACTICE_MODE);
  }

  function vsRandomHandler() {
    setMode("onlineBattle");
    navigate(PATHS.ONLINE_RANDOM_MODE);
  }

  /* Check What Mode To Render */
  if (mode && mode === "practice") {
    return <BotMode />;
  }
  if (mode && mode === "onlineBattle") {
    return <MatchMaking />;
  }

  return (
    <div className="container">
      <div className="container-nav">
        <button className="button" onClick={vsBotHandler}>
          Play vs Bot
        </button>
        <button className="button" onClick={vsRandomHandler}>
          Play vs Random
        </button>
      </div>
    </div>
  );
}
