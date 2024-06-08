import React from "react";
import "./NotificationsBar.css";
import { NotificationsWrapper } from "./NotificationsWrapper";
import { Grid, GridItem } from "@chakra-ui/react";

import Close from "../../UI/Button/CloseButton/CloseButton";
import { Button } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";

import ImessagesNotifications from "../iMessagesNotifications/iMessagesNotifications";
import { io } from 'socket.io-client';
import FriendNotifications from "../FriendNotifications/FriendNotifications";

import users from "./data";
import { useEffect, useRef } from "react";
import { PATHS } from "../../../game/constants/paths";

const NotificationsNavbar = (props) => {
  return (
    <div className="NotificationsNavbar">
      <div className="overlap-group">
        <div className="text-wrapper">Notification Centre</div>

        <div className="push-button">
          <Button size="sm" color="primary" onClick={props.handelClearClick}>
            Clear All
          </Button>
          <Close ClassName="close" func={props.func} id="close" />
        </div>
      </div>
    </div>
  );
};

const formatTimeDifference = (time: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - time.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes} min`;
  } else if (diffInMinutes < 43200) {
    const days = Math.floor(diffInMinutes / 1440);
    const hours = Math.floor((diffInMinutes % 1440) / 60);
    return `${days}d ${hours}h`;
  } else {
    const months = Math.floor(diffInMinutes / 43200);
    const days = Math.floor((diffInMinutes % 43200) / 1440);
    return `${months}mo ${days}d`;
  }
};

export default function NotificationsBar(props) {
  const [NotificationsElement, setNotificationsElement] = React.useState(users);

  const handelClearClick = () => {
    setNotificationsElement([]);
  };

  const handelDeleteClick = (index) => {
    setNotificationsElement((prev) => prev.filter((_, i) => i !== index));
  };

  const handelConfirmClick = (index) => {
    setNotificationsElement((prev) => prev.filter((_, i) => i !== index));
  };

  const accessToken = document?.cookie
  ?.split("; ")
  ?.find((row) => row.startsWith("access_token="))
  ?.split("=")[1];

  const socketRef = useRef<Socket | null>(null);

  const PATHHH = 'http://localhost:3000/check'


  useEffect(() => {
    console.log("mount hello world");

    const socket = io(PATHHH, {
      transports: ["websocket"],
      auth: { token: accessToken },
    });
  
    socketRef.current = socket;
    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    // socketRef.current.on('onlineFriends', (data) => {
    //   console.log('Received message:', data);
    //   // Handle the received message
    //   // Example: set some state or trigger a notification
    // });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [socketRef]);

  return (
    <div className="NotificationsBar-frame">
      <NotificationsWrapper>
        <Grid
          templateAreas={`"header"
                                        "main"`}
          gridTemplateRows={"62px 1fr 10px"}
          gridTemplateColumns={"365px "}
          h="500px"
          gap="0"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" area={"header"}>
            <NotificationsNavbar
              handelClearClick={handelClearClick}
              func={props.func}
            />
          </GridItem>

          <GridItem pl="2" h="full" area={"main"}>
            <ScrollShadow
              size={20}
              hideScrollBar
              className="w-[356px] h-[435px]"
            >
              {NotificationsElement.map((user, index) => {
                const formattedTime = formatTimeDifference(user.time);

                if (user.type === "ImessagesNotifications") {
                  return (
                    <ImessagesNotifications
                      key={index}
                      name={user.name}
                      avatar={user.avatar}
                      time={formattedTime}
                    />
                  );
                } else {
                  return (
                    <FriendNotifications
                      deleteButton={() => handelDeleteClick(index)}
                      confirmButton={() => handelConfirmClick(index)}
                      key={index}
                      name={user.name}
                      avatar={user.avatar}
                      time={formattedTime}
                    />
                  );
                }
              })}
            </ScrollShadow>
          </GridItem>
        </Grid>
      </NotificationsWrapper>
    </div>
  );
}
