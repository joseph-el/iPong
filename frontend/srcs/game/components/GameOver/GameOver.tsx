import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import "./GameOver.css";

interface GameOverProps {
  winner: string | null;
  winnerId?: string | null;
}

export default function GameOver({ winner, winnerId }: GameOverProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      navigate(PATHS.DEFAULT_GAME_PAGE);
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return visible ? (
    <div className="gameOverCard">
      <h1>The Winner is: </h1>
      <h2>{winner}</h2>
    </div>
  ) : null;
}
