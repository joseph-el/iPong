import React from "react";
import "./iPongChat.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatPanelLayout from "../../components/UI/iPongChatComponents/ChatPanel/ChatPanelLayout";
import CreatNewMessage from "../../components/UI/iPongChatComponents/CreatNewMessage/CreatNewMessage";
import UserListMessages from "../../components/UI/iPongChatComponents/UserListMessages/UserListMessages";
import CreatGroupChat from "../../components/UI/iPongChatComponents/CreatNewMessage/CreatGroupChat/CreatGroupChat";
import StartFriendChat from "../../components/UI/iPongChatComponents/CreatNewMessage/StartFriendChat/StartFriendChat";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setIsSelectedMessage } from "../../state/iPongChatState/iPongChatState";
export default function IPongChat() {
  const { chatId: paramChatId } = useParams();
  const [chatId, setChatId] = useState(paramChatId);
  const dispatch = useDispatch();
  useEffect(() => {
    setChatId(paramChatId);
  }, [paramChatId]);

  dispatch(setIsSelectedMessage(chatId));

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [ShowCreateNewChat, setShowCreateNewChat] = React.useState(false);
  const [ShowCreateFriendChat, setShowFriendChat] = React.useState(false);
  const [ShowCreateGroupChat, setShowCreateGroupChat] = React.useState(false);
  

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
    setShowFriendChat(false);
    setShowCreateNewChat(false);
    setShowCreateGroupChat(false);
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
            : chatId != undefined
            ? `
                "main main"
                "main main"
                "main main"`
            : ` "sidebar sidebar"
                "sidebar sidebar"
                "sidebar sidebar"`
        }
        gridTemplateRows={"50px 1fr 35px"}
        gridTemplateColumns={` ${
          windowWidth <= 900 ? "250px" : windowWidth <= 2000 ? "380px" : "410px"
        } 1fr`}
        h="100%"
        fontWeight="bold"
      >
        {!isWideScreen || chatId == undefined ? (
          <GridItem pl="2" w={"full"} area={"sidebar"}>
            <UserListMessages
              ShowCreateNewChat={() => {
                handleCloseClick();
                setShowCreateNewChat(true);
              }}
            />
          </GridItem>
        ) : null}

        {chatId != undefined && (
          <GridItem pl="2" h={"full"} area={"main"}>
            <ChatPanelLayout />
          </GridItem>
        )}

        {ShowCreateNewChat ? (
          <div className="blur-background">
            <div className="AchievementList-place fade-in">
              <CreatNewMessage
                onCloseComponent={handleCloseClick}
                onClose={handleCloseClick}
                ShowCreateGroupChat={() => setShowCreateGroupChat(true)}
                ShowCreateFriendChat={() => setShowFriendChat(true)}
              />
            </div>
          </div>
        ) : null}

        {ShowCreateGroupChat ? (
          <div className="blur-background">
            <div className="AchievementList-place fade-in">
              <CreatGroupChat onCloseComponent={handleCloseClick} />
            </div>
          </div>
        ) : null}

        {ShowCreateFriendChat ? (
          <div className="blur-background">
            <div className="AchievementList-place fade-in">
              <StartFriendChat onCloseComponent={handleCloseClick} />
            </div>
          </div>
        ) : null}
      </Grid>
    </>
  );
}
