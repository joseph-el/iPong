import React, { useEffect, useRef, useState } from "react";
import { Player } from "../../entities/PlayerDS";
import { Ball } from "../../entities/BallDS";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "../../constants/socketEvents";
import { GAME_SETTING } from "../../constants/settings";
import { GameState } from "../../types/GameState";
import ProgressBar from "../ProgressBar/ProgressBar";
import _debounce from "lodash/debounce";
import "./LiveMode.css";
import IPongGameNav from "../IPongGameNav/IPongGameNav";
import Scores from "../Score/Score";
import { BallState } from "../../types/BallState";
import CancelledMatch from "../CancelledMatch/CancelledMatch";
import GameOver from "../GameOver/GameOver";
import { set } from "lodash";

interface LiveGameModeProps {
  socketRef: React.MutableRefObject<Socket | null>;
  opponent: string;
  opponentId: string | null;
  roomId: string;
  playerPos: number;
  gameData: GameState;
}

/* STATIC PATHS FOR TESTING IMAGES */
const mapPath = "/assets/game/maps/15.png";
const skinPath = "/assets/game/skins/bomb.png";

export default function LiveMode({
  socketRef,
  opponent,
  opponentId,
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
  const [winnerXp, setWinnerXp] = useState<number>(0);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);

  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const skinImageRef = useRef<HTMLImageElement | null>(null);
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);
  const [isSkinImageLoaded, setIsSkinImageLoaded] = useState(false);

  const hitSoundRef = useRef<HTMLAudioElement | null>(null);
  const scoringSoundRef = useRef<HTMLAudioElement | null>(null);
  const [isHitSoundLoaded, setIsHitSoundLoaded] = useState(false);
  const [isScoringSoundLoaded, setIsScoringSoundLoaded] = useState(false);

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
    const skinImage = new Image();
    const hitSound = new Audio();
    const scoringSound = new Audio();

    bgImage.onload = () => setIsBgImageLoaded(true);
    skinImage.onload = () => setIsSkinImageLoaded(true);
    hitSound.oncanplaythrough = () => setIsHitSoundLoaded(true);
    scoringSound.oncanplaythrough = () => setIsScoringSoundLoaded(true);

    bgImage.onerror = () => setIsBgImageLoaded(false);
    skinImage.onerror = () => setIsSkinImageLoaded(false);

    bgImage.src = mapPath;
    skinImage.src = skinPath;
    hitSound.src = GAME_SETTING.HIT_BALL_SOUND;
    scoringSound.src = GAME_SETTING.SCORE_SOUND;

    bgImageRef.current = bgImage;
    skinImageRef.current = skinImage;
    hitSoundRef.current = hitSound;
    scoringSoundRef.current = scoringSound;

    return () => {
      bgImageRef.current = null;
      skinImageRef.current = null;
      hitSoundRef.current = null;
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
      drawNet(ctx, canvas.height, canvas.width);
      if (isSkinImageLoaded && skinImageRef.current) {
        ctx.drawImage(
          skinImageRef.current,
          player1!.x,
          player1!.y,
          player1!.width,
          player1!.height
        );
        ctx.drawImage(
          skinImageRef.current,
          player2!.x,
          player2!.y,
          player2!.width,
          player2!.height
        );
      } else {
        player1.drawPlayer(ctx);
        player2.drawPlayer(ctx);
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
      (data: { winnerUserName: string; winnerId: string; winner }) => {
        if (data.winnerUserName) {
          setWinner(data.winnerUserName);
          setWinnerId(data.winnerId);
          setWinnerXp(data.w);
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
      }
      if (scoringSoundRef.current) {
        scoringSoundRef.current.pause();
        scoringSoundRef.current.currentTime = 0;
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

  /* TODO: FETCH OPPONENT AVATAR PATH HERE to change: opponentAvatarPath*/
  return (
    <div className="container">
      {!cancelledGame && !endedGame && (
        <div className="iPongGame-frame">
          <IPongGameNav
            opponentName={opponent}
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
      )}
      {cancelledGame && (
        <CancelledMatch WhyReason="Opponent Disconnected! The match has been cancelled." />
      )}
      {endedGame && <GameOver winner={winner} winnerId={winnerId} />}
    </div>
  );
}
