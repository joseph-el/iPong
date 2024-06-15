import React from "react";
import "./FoundMatch.css";
import { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/avatar";

import { LookingForMatchWrapper } from "../LookingForMatch/LookingForMatchWrapper";
import Close from "../../../components/UI/Button/CloseButton/CloseButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import api from "../../../api/posts";

export default function FoundMatch({ opponent, opponentId }) {
  const UserInfo = useSelector((state: RootState) => state.userState);
  const [opponentInfo, setOpponentInfo] = useState(null);

  console.log("opponentId", opponentId);
  console.log("opponent", opponent);
  useEffect(() => {
    // if (!opponentId) return;
    const fetchMatch = async () => {
      try {
        const response = await api.get(
          `/user-profile/getinfoById${opponentId}`
        );
        console.log("result::::::>", response);
        setOpponentInfo(response.data);
      } catch (error) {
        console.log("error>>< ", error);
      }
    };

    fetchMatch();
  }, []);

  return (
    <LookingForMatchWrapper>
      <div className="LookingForMatch-frame">
        {/* <Close ClassName="close-button" func={leaveMatchMaking} id="close" /> */}

        <div className="User-Avatar">
          <Avatar
            isFocusable
            
            src={UserInfo.picture}
            alt="Avatar"
            className="avatar"
          />
          <div className="User-Name">{UserInfo.username}</div>
        </div>

        <div className="FoundMatch-content">
          <Avatar
          
            isFocusable
            src={opponentInfo?.picture}
            alt="Avatar"
            className="avatar"
          />
          <div className="Opponent-Name">{opponentInfo?.username}</div>
        </div>
      </div>
    </LookingForMatchWrapper>
  );
}

// import React from "react";
// import "./FoundMatch.css";

// const FoundMatch = ({ opponent, opponentId }) => (
//   <div className="container">
//     <h1 className="header">Match Found</h1>
//     <div className="card">
//       <p className="opponentInfo">Match Found! Opponent: {opponent}</p>
//       <p className="opponentInfo">Opponent ID: {opponentId}</p>
//     </div>
//   </div>
// );

// export default FoundMatch;
