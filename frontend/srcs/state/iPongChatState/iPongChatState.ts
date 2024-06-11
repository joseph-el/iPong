import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

interface Messages {
  id: string;
  message: string;
  avatar: string;
  time: string;
  authorId:string;
}

interface ListMessages {
  senderId: string;
  id: string;
  fullname: string;
  lastMessage: string;
  time: string;
  avatar: string;
  type?: string;
  isSelect: Boolean;
}

enum FilterType {
  All = "All",
  Users = "Users",
  Groups = "Groups",
}

interface iPongChatState {
  messages: Messages[];
  ListMessages: ListMessages[];
  selectedMessage: Boolean;
  UserSetting: Boolean;
  GroupSetting: Boolean;
  filterType?: FilterType;

}

const initialState: iPongChatState = {
  messages: [],
  ListMessages: [],
  UserSetting: false,
  GroupSetting: false,
  selectedMessage: false,
  filterType: FilterType.All,
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
    setFilterType(state, action) {
      state.filterType = action.payload;
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
  setFilterType,
  setGroupSetting,
  setListMessages,
  setIsSelectedMessage,
} = iPongChatSlice.actions;
export default iPongChatSlice.reducer;
