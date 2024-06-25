import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  useDisclosure,
  Button,
  User,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { columns } from "./data";
import { ScrollShadow } from "@nextui-org/react";
import "./BlockedTable.css";
import IPongAlert from "../iPongAlert/iPongAlert";

import { Divider } from "@nextui-org/react";
const INITIAL_VISIBLE_COLUMNS = ["BLOCKED FRIEND", "UNBLOCK"];
import { useState, useEffect } from "react";
import api from "../../../api/posts";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
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

export default function BlockedTable() {
  const [userId, setUserId] = useState("");

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

  const AlertProps = (username) => {
    return [
      {},
      {
        UserAlertHeader: `Are You Sure You Want to Unblock ${username} ?`,
        UserAlertMessage: `Are you sure you want to unblock ${username} ? You will be able to see their content and interact with them again.`,
        UserOptions: "Unblock",
      },
    ];
  };

  const [showAlert, setShowAlert] = useState(AlertProps("")[0]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handelAlert = (userName) => {
    setShowAlert(AlertProps(userName)[1]);

    onOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`friendship/blockingList/`);

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

  type Match = (typeof friends)[0];
  const [UnblockUser, setUnblockUser] = useState("");
  useEffect(() => {
    const handelRemoveUser = async () => {
      if (userId === "") return;
      await api.post(`/friendship/unblock`, {
        friendId: userId,
      });
      setUserId("");
    };
    handelRemoveUser();
  }, [UnblockUser, ]);

  const renderCell = React.useCallback((user: Match, columnKey: React.Key) => {
    switch (columnKey) {
      case "blockedfriend":
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
      case "unblock":
        return (
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              handelAlert(user.username);
              setUserId(user.userId);
            }}
          >
            Unblock
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

  return (
    <div className="friends-frame">
      <TopContent
        onSearchChanges={onSearchChanges}
        onSearchChangesClear={onSearchChangesClear}
      />

      <IPongAlert
        handelRemoveUser={() => setUnblockUser("unblock")}
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
