import React from "react";
import "./iPongStore.css";
import { Card, CardBody, CardFooter, Image, User } from "@nextui-org/react";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import {
  setBoardPath,
  setSelectedSkinPath,
} from "../../state/UserInfo/UserSlice";
import { useDispatch } from "react-redux";
import { ScrollShadow } from "@nextui-org/react";
import { AppDispatch } from "../../state/store";
import { BOARDS_DB } from "./db/board.db";
import { SKIN_DB } from "./db/skins.db";

import { useEffect, useState } from "react";
import api from "../../api/posts";

/*
const list = [
  {
    title: "Tilted Towers",
    img: TiltedTowers,
    price: "500 V-Bucks",
    isLocked: false,
  },
  {
    title: "Pleasant Park",
    img: PleasantPark,
    price: "300 V-Bucks",
    isLocked: true,
  },
  {
    title: "Retail Row",
    img: RetailRow,
    price: "1000 V-Bucks",
    isLocked: false,
  },
  {
    title: "Salty Springs",
    img: SaltySprings,
    price: "530 V-Bucks",
    isLocked: true,
  },
  {
    title: "Loot Lake",
    img: LootLake,
    price: "1570 V-Bucks",
    isLocked: true,
  },
  {
    title: "Dusty Divot",
    img: DustyDivot,
    price: "800 V-Bucks",
    isLocked: true,
  },
  {
    title: "Lazy Links",
    img: LazyLinks,
    price: "750 V-Bucks",
    isLocked: true,
  },
  {
    title: "Tomato Temple",
    img: TomatoTemple,
    price: "1220 V-Bucks",
    isLocked: true,
  },
  {
    title: "Paradise Palms",
    img: ParadisePalms,
    price: "900 V-Bucks",
    isLocked: false,
  },
  {
    title: "Haunted Hills",
    img: HauntedHills,
    price: "1100 V-Bucks",
    isLocked: false,
  },
  {
    title: "Shifty Shafts",
    img: ShiftyShafts,
    price: "600 V-Bucks",
    isLocked: false,
  },
  {
    title: "Greasy Grove",
    img: GreasyGrove,
    price: "1450 V-Bucks",
    isLocked: false,
  },
  {
    title: "Flush Factory",
    img: FlushFactory,
    price: "1000 V-Bucks",
    isLocked: true,
  },
  {
    title: "Snobby Shores",
    img: SnobbyShores,
    price: "850 V-Bucks",
    isLocked: true,
  },
];

const paddleList = [
  {
    title: "Epic Flux",
    img: PaddlesSVGs.PaddlesEpicFlux,
    price: "500 V-Bucks",
    isLocked: false,
  },
  {
    title: "Legendary Flux",
    img: PaddlesSVGs.PaddlesLegendaryFlux,
    price: "300 V-Bucks",
    isLocked: true,
  },
  {
    title: "Rare Flux",
    img: PaddlesSVGs.PaddlesRareFlux,
    price: "1000 V-Bucks",
    isLocked: false,
  },
  {
    title: "Cold Paddle",
    img: PaddlesSVGs.PaddlesCold,
    price: "530 V-Bucks",
    isLocked: true,
  },
  {
    title: "Fire Awn",
    img: PaddlesSVGs.PaddlesFir3awn,
    price: "1570 V-Bucks",
    isLocked: false,
  },
  {
    title: "Hacker Paddle",
    img: PaddlesSVGs.PaddlesHacker,
    price: "800 V-Bucks",
    isLocked: false,
  },
  {
    title: "Joker Paddle",
    img: PaddlesSVGs.PaddlesJocker,
    price: "750 V-Bucks",
    isLocked: false,
  },
  {
    title: "La Casa Paddle",
    img: PaddlesSVGs.PaddlesLacasa,
    price: "1220 V-Bucks",
    isLocked: false,
  },
  {
    title: "Ninja Paddle",
    img: PaddlesSVGs.PaddlesNinja,
    price: "900 V-Bucks",
    isLocked: false,
  },
  {
    title: "Paddles",
    img: PaddlesSVGs.PaddlesPalyer10,
    price: "1100 V-Bucks",
    isLocked: false,
  },
  {
    title: "Player 20 Paddle",
    img: PaddlesSVGs.PaddlesPlayer20,
    price: "600 V-Bucks",
    isLocked: false,
  },
  {
    title: "Sahrawi Paddle",
    img: PaddlesSVGs.PaddlesSahrawi,
    price: "1450 V-Bucks",
    isLocked: false,
  },
  {
    title: "Saudi Paddle",
    img: PaddlesSVGs.PaddlesSaudi,
    price: "1000 V-Bucks",
    isLocked: false,
  },
  {
    title: "Space Man Paddle",
    img: PaddlesSVGs.PaddlesSpaceMan,
    price: "850 V-Bucks",
    isLocked: false,
  },
  {
    title: "Spiderman Paddle",
    img: PaddlesSVGs.PaddlesSpiderman,
    price: "850 V-Bucks",
    isLocked: false,
  },
  {
    title: "The Dark Paddle",
    img: PaddlesSVGs.PaddlesTheDark,
    price: "850 V-Bucks",
    isLocked: false,
  },
  {
    title: "Zombie Paddle",
    img: PaddlesSVGs.PaddlesZombie,
    price: "850 V-Bucks",
    isLocked: false,
  },
];
*/

