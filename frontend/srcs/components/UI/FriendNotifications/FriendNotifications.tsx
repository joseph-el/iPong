import React from "react";
import "./FriendNotifications.css";
import { FriendNotificationsWrapper } from "./FriendNotificationsWrapper";
import { User } from "@nextui-org/react";

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
          Confirm
        </div>
      </div>
    </div>
  );
};

export default function FriendNotifications(props) {
  console.log(props);

  return (
    <div className="FriendNotifications-frame">
      <FriendNotificationsWrapper>
        <div className="wrapper-style-request">
          <div className="FriendNotifications-content">
            <User
              className="FriendNotifications-user-widget"
              name={props.title}
              description={props.name + " " + props.description }
              avatarProps={{
                src: props.avatar,
              }}
            />
            <div className="FriendNotifications-time">{props.time}</div>
          </div>
        </div>
        <Actions
          confirmButton={props.confirmButton}
          deleteButton={props.deleteButton}
        />
      </FriendNotificationsWrapper>
    </div>
  );
}
