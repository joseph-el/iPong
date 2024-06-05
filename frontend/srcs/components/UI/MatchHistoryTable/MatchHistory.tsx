import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  User,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { columns, matches } from "./data";
import { ScrollShadow } from "@nextui-org/react";
import "./MatchHistory.css";

import { Divider } from "@nextui-org/react";
const INITIAL_VISIBLE_COLUMNS = ["Versus Player", "V-BUCKS", "RESULTS", "DATE"];
import { useState } from "react";
import api from "../../../api/posts";

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

export default function App() {
  const visibleColumns = INITIAL_VISIBLE_COLUMNS;
  const [filteredItems, setfilteredItems] = useState([]);

  const [GameMatchHistory, setGameMatchHistory] = useState([]);

  // GET the data from abdo the backend

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("/game-history");
          setGameMatchHistory(response.data);

        } catch (error) {
          console.log("Error fetching data");
        }
      }
      fetchData();
  }, []);
  console.log(GameMatchHistory);

  // Now map on GameMatchHistory and set an array of matches
  const [matches, setMatches] = useState([]);


  useEffect(() => {
    const test = async () => {
      try {
        //"
        const response = await api.get( `/user-profile/me` );
        // setGameMatchHistory(response.data);
        console.log("done: ")
        console.log(response);
      } catch (error) {
        console.log("Error fetching data");
      }
    }
    test();

  }, []);
























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

  const renderCell = React.useCallback((user: Match, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Match];

    switch (columnKey) {
      case "versus":
        return (
          <User
            avatarProps={{ radius: "sm", size: "md", src: user.avatar }}
            classNames={{
              description: "ver",
            }}
            description={"@" + user.username}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "vbucks":
        return (
          <div className="flex flex-col">
            <p className="vbucks-text">{cellValue}</p>
          </div>
        );
      case "result":
        return (
          <div
            className={
              cellValue !== "loss"
                ? "success-text-result"
                : "danger-text-result"
            }
          >
            {cellValue}
          </div>
        );
      case "date":
        return <div className="vbucks-text date-position">{cellValue}</div>;
      default:
        return cellValue;
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
    <div className="match-history-frame">
      <TopContent
        onSearchChanges={onSearchChanges}
        onSearchChangesClear={onSearchChangesClear}
      />

      <Table removeWrapper>
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody></TableBody>
      </Table>

      <Divider />

      <ScrollShadow
        // h-[200px] sm:h-[200px]  md:h-[200px]   lg:h-[200px]   xm:h-[200px]  2xl:h-[300px]
        size={10}
        className=" h-[280px] History"
      >
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
