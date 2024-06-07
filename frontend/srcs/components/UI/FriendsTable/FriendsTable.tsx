import React from "react";
import "./FriendsTable.css";
import { useState, useEffect } from "react";
import { SearchIcon } from "./SearchIcon";
import { columns, matches } from "./data"; // static data
import IPongAlert from "../iPongAlert/iPongAlert";
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
  useDisclosure,
} from "@nextui-org/react";
import api from "../../../api/posts";

const INITIAL_VISIBLE_COLUMNS = ["FRIEND NAME", "UNFRIEND", "BLOCK"];

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

export default function FriendsTable() {
  const AlertProps = (username) => {
    return [
      {},
      {
        UserAlertHeader: `Are You Sure You Want to Unfriend ${username} ?`,
        UserAlertMessage: `Do you really want to remove  ${username}  from your friends list?`,
        UserOptions: "Unfriend",
      },
      {
        UserAlertHeader: `Are You Sure You Want to Block ${username} ?`,
        UserAlertMessage: `Are you sure you want to block ${username} ? You will no longer see their content or be able to interact with them.`,
        UserOptions: "Block",
      },
    ];
  };

  const [userId, setUserId] = useState("");

  const [showAlert, setShowAlert] = useState(AlertProps("")[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelAlert = (type, userName) => {
    if (type) {
      setShowAlert(AlertProps(userName)[1]);
    } else {
      setShowAlert(AlertProps(userName)[2]);
    }
    onOpen();
  };

  const visibleColumns = INITIAL_VISIBLE_COLUMNS;
  const [friends, setFriends] = useState([]);
  const [filteredItems, setfilteredItems] = useState([]);

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
    setfilteredItems(friends);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/friendship/`);

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

  type Friend = (typeof friends)[0];

  const renderCell = React.useCallback((user: Friend, columnKey: React.Key) => {
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
      case "block":
        return (
          <Button
            size="sm"
            color="danger"
            className="Friends-button"
            onClick={() => {handelAlert(false, user.username); setUserId(user.userId)}}
          >
            Block
          </Button>
        );
      case "unfriend":
        return (
          <Button
            size="sm"
            color="primary"
            onClick={() => {handelAlert(true, user.username ); setUserId(user.userId)}}
          >
            Unfriend
          </Button>
        );
    }
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

  const [removeUser, setRemoveUser] = useState("");

  useEffect(() => {
    const handelRemoveUser = async () => {
      if (removeUser == "Unfriend") {
        await api.post(`/friendship/unfriend`, {
          friendId: userId,
        });
      }
      if (removeUser == "Block") {
        await api.post(`/friendship/block`, {
          friendId: userId,
        });
      }
      setUserId("");
    };
    handelRemoveUser();
  }, [removeUser]);

  const handelRemoveUser = (type) => {
    if (type) {
      setRemoveUser("Unfriend");
    } else {
      setRemoveUser("Block");
    }
  };

  return (
    <div className="friends-frame">
      <TopContent
        onSearchChanges={onSearchChanges}
        onSearchChangesClear={onSearchChangesClear}
      />

      <div></div>

      <IPongAlert

        handelRemoveUser={() =>
          handelRemoveUser(showAlert.UserOptions === "Unfriend" ? true : false)
        }
        isOpen={isOpen}
        onClose={onClose}
        UserAlertHeader={showAlert.UserAlertHeader}
        UserAlertMessage={showAlert.UserAlertMessage}
        UserOptions={showAlert.UserOptions}
      ></IPongAlert>

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
                    {renderCell(item, columnKey)}
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
