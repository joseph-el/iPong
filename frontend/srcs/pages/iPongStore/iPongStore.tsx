
import React from "react";
import "./iPongStore.css";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import RetailRow from "./assets/maps/map-RetailRow.svg";
import LootLake from "./assets/maps/map-LootLake.svg";
import DustyDivot from "./assets/maps/map-DustyDivot.svg";
import LazyLinks from "./assets/maps/map-LazyLinks.svg";
import GreasyGrove from "./assets/maps/map-GreasyGrove.svg";
import TiltedTowers from "./assets/maps/map-TiltedTowers.svg";
import PleasantPark from "./assets/maps/map-PleasantPark.svg";
import FlushFactory from "./assets/maps/map-FlushFactory.svg";
import SnobbyShores from "./assets/maps/map-SnobbyShores.svg";
import HauntedHills from "./assets/maps/map-HauntedHills.svg";
import SaltySprings from "./assets/maps/map-SaltySprings.svg";
import ShiftyShafts from "./assets/maps/map-ShiftyShafts.svg";
import TomatoTemple from "./assets/maps/map-TomatoTemple.svg";
import ParadisePalms from "./assets/maps/map-ParadisePalms.svg";

import * as PaddlesSVGs from "./assets/paddles/paddles";

import { ScrollShadow } from "@nextui-org/react";

const list = [
  {
    title: "Tilted Towers",
    img: TiltedTowers,
    price: "500 V-Buckets",
  },
  {
    title: "Pleasant Park",
    img: PleasantPark,
    price: "300 V-Buckets",
  },
  {
    title: "Retail Row",
    img: RetailRow,
    price: "1000 V-Buckets",
  },
  {
    title: "Salty Springs",
    img: SaltySprings,
    price: "530 V-Buckets",
  },
  {
    title: "Loot Lake",
    img: LootLake,
    price: "1570 V-Buckets",
  },
  {
    title: "Dusty Divot",
    img: DustyDivot,
    price: "800 V-Buckets",
  },
  {
    title: "Lazy Links",
    img: LazyLinks,
    price: "750 V-Buckets",
  },
  {
    title: "Tomato Temple",
    img: TomatoTemple,
    price: "1220 V-Buckets",
  },
  {
    title: "Paradise Palms",
    img: ParadisePalms,
    price: "900 V-Buckets",
  },
  {
    title: "Haunted Hills",
    img: HauntedHills,
    price: "1100 V-Buckets",
  },
  {
    title: "Shifty Shafts",
    img: ShiftyShafts,
    price: "600 V-Buckets",
  },
  {
    title: "Greasy Grove",
    img: GreasyGrove,
    price: "1450 V-Buckets",
  },
  {
    title: "Flush Factory",
    img: FlushFactory,
    price: "1000 V-Buckets",
  },
  {
    title: "Snobby Shores",
    img: SnobbyShores,
    price: "850 V-Buckets",
  },
];

const paddleList = [
  {
    title: "Epic Flux",
    img: PaddlesSVGs.PaddlesEpicFlux,
    price: "500 V-Buckets",
  },
  {
    title: "Legendary Flux",
    img: PaddlesSVGs.PaddlesLegendaryFlux,
    price: "300 V-Buckets",
  },
  {
    title: "Rare Flux",
    img: PaddlesSVGs.PaddlesRareFlux,
    price: "1000 V-Buckets",
  },
  {
    title: "Cold Paddle",
    img: PaddlesSVGs.PaddlesCold,
    price: "530 V-Buckets",
  },
  {
    title: "Fire Awn",
    img: PaddlesSVGs.PaddlesFir3awn,
    price: "1570 V-Buckets",
  },
  {
    title: "Hacker Paddle",
    img: PaddlesSVGs.PaddlesHacker,
    price: "800 V-Buckets",
  },
  {
    title: "Joker Paddle",
    img: PaddlesSVGs.PaddlesJocker,
    price: "750 V-Buckets",
  },
  {
    title: "La Casa Paddle",
    img: PaddlesSVGs.PaddlesLacasa,
    price: "1220 V-Buckets",
  },
  {
    title: "Ninja Paddle",
    img: PaddlesSVGs.PaddlesNinja,
    price: "900 V-Buckets",
  },
  {
    title: "Paddles",
    img: PaddlesSVGs.PaddlesPalyer10,
    price: "1100 V-Buckets",
  },
  {
    title: "Player 20 Paddle",
    img: PaddlesSVGs.PaddlesPlayer20,
    price: "600 V-Buckets",
  },
  {
    title: "Sahrawi Paddle",
    img: PaddlesSVGs.PaddlesSahrawi,
    price: "1450 V-Buckets",
  },
  {
    title: "Saudi Paddle",
    img: PaddlesSVGs.PaddlesSaudi,
    price: "1000 V-Buckets",
  },
  {
    title: "Space Man Paddle",
    img: PaddlesSVGs.PaddlesSpaceMan,
    price: "850 V-Buckets",
  },
  {
    title: "Spiderman Paddle",
    img: PaddlesSVGs.PaddlesSpiderman,
    price: "850 V-Buckets",
  },
  {
    title: "The Dark Paddle",
    img: PaddlesSVGs.PaddlesTheDark,
    price: "850 V-Buckets",
  },
  {
    title: "Zombie Paddle",
    img: PaddlesSVGs.PaddlesZombie,
    price: "850 V-Buckets",
  },
];

export default function IPongStore() {
  const [ShowPaddlesTabel, setShowPaddlesTabel] = React.useState(false);
  return (
    <div className="store-frame">
      <div className="Store-List">
        <div className="Store-List-nav">
        <div className="Store-List-nav-item" onClick={() => {setShowPaddlesTabel(false)}}>
            <h2>TABLE</h2>
          </div>
          <div className="Store-List-nav-item" onClick={() => {setShowPaddlesTabel(true)}}>
            <h1>PADDLES</h1>
          </div>

        </div>

        <ScrollShadow hideScrollBar className="h-[450px] w-full">
          {!ShowPaddlesTabel ? (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isBlurred
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                isBlurred
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
          ) : (
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
              {paddleList.map((item, index) => (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  
                  onPress={() => console.log("item pressed")}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="none"
                      radius="none"
                      width="100%"
                      isBlurred
              
                      alt={item.title}
                      className="w-full object-coverd h-[120px]"
                      src={item.img}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.title}</b>
                    <p className="text-default-500">{item.price}</p>
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

