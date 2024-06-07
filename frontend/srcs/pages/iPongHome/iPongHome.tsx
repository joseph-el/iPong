import React from "react";
import "./iPongHome.css";

import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../game/constants/paths";
import BotMode from "../../game/components/BotMode/BotMode";
import MatchMaking from "../../game/components/MatchMaking/MatchMaking";

import { useEffect, useState } from "react";

import CongratulationsBadge from "../../components/UI/AchievementComponents/CongratulationsBadge/CongratulationsBadge";
import { setAchievementBadge } from "../../state/Achievement/AchievementSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";

import { getUserLevel } from "../../utils/getCurrentLevel";

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

  const dispatch = useDispatch<AppDispatch>();
  // const UserInfo = useSelector((state: RootState) => state.userState);

  const Achievement = useSelector((state: RootState) => state.achievement);

  const handleCloseCongratulationsBadge = () => {
    console.log("close::>");
    dispatch(setAchievementBadge(null));
  };

  // const [LastUserLevel, setLastUserLevel] = useState("");

  // localStorage.setItem("setLastUserLevel", LastUserLevel);

  // const loadNameFromLocalStorage = () => {
  //   const savedName = localStorage.getItem("setLastUserLevel");
  //   if (savedName) {
  //     setLastUserLevel(savedName);
  //   }
  // };

  // // Use useEffect to load the name when the component mounts
  // useEffect(() => {
  //   loadNameFromLocalStorage();
  // }, []);

  return (
    <div className="container--home">
      <div className="container-nav">
        <button className="button" onClick={vsBotHandler}>
          Play vs Bot
        </button>
        <button className="button" onClick={vsRandomHandler}>
          Play vs Random
        </button>
      </div>

      {Achievement != null ? (
        <div className="blur-background">
          <div className="AchievementList-place fade-in">
            <CongratulationsBadge
              level={2}
              CongratulationsBadge={handleCloseCongratulationsBadge}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
