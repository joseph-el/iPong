import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import "./AppLayout.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
  Outlet,
} from "react-router-dom";

import IPongGame from "../iPongGame/iPongGame";
import LiveChat from "../../components/LiveChat/LiveChat";
import UserProfile from "../iPongProfile/iPongUserProfile/iPongUserProfile";
import UserProfileViewAs from "../iPongProfile/iPongUserProfileViewAs/iPongUserProfileViewAs";
import IPongChat from "../iPongChat/iPongChat";
import IPongStore from "../iPongStore/iPongStore";
import SeeUsers from "../../components/UI/iPongChatComponents/SeeUsers/SeeUsers";
import SeeGroup from "../../components/UI/iPongChatComponents/SeeGroup/SeeGroup";
import CreatNewMessage from "../../components/UI/iPongChatComponents/CreatNewMessage/CreatNewMessage";
import CreatGroupChat from "../../components/UI/iPongChatComponents/CreatNewMessage/CreatGroupChat/CreatGroupChat";
import StartFriendChat from "../../components/UI/iPongChatComponents/CreatNewMessage/StartFriendChat/StartFriendChat";
import { useSocket } from "../../context/SocketContext";
import InviteGameModal from "../../game/components/InviteGameModal/InviteGameModal";
import InitInvitedPlayers from "../../game/components/InitInvitedPlayers/InitInvitedPlayers";

export default function AppLayout({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /* Invitation States */
  const [fromInvite, setFromInvite] = useState(null);
  const [isInvited, setIsInvited] = useState(false);
  const [isInviteAccepted, setIsInviteAccepted] = useState(false);
  const [inviteId, setInviteId] = useState(null);
  const { socket, connect, disconnect } = useSocket();

  /* Socket Connection Init here  */
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  /* user received an invite */
  useEffect(() => {
    if (socket) {
      socket.on("inviteFromFriend", (data) => {
        setFromInvite(data.challengedBy);
        setIsInvited(true);
        setInviteId(data.inviteId);
      });

      socket.on("cancelledInvite", () => {
        console.log(
          "Sorry! your opponent disconnected directly after your acceptation."
        );
        setIsInviteAccepted(false);
      });

      socket.on("opponentJoinedAnotherMatch", () => {
        console.log(
          "Sorry! your opponent joined another matchmaking/game after your acceptation"
        );
        setIsInviteAccepted(false);
      });

      socket.on("launchingInvitationGame", (data) => {
        setInviteId(data.inviteId);
        setIsInviteAccepted(true);
      });
    }
  }, [socket]);

  /* User Invitation Actions */
  const closeInvitation = () => {
    setIsInvited(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isWideScreen = windowWidth < 1150;

  return (
    <>
      {isInvited && (
        <div className="blur-background">
          <div className="AchievementList-place fade-in">
            <InviteGameModal
              onClose={closeInvitation}
              OpponentId={fromInvite}
              inviteId={inviteId}
            />
          </div>
        </div>
      )}
      <Grid
        templateAreas={
          isWideScreen
            ? `
    "sidebar nav  nav"
    "sidebar main main"
    "sidebar main main"
  `
            : `
  "sidebar nav  nav"
  "sidebar main main"
  "sidebar main main"
`
        }
        gridTemplateRows={"74px 1fr 30px"}
        gridTemplateColumns={"78px 1fr 300px"}
        h="100vh"
        gap="0"
        color="white"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"nav"} rowSpan={1}>
          <NavBar />
        </GridItem>

        <GridItem pl="2" area={"sidebar"}>
          <SideBar />
        </GridItem>

        <GridItem
          pl="2"
          area={"main"}
          w="full"
          h="full"
          style={{ overflow: "hidden" }}
        >
          {isInviteAccepted ? (
            <InitInvitedPlayers inviteId={inviteId} />
          ) : (
            <>
              {children}
              <Outlet />
            </>
          )}
        </GridItem>

        {/* {isWideScreen ? null : (
          <GridItem pl="2" bg="black" area={"livechat"}>
            <LiveChat />
          </GridItem>
        )} */}
      </Grid>
    </>
  );
}
