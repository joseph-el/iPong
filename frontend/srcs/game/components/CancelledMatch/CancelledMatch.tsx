import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import "./CancelledMatch.css";

interface CancelledMatchProps {
  WhyReason: string;
}

export default function CancelledMatch({ WhyReason }: CancelledMatchProps) {
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
    <div className="cancelledMatchCard">
      <h2>Match Cancelled</h2>
      <p>{WhyReason}</p>
    </div>
  ) : null;
}
