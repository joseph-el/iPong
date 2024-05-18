import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { SideBar } from '../../components/SideBar/SideBar';
import {Divider} from "@nextui-org/divider";
import NavBar from '../../components/NavBar/NavBar';
import './AppLayout.css';
// import SearchInput from '../../components/UI/SearchInput/SearchInput';

// acczss_token
import LiveChat from '../../components/LiveChat/LiveChat';
import Home from '../Home/Home';


export default function AppLayout() {
  return (
    <Grid
      templateAreas={`
        "sidebar nav  livechat"
        "sidebar main livechat"
        "sidebar main livechat"
      `}
      gridTemplateRows={'72px 1fr 30px'}
      gridTemplateColumns={'78px 1fr 200px'} // Specify the widths for sidebar and live chat
      h='100vh' // Set the height of the Grid container to 100vh
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
