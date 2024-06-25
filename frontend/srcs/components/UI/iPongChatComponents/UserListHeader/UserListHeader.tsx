import React from "react";
import "./UserListHeader.css";
import WriteNewMessageIcon from "./write_button.svg";
import SearchInput from "../../Input/SearchInput/SearchInput";
import { Chip } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setFilterType } from "../../../../state/iPongChatState/iPongChatState";
import { useState } from "react";

export default function UserListHeader(props) {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterType = (filterType) => {
    setSelectedFilter(filterType);
    dispatch(setFilterType(filterType));
  };
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
        <Chip
          className="filter-List-buttons-chip"
          onClick={() => handleFilterType("All")}
          color={selectedFilter === "All" ? "primary" : "default"}
        >
          All
        </Chip>
        <Chip
          className="filter-List-buttons-chip"
          onClick={() => handleFilterType("Dm")}
          color={selectedFilter === "Dm" ? "primary" : "default"}
        >
          Users
        </Chip>
        <Chip
          className="filter-List-buttons-chip"
          onClick={() => handleFilterType("Groups")}
          color={selectedFilter === "Groups" ? "primary" : "default"}
        >
          Groups
        </Chip>
      </div>
    </div>
  );
}
