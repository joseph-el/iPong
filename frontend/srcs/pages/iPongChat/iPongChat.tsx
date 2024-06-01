import React from "react";
import "./iPongChat.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatPanelLayout from "../../components/UI/iPongChatComponents/ChatPanel/ChatPanelLayout";
import CreatNewMessage from "../../components/UI/iPongChatComponents/CreatNewMessage/CreatNewMessage";
import UserListMessages from "../../components/UI/iPongChatComponents/UserListMessages/UserListMessages";
import CreatGroupChat from "../../components/UI/iPongChatComponents/CreatNewMessage/CreatGroupChat/CreatGroupChat";
import StartFriendChat from "../../components/UI/iPongChatComponents/CreatNewMessage/StartFriendChat/StartFriendChat";

export default function IPongChat() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [ShowCreateNewChat, setShowCreateNewChat] = React.useState(false);
  const [ShowCreateGroupChat, setShowCreateGroupChat] = React.useState(false);
  const [ShowCreateFriendChat, setShowFriendChat] = React.useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCloseClick = () => {
    setShowCreateNewChat(false);
    setShowCreateGroupChat(false);
    setShowFriendChat(false);
  };

  const isWideScreen = windowWidth <= 905;
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
        gridTemplateColumns={` ${
          windowWidth <= 900 ? "250px" : windowWidth <= 2000 ? "380px" : "410px"
        } 1fr`}
        h="100%"
        fontWeight="bold"
      >
        {!isWideScreen ? (
          <GridItem pl="2" w={"full"} area={"sidebar"}>
            <UserListMessages
              ShowCreateNewChat={() => {
                handleCloseClick();
                setShowCreateNewChat(true);
              }}
            />
          </GridItem>
        ) : null}

        <GridItem pl="2" h={"full"} area={"main"}>
          <ChatPanelLayout />
          {ShowCreateNewChat ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <CreatNewMessage  onCloseComponent={handleCloseClick}  onClose={handleCloseClick} ShowCreateGroupChat={() => setShowCreateGroupChat(true)} ShowCreateFriendChat={() => setShowFriendChat(true)}  />
              </div>
            </div>
          ) : null}

          {ShowCreateGroupChat ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <CreatGroupChat onCloseComponent={handleCloseClick}  />
              </div>
            </div>
            
          ) : null}

          {ShowCreateFriendChat ? (
            <div className="blur-background">
              <div className="AchievementList-place fade-in">
                <StartFriendChat  onCloseComponent={handleCloseClick} />
              </div>
            </div>
          ) : null}
        </GridItem>
      </Grid>
    </>
  );
}
