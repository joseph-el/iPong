import React from "react";
import './UserListMessages.css'
import { Grid, GridItem } from '@chakra-ui/react'


export default function UserListMessages() {

    return (
  
            <Grid
                    templateAreas={`"header"
                                    "main"
                                    "main"`}
                    gridTemplateRows={'130px 1fr 30px'}
                    // gridTemplateColumns={'150px 1fr'}
                    h='100%'
                    w={"100%"}

                    color='blackAlpha.700'
                    fontWeight='bold'
                    >
                    <GridItem pl='2' bg='orange.300' w={"full"} area={'header'}>
                        Header
                    </GridItem>
                    <GridItem pl='2' bg='green.300' area={'main'}>
                        Main
                    </GridItem>

            </Grid>
    
    );
}