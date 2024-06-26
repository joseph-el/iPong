import React from "react";
import "./ChatPanelLayout.css";

import { Grid, GridItem } from "@chakra-ui/react";

import ChatPanel from "./ChatPanel";
import SeeUser from "../SeeUser/SeeUser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChatPanelHeader from "../ChatPanelHeader/ChatPanelHeader";
import { createSelector } from "reselect";
import SeeGroup from "../SeeGroup/SeeGroup";
import { RootState } from "../../../../state/store";
import ChatPanelFooter from "../ChatPanelFooter/ChatPanelFooter";
import {
  setUserSetting,
  setGroupSetting,
} from "../../../../state/iPongChatState/iPongChatState";

import { useNavigate } from "react-router-dom";

export default function ChatPanelLayout({socket}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const ShowFriendChatSetting = useSelector(
    (state: RootState) => state.iPongChat.UserSetting
  );
  const ShowGroupChatSettings = useSelector(
    (state: RootState) => state.iPongChat.GroupSetting
  );
  const selectedMessage = useSelector(
    (state: RootState) =>
      state.iPongChat.ListMessages.find((message) => message.isSelect) || null
  );

  const handleCloseClick = () => {
    dispatch(setUserSetting(false));
    dispatch(setGroupSetting(false));
  };

  if (!selectedMessage) {
    handleCloseClick();
    // navigate("/ipong/chat");
  }

  const [userId, setUserId] = React.useState<string>(selectedMessage?.senderId || "");
  
  return (
    <div className="ChatPanel-frame">
      <Grid
        templateAreas={`"header header"
                        "main main"
                        "Footer Footer"`}
        gridTemplateRows={"90px 1fr 90px"}
        h="100%"

      >
        <GridItem pl="2" area={"header"}>
          <ChatPanelHeader
            
            SetViewGroupSettings={() => {
              dispatch(setGroupSetting(true));
            }}
            SetViewFriendSettings={ () => {
              setUserId(selectedMessage.senderId);
              dispatch(setUserSetting(true));
            }}
          />
        </GridItem>

        <GridItem pl="2" style={{ overflowY: "auto" }} area={"main"}>
          <ChatPanel />
        </GridItem>

        {ShowGroupChatSettings && (
          <SeeGroup handleCloseClick={handleCloseClick} />
        )}

        {ShowFriendChatSetting && (
          <div className="blur-background">
            <div className="AchievementList-place fade-in">
              <SeeUser handleCloseClick={handleCloseClick} userId={userId} />
            </div>
          </div>
        )}

        <GridItem pl="2" area={"Footer"}>
          <ChatPanelFooter socket={socket} />
        </GridItem>
      </Grid>
    </div>
  );
}
