import React from "react";
import "./ChatPanel.css";

import { Grid, GridItem } from "@chakra-ui/react";

export default function ChatPanel() {
  return (
    <div className="ChatPanel-frame">
      <Grid
        templateAreas={`"header header"
                        "main main"
                        "main main"`}
        gridTemplateRows={"55px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100%"
        w={"100%"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" w={"full"} h={"full"} area={"header"}>
          Header
        </GridItem>

        <GridItem pl="2" w={"full"} h={"full"}  bg="green.300" area={"main"}>
          Main
        </GridItem>

      </Grid>
    </div>
  );
}
