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
  avatar: string;
  type?: string;
  isSelect: Boolean;
}

interface iPongChatState {
  messages: Messages[];
  ListMessages: ListMessages[];
  selectedMessage: Boolean;
  UserSetting: Boolean;
  GroupSetting: Boolean;
}

const initialState: iPongChatState = {
  messages: [],

  
  ListMessages: [
    {
      type: "group",
      id: "2222-z1",
      fullname: "Youssef El-idrissi",
      lastMessage:
        "Nice. I don't know why people get all worked up about Hawaiian pizza. I njknjk",
      time: "12:00",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      isSelect: false,
    },
    {
      type: "Dm",
      id: "2222-z2",
      fullname: "El-idrissi Youssef",
      lastMessage:
        "Nice. I don't know why people get all worked up about Hawaiian pizza. I njknjk",
      time: "12:00",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      isSelect: false,
    },
    {
      type: "Dm",
      id: "2222-z3",
      fullname: "Youssef Touate",
      lastMessage: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "12:00",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      isSelect: false,
    },
  ],
  UserSetting: false,
  GroupSetting: false,
  selectedMessage: false,
};

const iPongChatSlice = createSlice({
  name: "iPongChat",
  initialState,
  reducers: {
    setIsSelectedMessage(state, action) {
      state.ListMessages = state.ListMessages.map((message) => {
        if (message.id === action.payload) {
          return {
            ...message,
            isSelect: true,
          };
        }
        return {
          ...message,
          isSelect: false,
        };
      });
    },
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
      state.selectedMessage = action.payload;
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
  setIsSelectedMessage,
} = iPongChatSlice.actions;
export default iPongChatSlice.reducer;
