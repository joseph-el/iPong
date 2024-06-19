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
import { io } from "socket.io-client";
import { useSocket } from "../../context/SocketContext";

export default function IPongChat() {
  const { chatId: paramChatId } = useParams();
  const [chatId, setChatId] = useState(paramChatId);
  const dispatch = useDispatch();
  useEffect(() => {
    setChatId(paramChatId);
  }, [paramChatId]);
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

  dispatch(setIsSelectedMessage(chatId));

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket?.on("connect", () => {
      console.log("connected:::>");
    });

    socket?.on("onlineFriends", (friendIds) => {
      console.log("onlineFriends:::>", friendIds);
    });

    socket?.on("joinRoom", (userId) => {
      console.log("joinRoom:::>", userId);
    });

    socket?.on("friendOffline", (userId) => {
      console.log("friendOffline:::>", userId);
    });

    socket?.on("roomCreated", (room) => {
      console.log("roomCreated:::>", room);
    });

    socket?.on("message", (message) => {
      console.log("message:::>", message);
    });

    socket?.on("error", (error) => {
      console.log("error:::>", error);
    });

  }, [socket]);


  const accessToken = document?.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

  useEffect(() => {
    const socket = io("http://localhost:3000/chat", {
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
    console.log("socket hiiii :::>", socket);
    socket.on("connect", () => {
      console.log("connected:::>");
    });

    socket.on("onlineFriends", (friendIds) => {
      console.log("onlineFriends:::>", friendIds);
    });

    socket.on("joinRoom", (userId) => {
      console.log("joinRoom:::>", userId);
    });

    socket.on("friendOffline", (userId) => {
      console.log("friendOffline:::>", userId);
    });

    socket.on("roomCreated", (room) => {
      console.log("roomCreated:::>", room);
    });

    socket.on("message", (message) => {
      console.log("message:::>", message);
    });

    socket.on("error", (error) => {
      console.log("error:::>", error);
    });
  }, []);


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
