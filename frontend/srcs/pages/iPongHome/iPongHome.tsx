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
import { SKIN_DB } from "../../pages/iPongStore/db/skins.db";
import { BOARDS_DB } from "../../pages/iPongStore/db/board.db";

export default function iPongGame() {
  
  const UserInfo = useSelector((state: RootState) => state.userState);
  const userSelectedSkinPath = SKIN_DB.find(
    (skin) => skin.name === UserInfo.userSelectedSkinPath
  )?.imgPath;
  const userSelectedBoardPath = BOARDS_DB.find(
    (board) => board.name === UserInfo.userSelectedBoardPath
  )?.imgPath;
  const botSelectedSkinPath =
    SKIN_DB[Math.floor(Math.random() * SKIN_DB.length)].imgPath;

  type ModeType = "practice" | "onlineBattle" | null;
  const [mode, setMode] = useState<ModeType>(null);
  const [urlMode, setUrlMode] = useState("default");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const Achievement = useSelector(
    (state: RootState) => state.achievement.ShowAchievementBadge
  );

  const UpdatedLevel = useSelector(
    (state: RootState) => state.achievement.UpdatedLevel
  );

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

  if (mode && mode === "practice") {
    return (
      <BotMode
        userSelectedSkin={userSelectedSkinPath}
        userSelectedBoard={userSelectedBoardPath}
        botSelectedSkin={botSelectedSkinPath}
      />
    );
  }
  if (mode && mode === "onlineBattle") {
    localStorage.setItem("lastLevel", getUserLevel(UpdatedLevel!).toString());
    console.log("userSelectedSkinPath", userSelectedSkinPath);
    console.log("userSelectedBoardPath", userSelectedBoardPath);
    console.log("botSelectedSkinPath", botSelectedSkinPath);

    return (
      <MatchMaking
        userSelectedSkin={userSelectedSkinPath}
        userSelectedBoard={userSelectedBoardPath}
      />
    );
  }

  const handleCloseCongratulationsBadge = () => {
    dispatch(setAchievementBadge(null));
    console.log("achievement: yes reset", Achievement);
  };

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

      {Achievement !== null ? (
        <div className="blur-background">
          <div className="AchievementList-place fade-in">
            <CongratulationsBadge
              level={Achievement}
              CongratulationsBadge={handleCloseCongratulationsBadge}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
