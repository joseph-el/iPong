import { createSlice } from "@reduxjs/toolkit";


interface UserState {
    id: number;
    username: string;
    password: string;
    is_active: boolean;
}

const initialState : UserState = {
    id: 0,
    username: "",
    password: "",
    is_active: false,
};

const userState = createSlice({
    name: "userState",
    initialState,
    reducers: { 
        setId: (state, action) => {
            state.id = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setIsActive: (state, action) => {
            state.is_active = action.payload;
        },
    },
  });

export const { setId, setUsername, setPassword, setIsActive } = userState.actions;
export default userState.reducer;

