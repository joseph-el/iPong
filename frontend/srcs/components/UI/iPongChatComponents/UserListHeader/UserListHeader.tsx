import React from "react";
import "./UserListHeader.css";
import WriteNewMessageIcon from "./write_button.svg";
import SearchInput from "../../Input/SearchInput/SearchInput";
import { Chip } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setFilterType } from "../../../../state/iPongChatState/iPongChatState";
export default function UserListHeader(props) {
  const dispatch = useDispatch();

  const handleFilterType = (filterType) => {
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
        >
          All
        </Chip>
        <Chip
          className="filter-List-buttons-chip"
          onClick={() => handleFilterType("Dm")}
        >
          Users
        </Chip>
        <Chip
          className="filter-List-buttons-chip"
          onClick={() => handleFilterType("Groups")}
        >
          Groups
        </Chip>
      </div>
    </div>
  );
}
