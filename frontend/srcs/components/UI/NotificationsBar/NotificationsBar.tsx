import React from "react";
import "./NotificationsBar.css";
import { NotificationsWrapper } from "./NotificationsWrapper";
import { Grid, GridItem } from "@chakra-ui/react";

import Close from "../../UI/Button/CloseButton/CloseButton";
import { Button } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";

import ImessagesNotifications from "../iMessagesNotifications/iMessagesNotifications";
import { io } from "socket.io-client";
import FriendNotifications from "../FriendNotifications/FriendNotifications";
import JoinRoomNotification from "../JoinRoomNotification/JoinRoomNotification";
// import users from "./data";
import { useDispatch } from "react-redux";
import { UseSelector, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { AppDispatch } from "../../../state/store";
import { useEffect, useState } from "react";
import api from "../../../api/posts";
import {
  addNotification,
  clearNotifications,
  setNotification,
} from "../../../state/Notifications/NotificationsSlice";
import { send } from "process";
import { filter } from "lodash";

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

export const formatTimeDifference = (time: string): string => {
  const now = new Date();
  const past = new Date(time);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);

  if (diffInMinutes < 60) {
    if (diffInMinutes === 0) return "now";
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
  const dispatch = useDispatch<AppDispatch>();

  const _UserId = useSelector((state: RootState) => state.userState.id);
  const NotificationsObject = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const [ClearAll, setClearAll] = useState(false);
  const [FriendshipStatus, setFriendshipStatus] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [NotificationId, setNotificationId] = useState<String | null>(null);

  const handelClearClick = () => {
    setClearAll(true);
    setUserNotifications([]);
  };

  const handelDeleteClick = (UserId, NotifId) => {
    setFriendshipStatus({
      type: "FRIEND_REQUEST",
      option: "SET_CANCEL",
      userId: UserId,
      notifId: NotifId,
    });
  };

  const handelConfirmClick = (UserId, NotifId) => {
    setFriendshipStatus({
      type: "FRIEND_REQUEST",
      option: "MAKE_FRIEND",
      userId: UserId,
      notifId: NotifId,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.delete(
          `/notifications/deleteNotification/${NotificationId}`
        );

        console.log("response.data cleared", response.data);

        const updatedUserNotifications = userNotifications.filter(
          (notification) => notification.NotificationId !== NotificationId
        );
        dispatch(setNotification(updatedUserNotifications));

        setUserNotifications(updatedUserNotifications);
        setNotificationId(null);
      } catch (error) {
        console.error("error: ", error);
      }
    };
    NotificationId != null && fetchData();
  }, [NotificationId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserId = FriendshipStatus?.userId;
        let response;
        if (FriendshipStatus?.option === "MAKE_FRIEND") {


          if (FriendshipStatus?.type === "FRIEND_REQUEST") {
            response = await api.post(`/friendship/accept`, {
              friendId: UserId,
            });
          } else {


            // TODO: Join Room

          console.log("the data response: join room>>>>", FriendshipStatus);

            const response = await api.post(`/chatroom/join`, {
              roomId: FriendshipStatus.RoomId,
              userId: UserId,
              inviterId: FriendshipStatus.senderId,
            });
            
            console.log("response: join room>>>>  ", response);
            

          }

          setNotificationId(FriendshipStatus?.notifId);
          console.log("response: make friend ", response);
        }

        if (FriendshipStatus?.option === "SET_CANCEL") {


          if (FriendshipStatus?.type === "FRIEND_REQUEST") {
            response = await api.post(`/friendship/reject`, {
              friendId: UserId,
            });
          } 
          setNotificationId(FriendshipStatus.notifId);
          console.log("response: reject ", response);
        }
      } catch (error) {}
    };
    FriendshipStatus.length != 0 && fetchData();
  }, [FriendshipStatus]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.delete("/notifications/deleteNotifications");
        console.log("response.data cleared", response.data);
        dispatch(clearNotifications()); // how ican make this object empt
        setUserNotifications([]);
        setClearAll(false);
      } catch (error) {
        console.error("error: ", error);
      }
    };
    ClearAll && fetchData();
  }, [ClearAll]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedNotifications = await Promise.all(
          NotificationsObject.map(async (notif) => {
            console.log("notif:>>>>> ", notif);
            const { senderId, entityType, createdAt, NotificationId, RoomId, receiverId } = notif;

            if (senderId === _UserId) {
              return null;
            }
            try {
              const response = await api.get(
                `/user-profile/getinfoById${senderId}`
              );

              const { firstName, lastName, picture, id } = response.data;

              return {
                receiverId: receiverId,
                RoomId: RoomId,
                NotificationId,
                senderId,
                firstName,
                lastName,
                picture,
                entityType,
                createdAt,
              };
            } catch (error) {
              console.error(
                `Failed to fetch data for senderId: ${senderId}`,
                error
              );
              return null;
            }
          })
        );
        const filteredNotifications = updatedNotifications.filter(Boolean);
        filteredNotifications.reverse();
        const dd = filteredNotifications.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setUserNotifications(dd);
      } catch (error) {
        console.error("error: ", error);
      }
    };
    NotificationsObject && NotificationsObject.length > 0 && fetchData();
  }, [NotificationsObject]);

  const handelDeleteJoinRoomClick = (senderId, RoomId, UserId, NotifId) => {
    setFriendshipStatus({
      senderId: senderId,
      RoomId: RoomId,
      type: "JOIN_ROOM",
      option: "SET_CANCEL",
      userId: UserId,
      notifId: NotifId,
    });
  };

  const handelConfirmJoinRoomClick = (senderId, RoomId, UserId, NotifId) => {
    setFriendshipStatus({
      senderId: senderId,
      RoomId: RoomId,
      type: "JOIN_ROOM",
      option: "MAKE_FRIEND",
      userId: UserId,
      notifId: NotifId,
    });
  };

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
              {userNotifications.map((notif, index) => {
                const formattedTime = formatTimeDifference(notif.createdAt);
                if (notif.entityType === "FriendRequestAccepted" || notif.entityType === "MessageSent") {
                  return (
                    <ImessagesNotifications
                      type={notif.entityType}
                      key={index}
                      name={notif.firstName + " " + notif.lastName}
                      avatar={notif.picture}
                      time={formattedTime}
                    />
                  );
                } else if (notif.entityType === "JoinRoom") {
                  console.error("notif: LOL >>>>>> ", notif);
                  return (
                    <JoinRoomNotification
                      deleteButton={() => {
                        handelDeleteJoinRoomClick(
                          notif.senderId,
                          notif.RoomId,
                          notif.receiverId,
                          notif.NotificationId
                        );
                      }}
                      confirmButton={() => {
                        handelConfirmJoinRoomClick(
                          notif.senderId,
                          notif.RoomId,
                          notif.receiverId,
                          notif.NotificationId
                        );
                      }}
                      title={"Join Room"}
                      description={"Ask you to Join Room"}
                      key={index}
                      name={notif.firstName + " " + notif.lastName}
                      RoomId={notif.RoomId}
                      avatar={notif.picture}
                      time={formattedTime}
                    />
                  );

                } else if (notif.entityType === "FriendRequest") {
                  return (
                    <FriendNotifications
                      deleteButton={() => {
                        handelDeleteClick(notif.senderId, notif.NotificationId);
                      }}
                      confirmButton={() => {
                        handelConfirmClick(
                          notif.senderId,
                          notif.NotificationId
                        );
                      }}
                      title={"Friend Request"}
                      description={"sent you a Friend Request"}
                      key={index}
                      name={notif.firstName + " " + notif.lastName}
                      avatar={notif.picture}
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

/*

                else {
                  return (
                    <FriendNotifications
                      deleteButton={() => {
                        if (notif.entityType === "JoinRoom") {
                          handelDeleteJoinRoomClick(
                            notif.senderId,
                            notif.NotificationId
                          );
                        } else
                          handelDeleteClick(
                            notif.senderId,
                            notif.NotificationId
                          );
                      }}
                      confirmButton={() => {
                        if (notif.entityType === "JoinRoom") {
                          handelConfirmJoinRoomClick(
                            notif.senderId,
                            notif.NotificationId
                          );
                        } else
                          handelConfirmClick(
                            notif.senderId,
                            notif.NotificationId
                          );
                      }}
                      title={
                        notif.entityType === "JoinRoom"
                          ? "Join Room"
                          : "Friend Request"
                      }
                      description={
                        notif.entityType === "JoinRoom"
                          ? "Ask you to Join Room"
                          : "sent you a Friend Request"
                      }
                      key={index}
                      name={notif.firstName + " " + notif.lastName}
                      avatar={notif.picture}
                      time={formattedTime}
                    />
                  );
                }



*/
