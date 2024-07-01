import React from "react";
import "./CongratulationsNewSkin.css";
import { CongratulationsNewSkinWrapper } from "./CongratulationsNewSkinWrapper";
import Close from "../Button/CloseButton/CloseButton";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { Card, CardFooter, CardBody, CardHeader } from "@nextui-org/react";


export default function CongratulationsNewSkin(props) {
  return (

    <div className="CongratulationsNewSkin-frame">
      <Card
        isFooterBlurred
        radius="lg"
        className="CongratulationsNewSkin-card h-full w-[400px] set-padding"
      >
        <Image
          alt={"SKIN IMG"}
          className={
            "object-cover w-full h-[550px]   " +
            (props.BuyType === "skin" ? "adding-padding " : "")
          }
          src={props.imgPath}
        />

        <CardHeader className="header-">
        <div className="text-wrapper">Congratulations</div>
          <div className="push-button">
         
            <Close func={props.close} id="close" />
          </div>
        </CardHeader>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny py-2 footer-padding text-white/80">{props.name}</p>

          <Tooltip
            size={"lg"}
            placement={"bottom"}
            className="w-[250px] text-description"
            content={props.description}
            delay={10}
          >
            <Button
              className="text-tiny text-white footer-button"
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


    </div>

  );
}
