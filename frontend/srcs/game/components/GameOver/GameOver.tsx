import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import "./GameOver.css";

import {
  setAchievementBadge,
  setUpdatedLevel,
} from "../../../state/Achievement/AchievementSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { getUserLevel } from "../../../utils/getCurrentLevel";
import api from "../../../api/posts";
import { set } from "lodash";

import IPongAlert from "../../../components/UI/iPongAlert/iPongAlert";
import { useDisclosure } from "@nextui-org/react";

interface GameOverProps {
  winner: string | null;
  winnerId?: string | null;
  winnerXp?: number;
  loserXp?: number;
  func: (boolean) => void;


}

export default function GameOver({
  winner,
  winnerId,
  winnerXp,
  loserXp,
  func
}: GameOverProps) {

  if (func === undefined || func === null) {
    func = (Nothing: boolean) => {

    }
  }
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const UserInfo = useSelector((state: RootState) => state.userState);
  // const [UpdatedLevel, setUpdatedLevel] = useState<number>(0);
  const achievement = useSelector(
    (state: RootState) => state.achievement.ShowAchievementBadge
  );

  console.log("achievement: in first ", achievement);

  useEffect(() => {
    const LevelstoredValue = localStorage.getItem("lastLevel");
    const lastLevel = LevelstoredValue ? parseInt(LevelstoredValue) : 0;
    if (!winnerId) return;
    if (!winnerXp || !loserXp) return;
    const UpdatedLevel = getUserLevel(
      winnerId === UserInfo.id ? winnerXp : loserXp
    );

    // setUpdatedLevel();

    if (UpdatedLevel > lastLevel) {
      dispatch(setAchievementBadge(UpdatedLevel));
      console.log("achievement: in edit ", achievement);
      dispatch(setUpdatedLevel(UpdatedLevel));
      // localStorage.setItem("lastLevel", UpdatedLevel.toString());
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      func(false)
      navigate(PATHS.DEFAULT_GAME_PAGE);
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    visible && onOpen();
  }, [visible, onOpen]);

  return (
    <IPongAlert
      handelRemoveUser={() => {
        onClose();
        func(false);
        navigate(PATHS.DEFAULT_GAME_PAGE);
      }}
      hideCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
      UserAlertHeader={"The Winner is:"}
      UserAlertMessage={winner}
      UserOptions={"Close"}
    />
  );
}
