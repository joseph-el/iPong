import React from "react";
import "./LiveChat.css";

import LiveChatNavLogo from "./LiveChatNavLogo.svg";
import OnlineIcon from "./online-icon.svg";
import { Grid, GridItem } from "@chakra-ui/react";
import { ScrollShadow } from "@nextui-org/react";


import LiveChatBubbles from "../UI/LiveChatBubbles/LiveChatBubbles";
function LiveChatNav(props) {
  return (
    <div className="live-chat-nav">
      <img
        src={LiveChatNavLogo}
        alt="Live Chat Logo"
        className="LiveChatNavLogo"
      />
      <div className="User-online">
        <img src={OnlineIcon} alt="Online Icon" className="OnlineIcon" />
        <div className="User-online-text">Online: </div>
        <div className="User-online-number">10 </div>
      </div>
    </div>
  );
}

export default function LiveChat() {
  return (
    <div className="live-chat">
      <Grid
        templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
        gridTemplateRows={"60px 1fr 70px"}
        gridTemplateColumns={"150px 1fr"}
        h="100%"
      >
        <GridItem pl="2" area={"header"}>
          <LiveChatNav />
        </GridItem>

        <GridItem pl="2"   area={"main"}>
            <ScrollShadow>
                <LiveChatBubbles fullname="youssef elidrissi"message="hello iam new in this chat !!hello iam new in this chat !! hello iam new in this chat !!"/>
            </ScrollShadow>
        </GridItem>

        <GridItem pl="2"  area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </div>
  );
}
