import React from "react";
import "./iPongChat.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatPanelLayout from "../../components/UI/iPongChatComponents/ChatPanel/ChatPanelLayout";


import UserListMessages from "../../components/UI/iPongChatComponents/UserListMessages/UserListMessages";
export default function IPongChat() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isWideScreen = windowWidth <= 750;
  return (
    <>
      <Grid
        templateAreas={
          !isWideScreen
            ? ` "sidebar main main"
                "sidebar main main"
                "sidebar main main"`
            : `
                "main main"
                "main main"
                "main main"`
        }
        gridTemplateRows={"50px 1fr 35px"}
        gridTemplateColumns={` ${ windowWidth <= 900 ? "250px" :  windowWidth <= 2000  ? "380px" : "410px"} 1fr`}
        h="100%"

        fontWeight="bold"
      >

        {!isWideScreen ? (
          <GridItem pl="2" w={"full"}  area={"sidebar"}>
            <UserListMessages/>
          </GridItem>
        ) : null}

        <GridItem pl="2"  h={"full"}   area={"main"}>
          
          <ChatPanelLayout/>


        </GridItem>
      </Grid>
    </>
  );
}
