import React from "react";
import "./FriendsInCommon.css";
import { useState } from "react";
import { SearchIcon } from "./SearchIcon";
import { columns, matches } from "./data"; // static data
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  ScrollShadow,
  Button,
  Divider,
  User,
  Image,
} from "@nextui-org/react";

import AddFriendIcon from "../../../pages/iPongProfile/assets/add-friend-icon.svg";
import PenddingIcon from "../../../pages/iPongProfile/assets/penddingicon.svg";
import AlreadyFriendIcon from "../../../pages/iPongProfile/assets/alreadyFriendIcon.svg";

const INITIAL_VISIBLE_COLUMNS = ["FRIEND NAME", "ACTIONS"];
type Match = (typeof matches)[0];

const TopContent = (props) => {
  return (
    <div className="flex flex-col gap-4 MatchHistoryBar">
      <div className="flex  justify-between gap-3 items-end hello  ">
        <Input
          isClearable
          classNames={{
            base: " w-full sm:max-w-[30%] ",
            inputWrapper: " h-[40px] border-1 input-margin",
          }}
          placeholder="Search by username..."
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          variant="bordered"
          onClear={props.onSearchChangesClear}
          onChange={props.onSearchChanges}
        />
      </div>
    </div>
  );
};

function RenderCellComponent({ user, columnKey }) {
  const [showFriendStatus, setShowFriendStatus] = React.useState("Add Friend");
  const handleFriendStatus = () => {
    console.log("Friend Status: ", showFriendStatus);

    if (showFriendStatus == "false" || showFriendStatus == "Friend") {
      setShowFriendStatus("Add Friend");
    } else if (showFriendStatus == "Add Friend") {
      console.log("Friend Request Sent");
      setShowFriendStatus("Pending");
    } else {
      setShowFriendStatus("Friend");
    }
  };

  switch (columnKey) {
    case "friendName":
      return (
        <User
          avatarProps={{ radius: "sm", size: "md", src: user.avatar }}
          classNames={{
            description: "ver",
          }}
          description={"@" + user.username}
          name={"cellValue"}
        >
          {user.email}
        </User>
      );
    case "actions":
      return (
        <Button
          color="primary"
          onClick={handleFriendStatus}
          startContent={
            <Image
              width={"20px"}
              radius="none"
              src={
                showFriendStatus == "Pending"
                  ? PenddingIcon
                  : showFriendStatus == "Add Friend"
                  ? AddFriendIcon
                  : AlreadyFriendIcon
              }
              alt="add-friend-icon"
            />
          }
        >
          {showFriendStatus}
        </Button>
      );
    default:
      return null;
  }
}

export default function FriendsInCommon() {
  const visibleColumns = INITIAL_VISIBLE_COLUMNS;
  const [filteredItems, setfilteredItems] = useState(matches);

  const headerColumns = React.useMemo(() => {
    return columns;
  }, [visibleColumns]);

  const onSearchChanges = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      setfilteredItems(matches);
      return;
    }
    const matchedUsers = matches
      .filter(
        (user) =>
          user.versus.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8);

    setfilteredItems(matchedUsers);
  };

  const onSearchChangesClear = () => {
    setfilteredItems(matches);
  };

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "the-style"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",

        "group-data-[middle=true]:before:rounded-none",

        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <div className="friends-frame">
      <TopContent
        onSearchChanges={onSearchChanges}
        onSearchChangesClear={onSearchChangesClear}
      />

      <div className="friends-header">
        <Table removeWrapper>
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>

      <Divider />

      <ScrollShadow size={10} className=" h-[280px] Friends-Table">
        <Table
          isCompact
          removeWrapper
          bottomContentPlacement="outside"
          classNames={classNames}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                className="header-items"
                key={column.uid}
              ></TableColumn>
            )}
          </TableHeader>

          <TableBody emptyContent={"No users found"} items={filteredItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell className="border-button-row">
                    <RenderCellComponent user={item} columnKey={columnKey} />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollShadow>
    </div>
  );
}

// Path: frontend/srcs/components/UI/FriendsInCommon/data.ts
