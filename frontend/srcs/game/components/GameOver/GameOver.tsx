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
}

export default function GameOver({ winner, winnerId }: GameOverProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const  UserInfo = useSelector((state: RootState) => state.userState);
  const [current, setCurrent] = useState(0);

  useEffect(() => {


    const fetchUser = async () => {
    const LevelstoredValue = localStorage.getItem("lastLevel");
    console.log("LevelstoredValueonStore ", LevelstoredValue);
    const lastLevel = LevelstoredValue ? parseInt(LevelstoredValue) : 0;

    try {
      const response =  await api.get("/user-profile/me");
      console.log("response", response);
      
      setCurrent(response.data.xp);
    } catch (error) {
      console.log("error", error);
    }
    
    const currentLevel = getUserLevel(current);

    console.log("currentLevel", currentLevel);
    console.log("lastLevel", lastLevel);

    if (currentLevel > lastLevel) {
      dispatch(setAchievementBadge(currentLevel));
    }
  }
  fetchUser();
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
