import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import "./GameOver.css";

import { setAchievementBadge } from "../../../state/Achievement/AchievementSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { getUserLevel } from "../../../utils/getCurrentLevel";
import api from "../../../api/posts";

interface GameOverProps {
  winner: string | null;
  winnerId?: string | null;
}

export default function GameOver({ winner, winnerId }: GameOverProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const UserInfo = useSelector((state: RootState) => state.userState);


  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      
      const LevelstoredValue = localStorage.getItem('lastLevel');
      const lastLevel = LevelstoredValue ? parseInt(LevelstoredValue) : 0;



      try {
          const respose = await api.get(`/me
      } catch (error) {


      }
      const currentLevel = getUserLevel(UserInfo.xp);

      console.log("currentLevel", currentLevel);
      console.log("lastLevel", lastLevel);

      if (currentLevel > lastLevel) {
        dispatch(setAchievementBadge(currentLevel));
      }
  
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
