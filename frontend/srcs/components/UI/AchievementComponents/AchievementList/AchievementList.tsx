import React from "react";
import "./AchievementList.css";
import { AchievementListWrapper } from "./AchievementListWrapper";
import { Grid, GridItem } from "@chakra-ui/react";
import { Button } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

import Level1Svg from "../assets/level1.svg";
import Level2Svg from "../assets/level2.svg";
import Level3Svg from "../assets/level3.svg";
import Level4Svg from "../assets/level4.svg";
import Level5Svg from "../assets/level5.svg";
import Level6Svg from "../assets/level6.svg";

const AchievementListNavbar = (props) => {
  return (
    <div className="AchievementListNavbar">
      <div className="overlap-group">
        <div className="text-wrapper">Achievement</div>
        <div className="push-button">
          <div
            className="AchievementListNavbar-button"
            onClick={props.closeList}
          >
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AchievementList(props) {
  const list = [
    {
      title: "Level 1",
      img: Level1Svg,
      state: "unlocked",
    },
    {
      title: "Level 2",
      img: Level2Svg,
      state: "locked",
    },
    {
      title: "Level 3",
      img: Level3Svg,
      state: "unlocked",
    },
    {
      title: "Level 4",
      img: Level4Svg,
      state: "locked",
    },
    {
      title: "Level 5",
      img: Level5Svg,
      state: "unlocked",
    },
    {
      title: "Level 6",
      img: Level6Svg,
      state: "locked",
    },
  ];

  return (
    <AchievementListWrapper>
      <Grid
        templateAreas={`"header"
                                        "main"`}
        gridTemplateRows={"62px 1fr 10px"}
        gridTemplateColumns={"450px "}
        h="500px"
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"}>
          <AchievementListNavbar closeList={props.closeList} />
        </GridItem>

        <GridItem pl="2" h="full" w="full" area={"main"}>
          <div className="center-items">
            <ScrollShadow
              size={5}
              hideScrollBar
              className="w-[360px] h-[470px]"
            >
              <div className="flex-arch-items">
                <div className="gap-2 grid grid-cols-2  arch-padding-items">
                  {list.map((item, index) => (
                    <Popover placement="bottom-end">
                      <PopoverTrigger>
                        <Card shadow="md" key={index} isPressable>
                          <CardBody
                            className={
                              "overflow-visible p-0 " +
                              (item.state == "locked" ? "blur-sm" : "")
                            }
                          >
                            <Image
                              shadow="md"
                              radius="lg"
                              width="100%"
                              alt={item.title}
                              className="w-full object-cover h-[180px]"
                              src={item.img}
                            />
                          </CardBody>
                          <CardFooter className="text-small justify-between">
                            <b>{item.title}</b>
                            <p className="text-default-500">{item.state}</p>
                          </CardFooter>
                        </Card>
                      </PopoverTrigger>

                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            {"this is level " + item.state}
                          </div>
                          <div className="text-tiny">
                            This is the popover content
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </div>
            </ScrollShadow>
          </div>
        </GridItem>
      </Grid>
    </AchievementListWrapper>
  );
}
