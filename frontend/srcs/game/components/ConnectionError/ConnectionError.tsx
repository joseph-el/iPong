import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConnectionError.css";
import { PATHS } from "../../constants/paths";
import IPongAlert from "../../../components/UI/iPongAlert/iPongAlert";
import { useDisclosure } from "@nextui-org/react";
interface ErrorConnectionProps {
  reason: string;
}

export default function ErrorConnection({ reason }: ErrorConnectionProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // navigate(PATHS.DEFAULT_GAME_PAGE);
    }, 2000);

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
        UserAlertHeader={"Error connecting to server"}
        UserAlertMessage={reason}
        UserOptions={"Close"}
      />
    </div>
  );
}
