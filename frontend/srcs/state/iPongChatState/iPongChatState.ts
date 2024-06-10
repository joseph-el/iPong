import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

interface Messages {
  id: string;
  message: string;
  user: string;
  time: string;
}
interface ListMessages {
  id: string;
  fullname: string;
  lastMessage: string;
  time: string;
}

interface iPongChatState {
  messages: Messages[];
  ListMessages: ListMessages[];
  selectedUser: string;
  UserSetting: Boolean;
  GroupSetting: Boolean;
}

const initialState: iPongChatState = {
  messages: [],
  ListMessages: [],
  selectedUser: "",
  UserSetting: false,
  GroupSetting: false,
};

const inputSlice = createSlice({
  name: "iPongChat",
  initialState,
  reducers: {
    setListMessages(state, action) {
      state.ListMessages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    selectUser(state, action) {
      state.selectedUser = action.payload;
    },
    setUserSetting(state, action) {
      state.UserSetting = action.payload;
    },
    setGroupSetting(state, action) {
      state.GroupSetting = action.payload;
    },
  },
});

export const {
  addMessage,
  setMessages,
  selectUser,
  setUserSetting,
  setGroupSetting,
  setListMessages,
} = inputSlice.actions;
export default inputSlice.reducer;