export default function IPongStore() {
  const dispatch = useDispatch<AppDispatch>();
  const [ShowPaddlesTabel, setShowPaddlesTabel] = useState(false);

  const [AvailableBoards, setAvailableBoards] = useState([]);
  const [AvailablePaddles, setAvailablePaddles] = useState([]);

  useEffect(() => {
    const fetchBoardsData = async () => {
      try {
        const response = await api.get("/boards/all");
        const boardsData = response.data;
        console.log("boardsData: ", boardsData);

        const updatedBoards = BOARDS_DB.map((board) => {
          const found = boardsData.find(
            (item) => item.BoardName === board.name
          );
          if (found) {
            return { ...board, isUnlocked: true };
          } else {
            return { ...board, isUnlocked: false };
          }
        });
        updatedBoards.sort((a, b) =>
          a.isUnlocked === b.isUnlocked ? 0 : a.isUnlocked ? -1 : 1
        );

        setAvailableBoards(updatedBoards);
      } catch (error) {
        console.error("store: ", error);
      }
    };

    const fetchPaddlesData = async () => {
      try {
        const response = await api.get("/skins/all");
        const paddlesData = response.data;
        console.log("paddlesData: ", paddlesData);

        const updatedPaddles = SKIN_DB.map((paddle) => {
          const found = paddlesData.find(
            (item) => item.skinName === paddle.name
          );
          if (found) {
            return { ...paddle, isUnlocked: true };
          } else {
            return { ...paddle, isUnlocked: false };
          }
        });
        updatedPaddles.sort((a, b) =>
          a.isUnlocked === b.isUnlocked ? 0 : a.isUnlocked ? -1 : 1
        );

        setAvailablePaddles(updatedPaddles);
      } catch (error) {
        console.error("paddles: ", error);
      }
    };

    fetchBoardsData();
    fetchPaddlesData();
  }, []);

  console.log("boards: ", AvailableBoards);
  console.log("paddles: ", AvailablePaddles);
  const handelPressPaddlesTabel = (item) => {
    console.log(item);
    dispatch(setBoardPath(item.img));
  };

  const handelPressPaddles = (item) => {
    console.log(item);
    dispatch(setSelectedSkinPath(item.img));
  };

  return (
    <div className="store-frame">
      <div className="Store-List">
        <div className="Store-List-nav">
          <div
            className="Store-List-nav-item"
            onClick={() => {
              setShowPaddlesTabel(false);
            }}
          >
            <h2>TABLE</h2>
          </div>
          <div
            className="Store-List-nav-item"
            onClick={() => {
              setShowPaddlesTabel(true);
            }}
          >
            <h1>PADDLES</h1>
          </div>
        </div>

        <ScrollShadow hideScrollBar className="h-[450px] w-full">
          {!ShowPaddlesTabel ? (
            <div className="gap-2 grid grid-cols-2     sm:grid-cols-3">
              {AvailableBoards.map((item, index) => (
                <Card
                  shadow="sm"
                  key={index}
                  isBlurred
                  isPressable
                  onPress={() => handelPressPaddlesTabel(item)}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      isBlurred
                      alt={item.name}
                      className={
                        "w-full object-cover h-[140px] " +
                        (!item.isUnlocked ? "blur-img" : "")
                      }
                      src={item.imgPath}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.name}</b>
                    <p className="text-default-500">{(item.isUnlocked) ? "" :  (item.price + " iCoins")}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
              {AvailablePaddles.map((item, index) => (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() => handelPressPaddles(item)}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="none"
                      radius="none"
                      width="100%"
                      isBlurred
                      alt={item.name}
                      className={
                        "w-full object-coverd h-[120px] " +
                        (!item.isUnlocked ? "blur-img" : "")
                      }
                      src={item.imgPath}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.name}</b>
                    <p className="text-default-500">{(item.isUnlocked) ? "" : (item.price + " iCoins") }</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </ScrollShadow>
      </div>
    </div>
  );
}
