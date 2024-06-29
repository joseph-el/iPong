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
import Spline from "@splinetool/react-spline";
import { LeaderBoard } from "../../components/UI/LeaderBoard/LeaderBoard";
import { Grid, GridItem } from "@chakra-ui/react";

import KKKK from "../../pages/iPongStore/assets/maps/map.JPG";
import ddd from "../../../public/ai.jpeg";
import ddd2 from "../../../public/dddd.jpeg";
import img_split from "../../../public/splite.png";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

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
        userSelectedBoard={KKKK}
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
  };

  return (
    <Grid
      templateAreas={`"main main"
                  "main main"
                  "leaderboard leaderboard"`}
      gridTemplateRows={"30px 1fr 420px"}
      gridTemplateColumns={"150px 1fr "}
      h="100%"
      className="container--home"
    >
      <GridItem pl="2" area={"main"} className="main-container">
        <div className="Home-button">
         
         
          <Card
            isFooterBlurred
            className="w-[95%] h-[95%] col-span-12 sm:col-span-7 hover:w-[100%] hover:h-[100%] random-card cursor-pointer"
          >
            <CardHeader className="absolute z-10 top-16 flex-col items-start ">
              <p className="text-tiny text-white/60  font-bold random-challenger-title fancy ">
              Random Challenger
              </p>
              {/* <h4 className="text-white/90 font-medium text-xl">
               Embrace unpredictability with matches against surprise opponents
              </h4> */}
            </CardHeader>

            <Image
              removeWrapper
              alt="Relaxing app background "
              className="z-0 w-full h-full button-img-ground object-cover "
              src={ddd2}
            />
          </Card>


          <Card
            isFooterBlurred
            className="w-[95%] h-[95%] col-span-12 sm:col-span-7 hover:w-[100%] hover:h-[100%] random-card cursor-pointer"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Your day your way
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                Your checklist for better sleep
              </h4>
            </CardHeader>

            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={ddd}
            />
          </Card>

        </div>
      </GridItem>

      <GridItem pl="2" area={"leaderboard"}>
        <LeaderBoard />
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
      </GridItem>
    </Grid>
  );
}

/*
    <div className="container--home">
  




      <div className="container-nav">
        <button className="button1" onClick={vsBotHandler}>
          Play vs Bot
        </button>
        <button className="button2" onClick={vsRandomHandler}>
          Play vs Random
        </button>
      </div>




        {<div className="container-nav">
          <button className="button1" onClick={vsBotHandler}>
            Play vs Bot
          </button>
          <button className="button2" onClick={vsRandomHandler}>
            Play vs Random
          </button>
        </div> }



    </div>
*/

/* <Spline scene="https://prod.spline.design/C5iwd6F3Xijf2m-z/scene.splinecode" /> */
/* <div className="container-nav">
        <button className="button1" onClick={vsBotHandler}>
          Play vs Bot
        </button>
        <button className="button2" onClick={vsRandomHandler}>
          Play vs Random
        </button>
      </div> */
