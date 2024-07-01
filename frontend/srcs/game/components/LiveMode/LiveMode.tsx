import React, { useEffect, useRef, useState } from "react";
import { Player } from "../../entities/PlayerDS";
import { Ball } from "../../entities/BallDS";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "../../constants/socketEvents";
import { GAME_SETTING } from "../../constants/settings";
import { GameState } from "../../types/GameState";
import ProgressBar from "../ProgressBar/ProgressBar";
import _debounce from "lodash/debounce";
// import "../BotMode/BotMode.css";
import IPongGameNav from "../IPongGameNav/IPongGameNav";
import Scores from "../Score/Score";
import { BallState } from "../../types/BallState";
import CancelledMatch from "../CancelledMatch/CancelledMatch";
import GameOver from "../GameOver/GameOver";
import { Grid, GridItem } from "@chakra-ui/react";
import { BOARDS_DB } from "../../../pages/iPongStore/db/board.db";
import { MIRROR_SKIN_DB } from "../../../pages/iPongStore/db/mirror.db";
import { RootState } from "../../../state/store";
import { useSelector } from "react-redux";
import { Tooltip, Button, user } from "@nextui-org/react";
import { get } from "lodash";
import { SKIN_DB } from "../../../pages/iPongStore/db/skins.db";

interface LiveGameModeProps {
  socketRef: React.MutableRefObject<Socket | null>;
  opponent: string;
  opponentId: string | null;
  opponentSkinPath: string;
  userSkinPath: string;
  selectedBoardPath: string;
  roomId: string;
  playerPos: number;
  gameData: GameState;
}

