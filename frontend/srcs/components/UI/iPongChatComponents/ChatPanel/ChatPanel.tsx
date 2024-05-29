import React from "react";
import "./ChatPanel.css";

import { Grid, GridItem } from "@chakra-ui/react";

import ChatPanelHeader from "../ChatPanelHeader/ChatPanelHeader";
export default function ChatPanel() {
  return (
    <div className="ChatPanel-frame">
      <Grid
        templateAreas={`"header header"
                        "main main"
                        "Footer Footer"`}
        gridTemplateRows={"90px 1fr 70px"}
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
          Main
        </GridItem>

        <GridItem pl="2" w={"full"} h={"full"}  area={"Footer"}>
          footer
        </GridItem>

      </Grid>
    </div>
  );
}
