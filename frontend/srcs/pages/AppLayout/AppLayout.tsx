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
} from "react-router-dom";

import LiveChat from "../../components/LiveChat/LiveChat";
import UserProfile from "../iPongProfile/iPongUserProfile/iPongUserProfile";
import UserProfileViewAs from "../iPongProfile/iPongUserProfileViewAs/iPongUserProfileViewAs";
import IPongChat from "../iPongChat/iPongChat";
export default function AppLayout() {
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
      gridTemplateColumns={"78px 1fr 200px"}
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
        <BrowserRouter>
          <Routes>
            <Route path="/Profile" element={<UserProfile />} />
            <Route path="/Users/tnaceur" element={<UserProfileViewAs />} />
            <Route path="/ipongchat" element={<IPongChat />} />
          
          </Routes>
        </BrowserRouter>
      </GridItem>
      {isWideScreen ? null : (
        <GridItem pl="2" bg="black" area={"livechat"}>
          <LiveChat />
        </GridItem>
      )}
    </Grid>
  );
}
