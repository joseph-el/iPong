import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { SideBar } from '../../components/SideBar/SideBar';
import {Divider} from "@nextui-org/divider";
import NavBar from '../../components/NavBar/NavBar';
import './AppLayout.css';
import { useEffect, useState } from 'react';

import LiveChat from '../../components/LiveChat/LiveChat';
import Home from '../Home/Home';

export default function AppLayout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isWideScreen = windowWidth < 1150;


  return (
    <Grid
    templateAreas={
      isWideScreen ?`
    "sidebar nav  nav"
    "sidebar main main"
    "sidebar main main"
  ` : `
  "sidebar nav  livechat"
  "sidebar main livechat"
  "sidebar main livechat"
`
}
    gridTemplateRows={'72px 1fr 30px'}
    gridTemplateColumns={'78px 1fr 200px'} 
    h='100vh' 
    gap='0'
    color='white'
    fontWeight='bold'
    >
      <GridItem pl='2'  area={'nav'} rowSpan={1}>
        <NavBar/>
      </GridItem>

      <GridItem pl='2' area={'sidebar'}>
        <SideBar />
      </GridItem>

      <GridItem pl='2'  area={'main'} w="full" h="full">
        <Home />
      </GridItem>
    {
      isWideScreen ? null
      : <GridItem pl='2' bg='black' area={'livechat'}>
          <LiveChat />
        </GridItem>
    }
    </Grid>
  );
}




/* With LiveChat */

/*
export default function AppLayout() {
  return (
    <Grid
      templateAreas={`
        "sidebar nav  livechat"
        "sidebar main livechat"
        "sidebar main livechat"
      `}
      gridTemplateRows={'72px 1fr 30px'}
      gridTemplateColumns={'78px 1fr 200px'} 
      h='100vh' 
      gap='0'
      color='white'
      fontWeight='bold'
    >
      <GridItem pl='2'  area={'nav'} rowSpan={1}>
        <NavBar/>
      </GridItem>

      <GridItem pl='2' area={'sidebar'}>
        <SideBar />
      </GridItem>

      <GridItem pl='2' area={'main'} w="full" h="full">
        <Home />
      </GridItem>

      <GridItem pl='2' bg='black' area={'livechat'}>
        <LiveChat />
      </GridItem>
    </Grid>
  );
}
*/

/**
 export default function AppLayout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isWideScreen = windowWidth >= 1150;

  return (
    <Grid
      templateAreas={
        isWideScreen
          ? `
        "sidebar nav  livechat"
        "sidebar main livechat"
        "sidebar main livechat"
      `
          : `
        "sidebar nav  nav"
        "sidebar main main"
        "sidebar main main"
      `
      }
      gridTemplateRows={isWideScreen ?    '72px 1fr 30px'     : '72px 1fr'}
      gridTemplateColumns={isWideScreen ? '78px 1fr 200px' : '1fr'}

      h='100vh'
      gap='0'
      color='white'
      fontWeight='bold'
    >
      <GridItem pl='2' area={'sidebar'}>
        <SideBar />
      </GridItem>

      {isWideScreen ? (
        <>
          <GridItem pl='2' area={'nav'} rowSpan={1}>
            <NavBar/>
          </GridItem>

          <GridItem pl='2' area={'main'} w="full" h="full">
            <Home />
          </GridItem>

          <GridItem pl='2' bg='black' area={'livechat'}>
            <LiveChat />
          </GridItem>
        </>
      ) : (
        <>
          <GridItem pl='2' area={'nav'}  bg='white' rowSpan={1} colSpan={1}>
            <NavBar/>
          </GridItem>

          <GridItem pl='2' area={'main'} w="full" h="full" colSpan={2}>
            <Home />
          </GridItem>
        </>
      )}
    </Grid>
  );
}
 */