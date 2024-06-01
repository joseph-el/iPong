import React from "react";
import "./ChatPanelLayout.css";

import { Grid, GridItem } from "@chakra-ui/react";

import ChatPanelHeader from "../ChatPanelHeader/ChatPanelHeader";
import ChatPanelFooter from "../ChatPanelFooter/ChatPanelFooter";
import ChatPanel from "./ChatPanel";
import CreatNewMessage from "../CreatNewMessage/CreatNewMessage";

export default function ChatPanelLayout() {

  const [ShowGroupChatSettings, setShowGroupChat] = React.useState(false);
  const [ShowFriendChatSetting, setShowFriendChatSetting] =
    React.useState(false);

  const handleCloseClick = () => {
 
    setShowGroupChat(false);
    setShowFriendChatSetting(false);
  };

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

        <GridItem pl="2" style={{ overflowY: "auto" }} area={"main"}>
          <ChatPanel />










        </GridItem>

        <GridItem pl="2" area={"Footer"}>
          <ChatPanelFooter />
        </GridItem>
      </Grid>
    </div>
  );
}
