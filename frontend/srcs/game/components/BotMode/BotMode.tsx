import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { useEffect, useRef, useState } from "react";
import { GAME_SETTING } from "../../constants/settings";
import { GameAlgo } from "../../algo/GameAlgo";
import "./BotMode.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import IPongGameNav from "../../components/IPongGameNav/IPongGameNav";
import Scores from "../Score/Score";
import GameOver from "../GameOver/GameOver";

/* STATIC PATHS FOR TESTING */
const mapPath = "/assets/game/maps/15.png";
const skinPath = "/assets/game/skins/hacker.png";

export default function BotMode() {
  const [timerValue, setTimerValue] = useState<number>(
    GAME_SETTING.TIMER_VALUE
  );
  const [winner, setWinner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<GameAlgo | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [botScore, setBotScore] = useState<number>(0);

  const navigate = useNavigate();

  const winnerCallback = (winner: string) => {
    setWinner(winner);
  };

  const updatePlayerScoreCallback = (p1Score: number) => {
    setPlayerScore(p1Score);
  };
  const updateBotScoreCallback = (p2Score: number) => {
    setBotScore(p2Score);
  };

  /* Timer */
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    startTimer();

    function startTimer() {
      timerInterval = setInterval(() => {
        if (timerValue === 0) {
          if (timerInterval) {
            clearInterval(timerInterval);
          }
          setGameStarted(true);
        } else {
          gradualProgressUpdate();
          setTimerValue(timerValue - 1);
        }
      }, 1000);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerValue]);

  /* Game */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = new GameAlgo(
      ctx,
      mapPath,
      skinPath,
      winnerCallback,
      updatePlayerScoreCallback,
      updateBotScoreCallback
    );
    gameRef.current = game;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowUp":
          // console.log("ArrowUp");
          if (game.player) {
            game.player.movePlayer(game.height, "up");
          }
          break;
        case "ArrowDown":
          // console.log("ArrowDown");
          if (game.player) {
            game.player.movePlayer(game.height, "down");
          }
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    if (gameStarted) {
      game.startGame(ctx);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      game.endGame("");
    };
  }, [gameStarted]);

  const leaveBotMode = () => {
    navigate(PATHS.DEFAULT_GAME_PAGE);
  };

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
    <div className="container">
      <div className="iPongGame-frame">
        <IPongGameNav
          opponentName="Ai Bot"
          opponentAvatarPath={GAME_SETTING.BOT_ICON}
        />
        <div className="progress-container">
          {!gameStarted && <ProgressBar progress={progress} />}
        </div>
        <div className="canvas-container">
          {gameStarted && !winner && (
            <>
              <Scores
                player1Score={playerScore}
                player2Score={botScore}
              ></Scores>
              <canvas
                ref={canvasRef}
                className="game"
                width="800px"
                height="500px"
              ></canvas>
              <button className="leaveButton" onClick={leaveBotMode}>
                Leave Training
              </button>
            </>
          )}
          {winner && <GameOver winner={winner} />}
        </div>
      </div>
    </div>
  );
}
