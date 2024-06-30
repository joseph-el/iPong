import { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import "./CancelledMatch.css";

import IPongAlert from "../../../components/UI/iPongAlert/iPongAlert";
import { useDisclosure } from "@nextui-org/react";
interface CancelledMatchProps {
  WhyReason: string;
}

export default function CancelledMatch({ WhyReason }: CancelledMatchProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      // navigate(PATHS.DEFAULT_GAME_PAGE);
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    visible && onOpen();
  }, [visible, onOpen]);

  return (
    <div>
      <IPongAlert
        handelRemoveUser={() => {
          onClose();

          navigate(PATHS.DEFAULT_GAME_PAGE);
        }}
        hideCloseButton={false}
        isOpen={isOpen}
        onClose={onClose}
        UserAlertHeader={"Match Cancelled"}
        UserAlertMessage={WhyReason}
        UserOptions={"Close"}
      />
    </div>
  );
}
