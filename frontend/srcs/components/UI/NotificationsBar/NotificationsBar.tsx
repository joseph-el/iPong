import React from "react";
import './NotificationsBar.css';
import { NotificationsWrapper } from "./NotificationsWrapper";
import { Grid, GridItem } from '@chakra-ui/react'

import Close from "../../UI/Button/CloseButton/CloseButton"
import {Button} from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";

import ImessagesNotifications from "../iMessagesNotifications/iMessagesNotifications";

import FriendNotifications from "../FriendNotifications/FriendNotifications";

const NotificationsNavbar = () => {
    return (
        <div className="NotificationsNavbar">

            <div className="overlap-group">
                

                <div className="text-wrapper">Notification Centre</div>

                <div className="push-button">
                    <Button size="sm" color="primary">
                        Clear All
                    </Button>
                    <Close ClassName="close" id="close" />
                </div>
               



            </div>
        </div>
    );
};



export default function NotificationsBar() {
    return (
        <div className="NotificationsBar-frame">
            <NotificationsWrapper>

                    <Grid
                        templateAreas={`"header"
                                        "main"`}


                        gridTemplateRows={'80px 1fr 10px'}
                        gridTemplateColumns={'365px '}
                        h='500px'
                        gap='0'
                        color='blackAlpha.700'
                        fontWeight='bold'
                        >
                        <GridItem pl='2' area={'header'}>
                            <NotificationsNavbar/>
                        </GridItem>
                        <GridItem pl='2' h='full' area={'main'}>
                        <ScrollShadow className="w-[350px] h-[400px]">

                            <FriendNotifications />
                            <ImessagesNotifications />
                            <FriendNotifications />
                            <ImessagesNotifications />
                            <ImessagesNotifications />
                            <ImessagesNotifications />
                            <ImessagesNotifications />
                            <ImessagesNotifications />




                        </ScrollShadow>
                            




                        </GridItem>
                    </Grid>

            </NotificationsWrapper>


        </div>
    );
}






/*
@layer components {

    .NotificationsNavbar .overlap-group {
        height: 35px;
        left: 0; 
        position: relative;
        top: 35px;
        width: 365px;
    }
    
    .NotificationsNavbar .close {
        height: 35px;
        right: 0; 
        position: absolute;
        top: 0;
        width: 35px;
    }
    
    .NotificationsNavbar .frame {
        height: 33px;
        left: 0;
        position: absolute;
        top: 2px;
        width: 365px; 
    }
    
    .NotificationsNavbar .text-wrapper {
        color: #fffffff2;
        font-family: "SF Pro Text-Medium", Helvetica;
        font-size: 26.4px;
        font-weight: 500;
        height: 27px;
        left: 0;
        letter-spacing: -0.45px;
        line-height: 19.8px;
        position: absolute;
        text-align: center;
        top: 2px;
        width: 100%; 
    }
    
    .NotificationsNavbar .push-button {
        align-items: flex-start;
        background: linear-gradient(180deg, rgb(75, 145, 247) 0%, rgb(54, 122, 246) 100%);
        border-radius: 8.16px;
        box-shadow: 0px 0.68px 2.04px #367af640;
        display: inline-flex;
        gap: 13.59px;
        justify-content: flex-end;
        right: 0;
        padding: 5.44px 19.03px;
        position: absolute;
        top: 0;
    }
    
    .NotificationsNavbar .continue {
        color: #ffffff;
        font-family: "SF Pro Display-Medium", Helvetica;
        font-size: 19px;
        font-weight: 500;
        letter-spacing: 0;
        line-height: normal;
        margin-top: -1.36px;
        position: relative;
        width: fit-content;
    }
    
}
*/