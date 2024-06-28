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
import ddd from "../../../public/dddd.jpeg";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";



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
      gridTemplateRows={"50px 1fr 395px"}
      gridTemplateColumns={"150px 1fr "}
      h="100%"
      className="container--home"
    >
      <GridItem pl="2" area={"main"} className="main-container">
        <div className="flex gap-16">
   
      
          <Card
            isFooterBlurred
            className="w-[500px] h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              {/* <p className="text-tiny text-white/60 uppercase font-bold">Play </p> */}
              {/* <h4 className="text-black font-medium text-2xl">Random</h4> */}
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={ddd}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Available soon.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              {/* <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                
              </Button> */}
            </CardFooter>
          </Card>

               <Card
            isFooterBlurred
            className="w-[500px] h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              {/* <p className="text-tiny text-white/60 uppercase font-bold">Play </p> */}
              {/* <h4 className="text-black font-medium text-2xl">Random</h4> */}
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={ddd}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Available soon.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              {/* <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                
              </Button> */}
            </CardFooter>
          </Card>  
     
        </div>

        {/* <div className="container-nav">
          <button className="button1" onClick={vsBotHandler}>
            Play vs Bot
          </button>
          <button className="button2" onClick={vsRandomHandler}>
            Play vs Random
          </button>
        </div> */}
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
