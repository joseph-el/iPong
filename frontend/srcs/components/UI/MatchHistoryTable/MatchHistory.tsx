import React from "react";
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
import { columns } from "./data";
import { ScrollShadow } from "@nextui-org/react";
import "./MatchHistory.css";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
const INITIAL_VISIBLE_COLUMNS = ["Versus Player", "iCoins", "RESULTS", "DATE"];
import api from "../../../api/posts";
import {formatTimeDifference} from "../NotificationsBar/NotificationsBar"
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

export default function App({ UserId}) {
  const visibleColumns = INITIAL_VISIBLE_COLUMNS;
  const [matches, _setMatches] = useState([]);
  const [filteredItems, setfilteredItems] = useState(matches);
  const [GameMatchHistory, setGameMatchHistory] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await api.get(`/game-history/${UserId}`);
        // TODO: wait for about to set it
        setGameMatchHistory(response.data);
      } catch (error) {
        // console.log("Error fetching data jjj");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchOpponentUsers = async () => {
      const matchesPromises = GameMatchHistory.map(async (match, index) => {
        try {
          const response = await api.get(
            `/user-profile/getinfoById${match.opponentId}`
          );
          return {
            id: index,
            date: formatTimeDifference(match?.createdAt) != "now" ? formatTimeDifference(match?.createdAt) + " ago" : "now",
            result: match.status,
            vbucks: ("+") + (match.status === "win" ?  match.winnerVbucks : match.loserVVbucks),
            versus: response.data.firstName + " " + response.data.lastName,
            avatar: response.data.picture,
            username: response.data.username,
          };
        } catch (error) {
          // console.log("Error fetching data");
          return null; 
        }
      });
      const resolvedMatches = await Promise.all(matchesPromises);
      const validMatches = resolvedMatches.filter((match) => match !== null);
      const reversedMatches = validMatches.reverse();

      _setMatches(reversedMatches);
      setfilteredItems(reversedMatches);
    };

    if (GameMatchHistory.length > 0) {
      fetchOpponentUsers();
    }
  }, [GameMatchHistory]);

  type Match = (typeof matches)[0];

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
        className="h-[280px] History"
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
