/*
{
        "id": "31e08d35-bcc4-42f2-a69c-3d3e1d240db7", // Game ID
        "Player1": "53c16ee0-09cb-4847-9661-80a67eedac93", // Player 1 ID
        "Player2": "bded4240-0eee-429b-8f91-720a24a856ae", // Player 2 ID
        "createdAt": "2024-06-15T12:32:17.514Z", // Game creation date
        "winner": null, // Winner ID
        "status": "ONGOING" // Game status
}
*/

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
import { SearchIcon } from "../MatchHistoryTable/SearchIcon";

import { ScrollShadow } from "@nextui-org/react";
// import "./MatchHistory.css";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import api from "../../../api/posts";

import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useNavigate } from "react-router-dom";
import {formatTimeDifference} from "../NotificationsBar/NotificationsBar";

const INITIAL_VISIBLE_COLUMNS = [
  "Player A",
  "Player B",
  "Game Status",
  "Winner",
  "createdAt",
];

const columns = [
  { name: "Player A", uid: "playerA", sortable: true },
  { name: "Player B", uid: "playerB", sortable: true },
  { name: "Game Status", uid: "status", sortable: true },
  { name: "Winner", uid: "winner", sortable: true },
  { name: "createdAt", uid: "createdAt", sortable: true },
];

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

export function LeaderBoard() {
  const visibleColumns = INITIAL_VISIBLE_COLUMNS;
  const [matches, _setMatches] = useState([]);
  const [filteredItems, setfilteredItems] = useState(matches);
  const [GameMatchHistory, setGameMatchHistory] = useState([]);
  const UpdateApp = useSelector((state: RootState) => state.update.update);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`game-history/allGames`);

        setGameMatchHistory(response.data);
      } catch (error) {
      }
    };
    fetchData();
  }, [UpdateApp]);

  useEffect(() => {
    const fetchOpponentUsers = async () => {
      const matchesPromises = GameMatchHistory.map(async (match, index) => {
        try {
          const PlayerA = await api.get(
            `/user-profile/getinfoById${match.Player1}`
          );

          const PlayerB = await api.get(
            `/user-profile/getinfoById${match.Player2}`
          );

          return {
            id: index,
            PlayerA_Id: match.Player1,
            PlayerA_Name: PlayerA.data.firstName + " " + PlayerA.data.lastName,
            PlayerA_Avatar: PlayerA.data.picture,
            PlayerA_Username: PlayerA.data.username,
            PlayerB_Id: match.Player2,
            PlayerB_Name: PlayerB.data.firstName + " " + PlayerB.data.lastName,
            PlayerB_Avatar: PlayerB.data.picture,
            PlayerB_Username: PlayerB.data.username,

            MatchStatus: match?.status,
            Winner:
              match?.winner === match.Player1
                ? PlayerA.data.username
                : match?.winner === match.Player2
                ? PlayerB.data.username
                : null,
            createdAt:  formatTimeDifference(match?.createdAt) != "now" ? formatTimeDifference(match?.createdAt) + " ago" : "now",
          };
          /*
          const response = await api.get(
            `/user-profile/getinfoById${match.opponentId}`
          );

          return {
            id: index,
            date: match.createdAt,
            result: match.status,
            vbucks:
              "+" +
              (match.status === "win"
                ? match.winnerVbucks
                : match.loserVVbucks),

            versus: response.data.firstName + " " + response.data.lastName,
            avatar: response.data.picture,
            username: response.data.username,
          };*/
        } catch (error) {
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
          user.PlayerA_Name.toLowerCase().includes(searchTerm) ||
          user.PlayerA_Username.toLowerCase().includes(searchTerm) ||
          user.PlayerB_Name.toLowerCase().includes(searchTerm) ||
          user.PlayerB_Username.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8);

    setfilteredItems(matchedUsers);
  };

  const onSearchChangesClear = () => {
    setfilteredItems(matches);
  };

  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  const renderCell = React.useCallback((user: Match, columnKey: React.Key, windowWidth: number) => {

    const cellValue = user[columnKey as keyof Match];

    switch (columnKey) {
      case "playerA":
        console.log("leaderboard : user", user);
        return (
          <User
            onClick={() => {
              navigate(`/ipong/users/${user.PlayerA_Id}`);
            }}
            avatarProps={{ radius: "sm", size: "md", src: user.PlayerA_Avatar }}
            className="hover:cursor-pointer"
            classNames={{
              description: "ver",
            }}
            description={windowWidth < 800 ? "" : "@" + user.PlayerA_Username}
            name={windowWidth < 1070 ? "" : user.PlayerA_Name}
          />
        );

      case "playerB":
        return (
          <User
            onClick={() => {
              navigate(`/ipong/users/${user.PlayerB_Id}`);
            }}
            avatarProps={{ radius: "sm", size: "md", src: user.PlayerB_Avatar }}
            classNames={{
              description: "ver",
            }}
            className="hover:cursor-pointer"
            description={windowWidth < 800 ? "" : "@" + user.PlayerB_Username}
            name={windowWidth < 1070 ? "" : user.PlayerB_Name}
          />
        );

      case "status":
        return (
          <div
            className={
              user.MatchStatus !== "loss"
                ? "success-text-result"
                : "danger-text-result"
            }
          >
            {user.MatchStatus}
          </div>
        );
      case "winner":
        return (
          <div
            className={
              user.Winner !== null
                ? "success-text-result"
                : "danger-text-result"
            }
          >
            {user.Winner !== null ? user.Winner : "-"}
          </div>
        );

      case "createdAt":
        return <div className="vbucks-text date-position">{cellValue}</div>;
    }
  }, [navigate]);

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
                    {renderCell(item, columnKey, windowWidth)}
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
