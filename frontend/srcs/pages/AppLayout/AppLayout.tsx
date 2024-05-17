import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { SideBar } from '../../components/SideBar/SideBar';
import {Divider} from "@nextui-org/divider";
import NavBar from '../../components/NavBar/NavBar';
import './AppLayout.css';
import SearchInput from '../../components/UI/SearchInput/SearchInput';

export function AiCOn() {
  return (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">NextUI Components</h4>
        <p className="text-small text-default-400">Beautiful, fast and modern React UI library.</p>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-small">
        <div>Blog</div>
        <Divider orientation="horizontal" />
        <div>Docs</div>
        <Divider orientation="horizontal" />
        <div>Source</div>
      </div>
    </div>
  );
}



export default function AppLayout() {
  return (
    <Grid
      templateAreas={`
        "sidebar nav  livechat"
        "sidebar main livechat"
        "sidebar main livechat"
      `}
      gridTemplateRows={'70px 1fr 30px'}
      gridTemplateColumns={'78px 1fr 200px'} // Specify the widths for sidebar and live chat
      h='100vh' // Set the height of the Grid container to 100vh
      gap='0'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' area={'nav'}>
        <NavBar/>
      </GridItem>

      <GridItem pl='2' area={'sidebar'}>
        <SideBar />
      </GridItem>

      <GridItem pl='2' bg='GrayText' area={'main'}>
        main content
      </GridItem>

      <GridItem pl='2' bg='black' area={'livechat'}>
        Live Chat
      </GridItem>
    </Grid>
  );
}
