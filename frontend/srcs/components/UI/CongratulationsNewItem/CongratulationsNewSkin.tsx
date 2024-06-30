import React from "react";
import "./CongratulationsNewSkin.css";
import { CongratulationsNewSkinWrapper } from "./CongratulationsNewSkinWrapper";
import Close from "../Button/CloseButton/CloseButton";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { Card, CardFooter, CardBody, CardHeader } from "@nextui-org/react";

const CongratulationsNewSkinNavbar = (props) => {
  const { level } = props;
  return (
    <div className="CongratulationsNewSkinNavbar">
      <div className="overlap-group">
        <div className="text-wrapper">Congratulations</div>
        <div className="push-button">
          <Close func={props.close} id="close" />
        </div>
      </div>
    </div>
  );
};

export default function CongratulationsNewSkin(props) {
  return (
    <CongratulationsNewSkinWrapper>
      <CongratulationsNewSkinNavbar close={props.close} />
      <div className="CongratulationsNewSkin-frame">
        <Card isFooterBlurred radius="lg" className="border-none h-[100%]">
          <Image
            alt="Woman listing to music"
            className="object-cover w-full h-[400px] rounded-t-lg"
            src={props.imgPath}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">{props.name}</p>
            <Tooltip
              size={"lg"}
              placement={"bottom"}
              className="w-[250px] bg-black"
              content={props.description}
              delay={10}
            >
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                {"description"}
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
        {/* <Image
          shadow="none"
          radius="none"
          width="100%"
          alt={"SKIN IMG"}
          className="w-[40%] h-[400px] animate-pulse"
          src={props.imgPath}
        />

        <Tooltip size={"lg"} placement={"bottom"} className="w-[250px] bg-black" content={props.description} delay={10}>
          <Button size="md"  radius="lg" className="Tooltip-Button bg-black border-1"  variant="flat">
            {props.name}
          </Button>
        </Tooltip> */}
      </div>
    </CongratulationsNewSkinWrapper>
  );
}