export default function LiveMode({
  socketRef,
  opponent,
  opponentId,
  opponentSkinPath,
  userSkinPath,
  selectedBoardPath,
  roomId,
  playerPos,
  gameData,
}: LiveGameModeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const socket = useRef<Socket | null>(socketRef.current);
  const [endedGame, setEndedGame] = useState(false);
  const [cancelledGame, setCancelledGame] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [winnerXp, setWinnerXp] = useState<number>(0);
  const [loserXp, setLoserXp] = useState<number>(0);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);

  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);

  const netImgRef = useRef<HTMLImageElement | null>(null);
  const [isNetImgLoaded, setIsNetImageLoaded] = useState(false);

  const userSkinImgRef = useRef<HTMLImageElement | null>(null);
  const [isUserSkinImgLoaded, setIsUserSkinImgLoaded] = useState(false);

  const OpponentSkinImgRef = useRef<HTMLImageElement | null>(null);
  const [isOpponentSkinImgLoaded, setIsOpponentSkinImgLoaded] = useState(false);

  const hitSoundRef = useRef<HTMLAudioElement | null>(null);
  const [isHitSoundLoaded, setIsHitSoundLoaded] = useState(false);

  const scoringSoundRef = useRef<HTMLAudioElement | null>(null);
  const [isScoringSoundLoaded, setIsScoringSoundLoaded] = useState(false);

  const UserInfo = useSelector((state: RootState) => state.userState);
  const userSelectedBoardPath = BOARDS_DB.find(
    (board) => board.name === UserInfo.userSelectedBoardPath
  )?.imgPath;

  function getMirrorPaddle(paddlePath: string): string {
    const paddlesName = SKIN_DB.find(
      (skin) => skin.imgPath === paddlePath
    )?.name;
    const mirrorPaddlePath = MIRROR_SKIN_DB.find(
      (skin) => skin.name === paddlesName
    )?.imgPath;
    return mirrorPaddlePath || "";
  }

  useEffect(() => {
    console.log("username:", UserInfo.username);
    console.log("playerPos of ", playerPos);
    if (playerPos === 2) {
      userSkinPath = getMirrorPaddle(userSkinPath);
      console.log("userSkinPath: updated: ", userSkinPath);
    } else {
      opponentSkinPath = getMirrorPaddle(opponentSkinPath);
      console.log("opponentSkinPath: updated: ", opponentSkinPath);
    }
  }, [playerPos]);

  /* reduce user Spam keyboard */
  const debouncedMovePlayer = useRef(
    _debounce((direction: string) => {
      if (!socket.current) return;
      socket.current.emit("movePlayer", {
        roomId: roomId,
        player: playerPos,
        direction: direction,
      });
    }, GAME_SETTING.EMIT_MOVE_LIMIT)
  ).current;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!socket.current) return;
    switch (e.code) {
      case "ArrowUp":
        debouncedMovePlayer("up");
        break;
      case "ArrowDown":
        debouncedMovePlayer("down");
        break;
    }
  };

  /* Load Assets */
  useEffect(() => {
    // Load assets
    const bgImage = new Image();
    bgImage.onload = () => setIsBgImageLoaded(true);
    bgImage.onerror = () => setIsBgImageLoaded(false);
    bgImage.src = selectedBoardPath;
    bgImageRef.current = bgImage;

    // net Image
    const netImg = new Image();
    netImg.onload = () => setIsNetImageLoaded(true);
    netImg.onerror = () => setIsNetImageLoaded(false);
    netImg.src = GAME_SETTING.NET_IMG_PATH;
    netImgRef.current = netImg;

    const userSkinImg = new Image();
    userSkinImg.onload = () => setIsUserSkinImgLoaded(true);
    userSkinImg.onerror = () => setIsUserSkinImgLoaded(false);
    userSkinImg.src = userSkinPath;
    userSkinImgRef.current = userSkinImg;

    const opponentSkinImg = new Image();
    opponentSkinImg.onload = () => setIsOpponentSkinImgLoaded(true);
    opponentSkinImg.onerror = () => setIsUserSkinImgLoaded(false);
    opponentSkinImg.src = opponentSkinPath;
    OpponentSkinImgRef.current = opponentSkinImg;

    const hitSound = new Audio();
    hitSound.oncanplaythrough = () => setIsHitSoundLoaded(true);
    hitSound.src = GAME_SETTING.HIT_BALL_SOUND;
    hitSoundRef.current = hitSound;

    const scoringSound = new Audio();
    scoringSound.oncanplaythrough = () => setIsScoringSoundLoaded(true);
    scoringSound.src = GAME_SETTING.SCORE_SOUND;
    scoringSoundRef.current = scoringSound;

    return () => {
      if (bgImageRef.current) {
        bgImageRef.current.src = "";
        bgImageRef.current = null;
      }
      if (netImgRef.current) {
        netImgRef.current.src = "";
        netImgRef.current = null;
      }
      if (userSkinImgRef.current) {
        userSkinImgRef.current.src = "";
        userSkinImgRef.current = null;
      }
      if (OpponentSkinImgRef.current) {
        OpponentSkinImgRef.current.src = "";
        OpponentSkinImgRef.current = null;
      }
      if (hitSoundRef.current && !hitSoundRef.current.paused) {
        hitSoundRef.current.pause();
        hitSoundRef.current.currentTime = 0;
      }
      hitSoundRef.current = null;
      if (scoringSoundRef.current && !scoringSoundRef.current.paused) {
        scoringSoundRef.current.pause();
        scoringSoundRef.current.currentTime = 0;
      }
      scoringSoundRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (
      isScoringSoundLoaded &&
      scoringSoundRef.current &&
      scoringSoundRef.current.readyState === 4
    ) {
      scoringSoundRef.current.pause();
      scoringSoundRef.current.currentTime = 0;
      scoringSoundRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player1Score, player2Score]);

  /* Timer... */
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    startTimer();

    function startTimer() {
      if (gameStarted) return;
      let timerValue = 3;
      timerInterval = setInterval(() => {
        if (cancelledGame) {
          if (timerInterval) {
            clearInterval(timerInterval);
          }
          return;
        }
        if (timerValue === 0) {
          if (timerInterval) {
            clearInterval(timerInterval);
          }
          setGameStarted(true);
        } else {
          gradualProgressUpdate();
          timerValue--;
        }
      }, 1000);
    }

    socket.current?.on(
      SOCKET_EVENTS.OPPONENT_DISCONNECT,
      (data: { message?: string }) => {
        setCancelledGame(true);
        if (data.message) {
          console.log(`opponentDisconnected: ${data.message}`);
        }
        socket.current?.disconnect();
      }
    );
    socket.current?.on(SOCKET_EVENTS.CONNECT_ERROR, (error: string) => {
      console.log("Connect error:", error);
    });
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [cancelledGame, gameStarted]);

  /* Live Game */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isGameRunning = false;

    let player1 = new Player(0, (canvas.height - 100) / 2, 10, 100, 0, "white");
    let player2 = new Player(
      canvas.width - 10,
      (canvas.height - 100) / 2,
      10,
      100,
      0,
      "white"
    );
    let ball = new Ball(canvas.width / 2, canvas.height / 2, 10, "white");

    if (gameStarted) {
      initGame(gameData);
    }

    function initGame(data: GameState) {
      document.addEventListener("keydown", handleKeyDown);
      isGameRunning = true;
      player1 = new Player(
        data.player1.x,
        data.player1.y,
        data.player1.w,
        data.player1.h,
        data.player1.score,
        "white"
      );
      player2 = new Player(
        data.player2.x,
        data.player2.y,
        data.player2.w,
        data.player2.h,
        data.player2.score,
        "white"
      );
      ball = new Ball(data.ball.x, data.ball.y, data.ball.r, "white");
      draw();
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isBgImageLoaded && bgImageRef.current) {
        ctx.drawImage(bgImageRef.current, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "BLACK";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      if (isNetImgLoaded && netImgRef.current) {
        const netX = (canvas.width - GAME_SETTING.NET_WIDTH) / 2;
        const netY = (canvas.height - GAME_SETTING.NET_HEIGHT) / 2;
        ctx.drawImage(
          netImgRef.current,
          netX,
          netY,
          GAME_SETTING.NET_WIDTH,
          GAME_SETTING.NET_HEIGHT
        );
      } else {
        drawNet(ctx, canvas.height, canvas.width);
      }

      if (playerPos === 1) {
        if (isUserSkinImgLoaded && userSkinImgRef.current) {
          ctx.drawImage(
            userSkinImgRef.current,
            player1!.x,
            player1!.y,
            player1!.width,
            player1!.height
          );
        } else {
          player1.drawPlayer(ctx);
        }
        if (isOpponentSkinImgLoaded && OpponentSkinImgRef.current) {
          ctx.drawImage(
            OpponentSkinImgRef.current,
            player2!.x,
            player2!.y,
            player2!.width,
            player2!.height
          );
        } else {
          player2.drawPlayer(ctx);
        }
      } else {
        if (isOpponentSkinImgLoaded && OpponentSkinImgRef.current) {
          ctx.drawImage(
            OpponentSkinImgRef.current,
            player1!.x,
            player1!.y,
            player1!.width,
            player1!.height
          );
        } else {
          player1.drawPlayer(ctx);
        }
        if (isUserSkinImgLoaded && userSkinImgRef.current) {
          ctx.drawImage(
            userSkinImgRef.current,
            player2!.x,
            player2!.y,
            player2!.width,
            player2!.height
          );
        } else {
          player2.drawPlayer(ctx);
        }
      }
      ball.drawBall(ctx);
    }

    socket.current?.on(SOCKET_EVENTS.ENDING_GAME, () => {
      isGameRunning = false;
      console.log("ending game...");
      document.removeEventListener("keydown", handleKeyDown);
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });

    socket.current?.on(
      SOCKET_EVENTS.GAME_END,
      (data: {
        winnerUserName: string;
        winnerId: string;
        winnerXp: number;
        loserUserXp: number;
      }) => {
        if (data.winnerUserName) {
          setWinner(data.winnerUserName);
          setWinnerId(data.winnerId);
          setWinnerXp(data.winnerXp);
          setLoserXp(data.loserUserXp);
        }
        setEndedGame(true);
      }
    );

    socket.current?.on(SOCKET_EVENTS.GAME_UPDATES, (gameState: GameState) => {
      if (isGameRunning) {
        player1.y = gameState.player1.y;
        player2.y = gameState.player2.y;
        if (player1.score !== gameState.player1.score) {
          setPlayer1Score(gameState.player1.score);
        }
        if (player2.score !== gameState.player2.score) {
          setPlayer2Score(gameState.player2.score);
        }
        player1.score = gameState.player1.score;
        player2.score = gameState.player2.score;
        ball.x = gameState.ball.x;
        ball.y = gameState.ball.y;
        draw();
        drawBallTrail(ctx, gameState.ball);
      }
    });

    socket.current?.on(SOCKET_EVENTS.CONNECT_ERROR, (error: string) => {
      console.log("Connect error:", error);
    });

    socket.current?.on(
      SOCKET_EVENTS.OPPONENT_DISCONNECT,
      (data: { message?: string }) => {
        setCancelledGame(true);
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (data.message) {
          console.log(`opponentDisconnected: ${data.message}`);
        }
        socket.current?.disconnect();
      }
    );

    socket.current?.on(
      SOCKET_EVENTS.ONLY_ONE_PLAYER_LEFT,
      (data: { reason?: string }) => {
        setCancelledGame(true);
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (data.reason) {
          console.log(`onlyOnePlayerLeft: ${data.reason}`);
        }
        socket.current?.disconnect();
      }
    );

    /* Collision between the ball and Paddle here */
    socket.current?.on(SOCKET_EVENTS.BALL_HIT_PADDLE, (data) => {
      if (data) {
        drawFlash(ctx, data.x, data.y, data.size);
        if (
          isHitSoundLoaded &&
          hitSoundRef.current &&
          hitSoundRef.current.readyState === 4
        ) {
          hitSoundRef.current.pause();
          hitSoundRef.current.currentTime = 0;
          hitSoundRef.current.play();
        }
      }
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (hitSoundRef.current) {
        hitSoundRef.current.pause();
        hitSoundRef.current.currentTime = 0;
        hitSoundRef.current = null;
      }
      if (scoringSoundRef.current) {
        scoringSoundRef.current.pause();
        scoringSoundRef.current.currentTime = 0;
        scoringSoundRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, gameData, roomId, playerPos, cancelledGame, gameStarted]);

  /* Helper Functions */
  function drawNet(
    ctx: CanvasRenderingContext2D,
    height: number,
    width: number
  ) {
    if (!ctx) return;
    const netGap = Math.ceil(height * 0.04);
    const netWidth = Math.ceil(width * 0.006);

    ctx.fillStyle = GAME_SETTING.DEFAULT_COLOR;
    ctx.beginPath();
    for (let y = netGap; y < height; y += netGap * 2) {
      ctx.rect((width - netWidth) / 2, y, netWidth, netGap);
    }
    ctx.fill();
  }

  function drawFlash(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    ballSize: number
  ) {
    const hitBallSizeX = Math.floor(ballSize * 3);
    const hitBallSizeY = Math.floor(ballSize * 2.5);
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, hitBallSizeX / 2, hitBallSizeY / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = GAME_SETTING.HIT_COLOR;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
  }

  function drawBallTrail(ctx: CanvasRenderingContext2D, ball: BallState) {
    const numSegments = 6;
    const opacityStep = 0.1;
    let opacity = 0.4;
    const opacityDelta = opacityStep;
    for (let i = 0; i < numSegments; i++) {
      ctx.beginPath();
      ctx.arc(
        ball!.x - ball!.velocityX * i,
        ball!.y - ball!.velocityY * i,
        ball!.r,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      opacity -= opacityDelta;
    }
  }

  const gradualProgressUpdate = () => {
    setProgress((prevProgress) => {
      const newProgress = prevProgress + 33.33;
      if (newProgress >= 100) {
        return 100;
      }
      return newProgress;
    });
  };

  return (
    // <div className="live-mode-container container-bootmode">
    <Grid
      templateAreas={`"nav nav"
            "main main"
            "footer footer"`}
      gridTemplateRows={"115px 1fr 50px"}
      gridTemplateColumns={"150px 1fr"}
      h="100%"
      className="container-bootmode"
      style={{
        position: "relative",
      }}
    >
      <div
        className="background-blur"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${userSelectedBoardPath})`,
          opacity: 0.5,
          backgroundSize: "cover",
          filter: "blur(4px)",
        }}
      ></div>

      <GridItem pl="2" area={"nav"} className="nav-area">
        {!cancelledGame && !endedGame && (
          <IPongGameNav
            opponentId={opponentId}
            SelectedBackground={userSelectedBoardPath}
            player1Score={player1Score}
            player2Score={player2Score}
            opponentName={opponent}
            playerPos={playerPos}
            opponentAvatarPath={null}
          />
        )}
      </GridItem>

      <GridItem pl="2" area={"main"}>
        {!cancelledGame && !endedGame && (
          <>
            {!gameStarted && (
              <div className="progress-container">
                <ProgressBar progress={progress} />
              </div>
            )}
            {gameStarted && (
              <div className="Game-container-frame">
                <div className="canvas-container">
                  {gameStarted && !winner && (
                    <>
                      <canvas
                        ref={canvasRef}
                        className="game"
                        width="800px"
                        height="500px"
                      ></canvas>
                    </>
                  )}
                  {winner && <GameOver winner={winner} />}
                </div>
              </div>
            )}
          </>
        )}

        {cancelledGame && (
          <CancelledMatch WhyReason="Opponent Disconnected! The match has been cancelled." />
        )}
        {endedGame && (
          <GameOver
            winner={winner}
            winnerId={winnerId}
            winnerXp={winnerXp}
            loserXp={loserXp}
          />
        )}
      </GridItem>

      {/* <GridItem pl="2" className="button-leave" area={"footer"}>
          <Button className="bg-black">TEST</Button>
        </GridItem> */}
    </Grid>
    // </div>
  );
}

{
  /*

        <div className="iPongGame-frame">
          <IPongGameNav
          opponentName={opponent}
          playerPos={playerPos}
            opponentAvatarPath=""
          ></IPongGameNav>
          <div className="progress-container">
            {!gameStarted && <ProgressBar progress={progress} />}
          </div>
          <div className="canvas-container">
            {gameStarted && (
              <>
                <Scores
                  player1Score={player1Score}
                  player2Score={player2Score}
                ></Scores>
                <canvas
                  ref={canvasRef}
                  className="game"
                  width="800px"
                  height="500px"
                ></canvas>
              </>
            )}
          </div>
        </div>

  */
}
