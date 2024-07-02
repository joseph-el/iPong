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
import { Socket } from "socket.io-client";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {setRouterStateType, setRouterState} from "../../state/RouterState/routerSlice";

const accessToken = document?.cookie
  ?.split("; ")
  ?.find((row) => row.startsWith("access_token="))
  ?.split("=")[1];

export default function IPongChat() {
  const navigate = useNavigate();
  const { chatId: paramChatId } = useParams();

  useEffect(() => {
    setChatId(paramChatId);
  }, [paramChatId]);

  const [chatId, setChatId] = useState(paramChatId);
  const dispatch = useDispatch();
  const UserId = useSelector((state: RootState) => state.userState.id);

  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );



  useEffect(() => {
    if (selectedMessage) {
      dispatch(setRouterState("iPongChat"))
        dispatch(setRouterStateType(selectedMessage.fullname));
    }
  }, [selectedMessage]);

  const ListMessages = useSelector(
    (state: RootState) => state.iPongChat.ListMessages
  );

  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!selectedMessage && chatId != undefined) {
      if (socketRef.current && ListMessages.length > 0) {
        const IsFounded = ListMessages.find((message) => message.id === chatId);
        if (!IsFounded) {
          navigate("/ipong/chat");
        }
        socketRef.current.emit("joinRoom", {
          userId: UserId,
          roomId: chatId,
        });
        dispatch(setIsSelectedMessage(chatId));
      }
    }
  }, [ListMessages]);

  const url = import.meta.env.VITE_URL;
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const socket = io(`http://${url}:3000/chat`, {
      transports: ["websocket"],

      auth: { token: accessToken },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socketRef.current?.on("connect", () => {
      console.log("connected:::>", socketRef.current?.id);
    });

    socketRef.current?.on("onlineFriends", (friendIds) => {
      // console.log("onlineFriends:::>", friendIds);
    });
    socketRef.current?.on("joinRoom", (userId) => {
      console.log("joinRoom:::>", userId);
    });

    socketRef.current?.on("friendOffline", (userId) => {
      console.log("friendOffline:::>", userId);
    });

    socketRef.current?.on("roomCreated", (room) => {
      console.log("roomCreated:::>", room);
    });

    socketRef.current?.on("message", (message) => {
      console.log("message:::>", message);
    });

    socketRef.current?.on("error", (error) => {
      console.log("error:::>", error);
    });

    socketRef.current?.on("disconnect", () => {
      console.log("disconnected:::>", socketRef.current?.id);
    });
  }, []);

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
              socket={socketRef}
              ShowCreateNewChat={() => {
                handleCloseClick();
                setShowCreateNewChat(true);
              }}
            />
          </GridItem>
        ) : null}

        {chatId != undefined && (
          <GridItem pl="2" h={"full"} area={"main"}>
            <ChatPanelLayout socket={socketRef} />
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
