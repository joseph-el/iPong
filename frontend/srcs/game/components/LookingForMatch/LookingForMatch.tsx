import React, { useEffect } from "react";
import "./LookingForMatch.css";
import { LookingForMatchWrapper } from "./LookingForMatchWrapper";
import { Spinner } from "@nextui-org/spinner";
import { CircularProgress } from "@nextui-org/progress";

import { Avatar } from "@nextui-org/avatar";
import Close from "../../../components/UI/Button/CloseButton/CloseButton";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../state/store";
import api from "../../../api/posts";
export function LookingForMatch({ leaveMatchMaking, OpponentId}) {

  const UserInfo = useSelector((state: RootState) => state.userState);
  const [opponentInfo, setOpponentInfo] = useState(null);

  useEffect(() => {
    if (!OpponentId) 
      return ;
    const fetchMatch = async () => {
      try {
        const response = await api.get(`/user-profile/getinfoById${OpponentId}`);
        console.log(response);
        setOpponentInfo(response.data);
      } catch (error) {}
    }

    fetchMatch();
  }, []);




  const handelUsernameLength = (username) => {
    if (username.length > 10) {
      return username.slice(0, 10) + "..";
    }
    return username;
  }
  return (
    <LookingForMatchWrapper>
      <div className="LookingForMatch-frame">
        <Close ClassName="close-button" func={leaveMatchMaking} id="close" />

        <div className="User-Avatar">
          <Avatar   isFocusable src={UserInfo.picture} alt="Avatar" className="avatar" />
          <div className="User-Name">{handelUsernameLength(UserInfo.username)}</div>
        </div>
        <div className="X-versus">VS</div>

        {OpponentId != null ? (
          <div className="LookingForMatch-content">
            <div className="Opponent-Avatar">
              <img src={opponentInfo.picture} alt="Avatar" className="avatar" />
              <div className="Opponent-Name">{handelUsernameLength(opponentInfo.username)}</div>
            </div>
          </div>
        ) : (
          <div className="Spinner-Wrapper">
            <CircularProgress
              classNames={{
                svg: "w-12 h-12 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}
              strokeWidth={4}
              showValueLabel={true}
            />
          </div>
        )}
      </div>
    </LookingForMatchWrapper>
  );
}

export default LookingForMatch;
