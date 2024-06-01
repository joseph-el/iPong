import React from "react";
import "./UserListHeader.css";
import WriteNewMessageIcon from "./write_button.svg";
import SearchInput from "../../Input/SearchInput/SearchInput";
import { Chip } from "@nextui-org/react";

export default function UserListHeader(props) {
  return (
    <div className="UserListHeader-frame">
      <div className="write-button">
        <img
          onClick={props.ShowCreateNewChat}
          src={WriteNewMessageIcon}
          alt="Write New Message"
          className="write-button-img"
        />
      </div>

      <div className="ipongchat-titile">Messages</div>

      <div className="filter-List-buttons">
        <Chip className="filter-List-buttons-chip">All</Chip>
        <Chip className="filter-List-buttons-chip">Users</Chip>
        <Chip className="filter-List-buttons-chip">Groups</Chip>
      </div>
    </div>
  );
}
