import React from "react";
import "./CongratulationsNewSkin.css";
import { CongratulationsNewSkinWrapper } from "./CongratulationsNewSkinWrapper";
import Close from "../Button/CloseButton/CloseButton";
import { Button, Image, Tooltip } from "@nextui-org/react";

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
      <div className="CongratulationsNewSkin-frame"  >
        <Image
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
        </Tooltip>

      </div>
    </CongratulationsNewSkinWrapper>
  );
}
