import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { useSocket } from "../../../context/SocketContext";
import api from "../../../api/posts";
import "./InviteGameModal.css";
import { InviteGameModalWrapper } from "./InviteGameModalWrapper";
import { Button } from "@nextui-org/react";
import Close from "../../../components/UI/Button/CloseButton/CloseButton";
const TIMER_VALUE = 5000;

export default function InviteGameModal({ onClose, OpponentId, inviteId }) {
  const [opponentInfo, setOpponentInfo] = useState(null);
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const { socket } = useSocket();

  /* Fetch Opponent Data */
  useEffect(() => {
    if (!OpponentId) return;

    const fetchMatch = async () => {
      try {
        const response = await api.get(
          `/user-profile/getinfoById${OpponentId}`
        );
        setOpponentInfo(response.data);
      } catch (error) {}
    };
    fetchMatch();

    const timer = setTimeout(() => {
      emitDestroy();
      onClose();
      setVisible(false);
    }, TIMER_VALUE);

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  function handleAcceptInviteBtn() {
    if (socket) {
      socket.emit("iAcceptTheInvitation", { inviteId });
    }
    setVisible(false);
  }

  function closeInviteWindow() {
    emitDestroy();
    onClose();
    setVisible(false);
  }

  function handleDenyInviteBtn() {
    emitDestroy();
    onClose();
    setVisible(false);
  }

  function emitDestroy() {
    if (socket) {
      socket.emit("destroyGameInvite", { inviteId });
    }
  }

  return visible ? (
    <InviteGameModalWrapper>
      <div className="InviteGameModal-frame">
        <Close
          func={closeInviteWindow}
          id="close"
          ClassName={"close-invite-button"}
        />
        <div className="User-info">
          <Avatar
            isBordered
            className="User-avatar w-24 h-24"
            src={opponentInfo?.picture}
          />

          <div className="info">
            <div className="User-name">{opponentInfo?.username}</div>
            <div className="ipongchar">iPong</div>
          </div>
        </div>

        <div className="invite-decriptions">
          <h3 className="opponent-challenge-msg-header">
            Get ready,<span className="invite-opponentInfo">{opponentInfo?.username }</span>  is challenging you to a game right
            now!
          </h3>
          <p className="invitaion-expires">Invitation expires in {countdown} seconds</p>
        </div>

        <div className="invite-buttons">
          <Button color="success"
            onClick={handleAcceptInviteBtn}
          >Accept</Button>
          <Button color="danger"
            onClick={handleDenyInviteBtn}
          >Deny</Button>
        </div>
      </div>
    </InviteGameModalWrapper>
  ) : null;
}
