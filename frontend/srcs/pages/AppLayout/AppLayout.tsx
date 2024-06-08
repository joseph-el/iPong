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

export default function AppLayout({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      <Grid
        templateAreas={
          isWideScreen
            ? `
    "sidebar nav  nav"
    "sidebar main main"
    "sidebar main main"
  `
            : `
  "sidebar nav  livechat"
  "sidebar main livechat"
  "sidebar main livechat"
`
        }
        gridTemplateRows={"72px 1fr 30px"}
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

        <GridItem pl="2" area={"main"} w="full" h="full">


          {children}
          
          
          

          <Outlet />

     
        </GridItem>
        {isWideScreen ? null : (
          <GridItem pl="2" bg="black" area={"livechat"}>
            <LiveChat />
          </GridItem>
        )}
      </Grid>
    </>
  );
}
