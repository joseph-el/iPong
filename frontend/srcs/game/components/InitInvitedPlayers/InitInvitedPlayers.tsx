import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { PATHS } from "../../../game/constants/paths";
import { SOCKET_EVENTS } from "../../../game/constants/socketEvents";
import { ERROR, STATE } from "../../../game/constants/errors";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { SKIN_DB } from "../../../pages/iPongStore/db/skins.db";
import { BOARDS_DB } from "../../../pages/iPongStore/db/board.db";
import { GameState } from "../../../game/types/GameState";
import ErrorConnection from "../../../game/components/ConnectionError/ConnectionError";
import LiveMode from "../../../game/components/LiveMode/LiveMode";
import "./InitInvitedPlayers.css";

const accessToken = document?.cookie
  ?.split("; ")
  ?.find((row) => row.startsWith("access_token="))
  ?.split("=")[1];

const userSelectedSkin = "";

interface InvitedPlayersProps {
  inviteId: string | null;
}

export default function InitInvitedPlayers({ inviteId }: InvitedPlayersProps) {
  const socketRef = useRef<Socket | null>(null);
  const [matchStatus, setMatchStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [opponentSkin, setOpponentSkin] = useState<string>(userSelectedSkin);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerPos, setPlayerPos] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  /* Loading Skins */
  const UserInfo = useSelector((state: RootState) => state.userState);
  const userSelectedSkinPath = SKIN_DB.find(
    (skin) => skin.name === UserInfo.userSelectedSkinPath
  )?.imgPath;
  const userSelectedBoardPath = BOARDS_DB.find(
    (board) => board.name === UserInfo.userSelectedBoardPath
  )?.imgPath;

  useEffect(() => {
    console.log("mounted (InitInvitedPlayers)");
    return () => {
      console.log("unmounted (InitInvitedPlayers)");
    };
  });

  useEffect(() => {
    if (!accessToken) {
      setError("could not parse access_token from cookie");
    }

    const liveGameSocket = io(PATHS.BACKEND_GAME_PATH, {
      transports: ["websocket"],
      auth: { token: accessToken },
    });
    socketRef.current = liveGameSocket;

    socketRef.current?.on(SOCKET_EVENTS.CONNECTION_SETUP_COMPLETE, () => {
      console.log(STATE.CONNECTING_SUCCESS);
      socketRef.current?.emit("comingFromInvite", {
        inviteId,
        userSelectedSkinPath,
      });
    });

    socketRef.current?.on(
      SOCKET_EVENTS.MATCH_CANCELED_BEFORE_STARTING,
      (data: { message?: string }) => {
        setMatchStatus("matchCanceled");
        setError(ERROR.DISCONNECTION);
        if (data.message) {
          console.log(`${STATE.MATCH_CANCELLED} because: ${data.message}`);
        }
        cleanUpSocket();
      }
    );

    socketRef.current?.on(
      SOCKET_EVENTS.UPDATING_YOUR_STATUS,
      (data: { status: string }) => {
        console.log(`${STATE.UPDATING_STATUS} :${data.status}`);
      }
    );
    socketRef.current?.on("notEnoughPlayersInThisInvite", () => {
      console.log("not enough player in this room");
    });

    socketRef.current?.on(
      SOCKET_EVENTS.INVALID_TOKEN,
      (error: { message: string }) => {
        setError(error.message);
        cleanUpSocket();
      }
    );
    socketRef.current?.on(
      SOCKET_EVENTS.SERVER_RECOGNITION_ERROR,
      (error: { message: string }) => {
        setError(error.message);
        cleanUpSocket();
      }
    );
    socketRef.current?.on(SOCKET_EVENTS.USER_NOT_FOUND, () => {
      setError(ERROR.USER_NOT_FOUND);
      cleanUpSocket();
    });
    socketRef.current?.on(SOCKET_EVENTS.STATUS_VERIFIED, () => {
      console.log(STATE.STATUS_VERIFIED);
    });
    socketRef.current?.on(
      SOCKET_EVENTS.UPDATING_YOUR_STATUS,
      (data: { status: string }) => {
        console.log(`${STATE.UPDATING_STATUS} :${data.status}`);
      }
    );
    socketRef.current?.on(
      SOCKET_EVENTS.CONNECT_ERROR,
      (error: { message: string }) => {
        setError(error.message);
        cleanUpSocket();
      }
    );
    socketRef.current?.on(
      SOCKET_EVENTS.CONNECTION_SETUP_FAILED,
      (error: { message: string }) => {
        console.error(ERROR.FAILED_CONNECTING);
        setError(error.message);
        cleanUpSocket();
      }
    );
    socketRef.current?.on(
      SOCKET_EVENTS.UNINITIALIZED_CONNECTION,
      (error: { message: string }) => {
        console.error(ERROR.NO_INIT_CONNECTION);
        setError(error.message);
        cleanUpSocket();
      }
    );
    socketRef.current?.on(SOCKET_EVENTS.CONNECT, () => {
      console.log(STATE.CONNECTING_TO_SERVER);
    });
    socketRef.current?.on(
      SOCKET_EVENTS.MATCH_FOUND,
      (data: {
        opponentId: string;
        opponentUserName: string;
        opponentSkinPath: string;
      }) => {
        console.log(`${STATE.MATCH_FOUND}: ${data.opponentUserName}`);
        setOpponentId(data.opponentId);
        setOpponent(data.opponentUserName);
        setOpponentSkin(data.opponentSkinPath);
      }
    );
    socketRef.current?.on(
      SOCKET_EVENTS.INITIALIZED_GAME,
      (data: {
        roomId: string;
        playerPos: number;
        initGameState: GameState;
      }) => {
        console.log("SOCKET_EVENTS.INITIALIZED_GAME");
        setRoomId(data.roomId);
        setPlayerPos(data.playerPos);
        setGameState(data.initGameState);
        setMatchStatus("liveGame");
      }
    );

    socketRef.current?.on("YouAreNotInvited", () => {
      setError("not invited to join this game");
    });

    return () => {
      cleanUpSocket();
    };
  }, []);

  const cleanUpSocket = () => {
    if (socketRef.current) {
      socketRef.current.off();
      socketRef.current.disconnect();
    }
  };

  if (matchStatus === "matchCanceled") {
    if (!error) return;
    return (
      <div className="container">
        <ErrorConnection reason={error} />
      </div>
    );
  }

  if (matchStatus === "liveGame") {
    if (socketRef && opponent && roomId && playerPos && gameState) {
      return (
        <LiveMode
          socketRef={socketRef}
          opponent={opponent}
          opponentId={opponentId}
          opponentSkinPath={opponentSkin}
          userSkinPath={userSelectedSkinPath}
          selectedBoardPath={userSelectedBoardPath}
          roomId={roomId}
          playerPos={playerPos}
          gameData={gameState}
        />
      );
    }
  }

  if (error) {
    return (
      <div className="container">
        <ErrorConnection reason={error} />
      </div>
    );
  }

  return <div className="container">{}</div>;
}
