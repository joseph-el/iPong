import React from "react";
import "./FriendNotifications.css";
import { FriendNotificationsWrapper } from "./FriendNotificationsWrapper";
import { User } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import {setUpdateProfile} from "../../../state/update/UpdateSlice";
export const Actions = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="actions">
      <div className="alert-item">
        <div className="action" onClick={
          
          () => {
            props.deleteButton()
            dispatch(setUpdateProfile());
          }
          
          }>
          Delete
        </div>
      </div>

      <div className="action-wrapper">
        <div className="text-wrapper" onClick={
          () => {

            props.confirmButton()
            dispatch(setUpdateProfile());
          }
          }>
          Confirm
        </div>
      </div>
    </div>
  );
};

export default function FriendNotifications(props) {

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
