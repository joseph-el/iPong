import React from "react";
import "./ChatPanel.css";

import { Grid, GridItem } from "@chakra-ui/react";

import ChatPanelHeader from "../ChatPanelHeader/ChatPanelHeader";
import ChatPanelFooter from "../ChatPanelFooter/ChatPanelFooter";


import {RightChatBubbles} from "../ChatBubbles/ChatBubbles";
export default function ChatPanel() {
  return (
    <div className="ChatPanel-frame">
      <Grid
        templateAreas={`"header header"
                        "main main"
                        "Footer Footer"`}
        gridTemplateRows={"90px 1fr 90px"}
        // gridTemplateColumns={"10px 1fr"}
        h="100%"
        w={"100%"}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" w={"full"} h={"full"} area={"header"}>
            <ChatPanelHeader/>
        </GridItem>

        <GridItem pl="2" w={"full"} h={"full"}  bg={"black"} area={"main"}>
          <RightChatBubbles message={"Hi guys! 👋 I am good. I have been working like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀 , like crazy all last week, what did I miss? 😀 , like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀 like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀,like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀, like crazy all last week, what did I miss? 😀,like crazy all last week, what did I miss? 😀 ,like crazy all last week, what did I miss? 😀 ,like crazy all last week, what did I miss? 😀 ,like crazy all last week, what did I miss? 😀"}/>
        </GridItem>

        <GridItem pl="2" w={"full"} h={"full"}  area={"Footer"}>
          <ChatPanelFooter/>
        </GridItem>

      </Grid>
    </div>
  );
}
