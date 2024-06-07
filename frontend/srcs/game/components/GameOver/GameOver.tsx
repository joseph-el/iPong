import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import "./GameOver.css";

import { setAchievementBadge } from "../../../state/Achievement/AchievementSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { getUserLevel } from "../../../utils/getCurrentLevel";
import api from "../../../api/posts";
import { set } from "lodash";

interface GameOverProps {
  winner: string | null;
  winnerId?: string | null;
  winnerXp?: number;
  loserXp?: number;
}

export default function GameOver({
  winner,
  winnerId,
  winnerXp,
  loserXp,
}: GameOverProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const UserInfo = useSelector((state: RootState) => state.userState);
  const [UpdatedLevel, setUpdatedLevel] = useState(0);

  
  useEffect(() => {
    const LevelstoredValue = localStorage.getItem("lastLevel");
    const lastLevel = LevelstoredValue ? parseInt(LevelstoredValue) : 0;
    setUpdatedLevel(winnerId === UserInfo.id ? winnerXp! : loserXp!);

    if (getUserLevel(UpdatedLevel) > lastLevel) {
      dispatch(setAchievementBadge(UpdatedLevel));
      localStorage.setItem("lastLevel", getUserLevel(UpdatedLevel).toString());
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      navigate(PATHS.DEFAULT_GAME_PAGE);
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return visible ? (
    <div className="gameOverCard">
      <h1>The Winner is: </h1>
      <h2>{winner}</h2>
    </div>
  ) : null;
}
