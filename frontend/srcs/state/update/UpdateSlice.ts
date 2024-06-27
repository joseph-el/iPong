import { createSlice } from "@reduxjs/toolkit";

interface iPongUpdateState {
    UpdateProfile: boolean;
    UpdateChatPanel: boolean;
    UpdateChatList: boolean;
    UpdateChat: boolean;

}

const initialState: iPongUpdateState = {
    UpdateProfile: false,
    UpdateChatPanel: false,
    UpdateChatList: false,
    UpdateChat: false,
};

const updateSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
        setUpdateProfile: (state) => {
            console.log("setUpdateProfile");
            state.UpdateProfile = !state.UpdateProfile;
        },
        setUpdateChatPanel: (state) => {
            state.UpdateChatPanel = !state.UpdateChatPanel;
        },
        setUpdateChatList: (state) => {
            state.UpdateChatList = !state.UpdateChatList;
        },
        setUpdateChat: (state) => {
            state.UpdateChat = !state.UpdateChat;
        },
    },
});

export const { setUpdateProfile, setUpdateChatPanel, setUpdateChatList, setUpdateChat } = updateSlice.actions;
export default updateSlice.reducer;