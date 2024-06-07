import React from "react";
import "./FriendsInCommon.css";
import { useState, useEffect } from "react";
import { SearchIcon } from "./SearchIcon";

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
import { useNavigate } from "react-router-dom";

import AddFriendIcon from "../../../pages/iPongProfile/assets/add-friend-icon.svg";
import PenddingIcon from "../../../pages/iPongProfile/assets/penddingicon.svg";
import AlreadyFriendIcon from "../../../pages/iPongProfile/assets/alreadyFriendIcon.svg";
import api from "../../../api/posts";

import { columns } from "./data"; // static data

const INITIAL_VISIBLE_COLUMNS = ["FRIEND NAME", "ACTIONS"];

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
  const navigate = useNavigate();

  const handleFriendStatus = () => {
    navigate(`/ipong/users/${user.userId}`);
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
          name={user.fullname}
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
              src={AddFriendIcon}
              alt="add-friend-icon"
            />
          }
        >
          See User
        </Button>
      );
    default:
      return null;
  }
}

export default function FriendsInCommon({ UserId }) {
  const visibleColumns = INITIAL_VISIBLE_COLUMNS;

  const [friends, setFriends] = useState([]);

  const [filteredItems, setfilteredItems] = useState([]);

  const headerColumns = React.useMemo(() => {
    return columns;
  }, [visibleColumns]);

  const onSearchChanges = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      setfilteredItems(friends);
      return;
    }
    const matchedUsers = friends
      .filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8);

    setfilteredItems(matchedUsers);
  };

  const onSearchChangesClear = () => {
    setfilteredItems(friends);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/friendship/friendList${UserId}`);

        const friendsList = response.data.map((friend, index) => {
          return {
            userId: friend.userId,
            id: index,
            fullname: friend.firstName + " " + friend.lastName,
            avatar: friend.avatar,
            username: friend.uername,
          };
        });

        setFriends(friendsList);
        setfilteredItems(friendsList);
      } catch (error) {
        // console.log("error get friends list");
      }
    };
    fetchData();
  }, []);

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
