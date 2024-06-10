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
      <div className="CongratulationsNewSkin-frame">
        <Image
          shadow="none"
          radius="none"
          width="100%"
          alt={"SKIN IMG"}
          className="w-full h-[400px] animate-pulse"
          src={props.imgPath}
        />

        <Tooltip color="primary" size={"lg"} placement={"bottom"} className="w-[250px]" content={props.description} delay={10}>
          <Button size="lg" className="Tooltip-Button" color="primary" variant="flat">
            {props.name}
          </Button>
        </Tooltip>

      </div>
    </CongratulationsNewSkinWrapper>
  );
}
