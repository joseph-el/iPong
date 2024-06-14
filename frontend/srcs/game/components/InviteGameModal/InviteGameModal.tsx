import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { useSocket } from "../../../context/SocketContext";
import api from "../../../api/posts";
import "./InviteGameModal.css";

const TIMER_VALUE = 5000;

const InviteGameModal = ({ onClose, OpponentId, inviteId }) => {
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
    <div className="invite-game-modal">
      <button className="close-button" onClick={closeInviteWindow}>
        X
      </button>

      {/* header */}
      <div className="invite-header">
        <div className="opponent-avatar">
          <Avatar
            isFocusable
            src={opponentInfo?.picture}
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="opponent-avatar-userName">
          <h2>{opponentInfo?.username}</h2>
        </div>
      </div>

      {/* body */}
      <div className="opponent-challenge-msg">
        <h3 className="opponent-challenge-msg-header">
          {opponentInfo?.name} challenging you to a game Now!
        </h3>
        <p>Invite will expire in ({countdown}) seconds</p>
      </div>

      {/* footer */}
      <div className="invite-buttons">
        <button
          className="accept-invite-button"
          onClick={handleAcceptInviteBtn}
        >
          Accept
        </button>
        <button className="deny-invite-button" onClick={handleDenyInviteBtn}>
          Deny
        </button>
      </div>
    </div>
  ) : null;
};

export default InviteGameModal;
