import React from "react";
import "./JoinRoomNotification.css";
import { JoinRoomNotificationsWrapper } from "./JoinRoomNotificationWrapper";
import { User } from "@nextui-org/react";

import { useEffect, useState } from "react";
import api from "../../../api/posts";
export const Actions = (props) => {
  return (
    <div className="actions">
      <div className="alert-item">
        <div className="action" onClick={props.deleteButton}>
          Delete
        </div>
      </div>
      <div className="action-wrapper">
        <div className="text-wrapper" onClick={props.confirmButton}>
          Join
        </div>
      </div>
    </div>
  );
};

export default function JoinRoomNotification(props) {
  const [roomInfo, setRoomInfo] = useState([]);

  useEffect(() => {
    const GetRoomInfo = async () => {
      try {
 

        const response = await api.get(`/chatroom/roomDetails/${props.RoomId}`);


        setRoomInfo(response.data);
      } catch (error) {
      }
    }
    GetRoomInfo();
  }, []);
  return (
    <div className="FriendNotifications-frame">
      <JoinRoomNotificationsWrapper>
        <div className="wrapper-style-request">
          <div className="FriendNotifications-content">
            <User
              name={props.title}
              description={props.name + " " + props.description + " " + roomInfo.roomName}
              avatarProps={{
                src: roomInfo.icon,
              }}
            />
            <div className="FriendNotifications-time">{props.time}</div>
          </div>
        </div>
        <Actions
          confirmButton={props.confirmButton}
          deleteButton={props.deleteButton}
        />
      </JoinRoomNotificationsWrapper>
    </div>
  );
}
