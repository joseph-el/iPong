import React from "react";
import "./ChatPanelLayout.css";

import { Grid, GridItem } from "@chakra-ui/react";

import ChatPanelHeader from "../ChatPanelHeader/ChatPanelHeader";
import ChatPanelFooter from "../ChatPanelFooter/ChatPanelFooter";
import ChatPanel from "./ChatPanel";

export default function ChatPanelLayout() {
  return (
    <div className="ChatPanel-frame">
      <Grid
        templateAreas={`"header header"
                        "main main"
                        "Footer Footer"`}
        gridTemplateRows={"90px 1fr 90px"}
        h="100%"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"}>
          <ChatPanelHeader />
        </GridItem>

        <GridItem pl="2" bg={"black"} area={"main"}>
          <ChatPanel />
        </GridItem>

        <GridItem pl="2"  area={"Footer"}>
          <ChatPanelFooter />
        </GridItem>
      </Grid>
    </div>
  );
}
