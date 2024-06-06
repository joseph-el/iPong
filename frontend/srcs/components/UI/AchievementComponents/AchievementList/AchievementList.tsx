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
        unlockedDescription: "Welcome to the Bronze level. As a beginner, you are starting your journey with us. Keep going to reach the next levels!",
        lockedDescription: "Reach 100 XP to unlock the Bronze level and start your journey with us.",
    },
    {
        title: "Level 2",
        img: Level2Svg,
        unlockedDescription: "Congratulations on reaching Silver level! Your dedication is showing. Keep up the good work to hit the next milestone.",
        lockedDescription: "Accumulate 250 XP to unlock the Silver level and show your dedication.",
    },
    {
        title: "Level 3",
        img: Level3Svg,
        unlockedDescription: "You're now at the Gold level! Your skills and persistence are shining through. Aim higher for more rewards.",
        lockedDescription: "Gather 500 XP to unlock the Gold level and let your skills shine.",
    },
    {
        title: "Level 4",
        img: Level4Svg,
        unlockedDescription: "Fantastic! You've reached the Platinum level. Your excellence is evident. Continue pushing your limits to achieve more.",
        lockedDescription: "Reach 1000 XP to unlock the Platinum level and showcase your excellence.",
    },
    {
        title: "Level 5",
        img: Level5Svg,
        unlockedDescription: "Diamond level achieved! You are among the elite. Your expertise is impressive. Keep striving for the ultimate goal.",
        lockedDescription: "Achieve 2000 XP to unlock the Diamond level and join the elite.",
    },
    {
        title: "Level 6",
        img: Level6Svg,
        unlockedDescription: "Welcome to the GrandMaster level! You have reached the pinnacle of success. Your mastery is unparalleled. Maintain your status and inspire others.",
        lockedDescription: "Accumulate more than 2000 XP to unlock the GrandMaster level and reach the pinnacle of success.",
    },
];

  const UserAchievementList = list.map((item, index) => {
    return {
      title: item.title,
      img: item.img,
      unlockedDescription: item.unlockedDescription,
      lockedDescription: item.lockedDescription,
      state: index >= props.level ? "locked" : "unlocked",
    };
  });

  console.log(UserAchievementList);

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
                  {UserAchievementList.map((item, index) => (
                    <Popover  className="w-72"  backdrop={"opaque"} placement="bottom-end" showArrow>
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
                          <div className="text-small-ovr font-bold">
                            {"this is level " + item.state}
                          </div>
                          <div className="text-tiny-ovr">
                            {item.state == "locked"
                              ? item.lockedDescription
                              : item.unlockedDescription}
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
