import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

enum RouterState {
    HOME = 'Main Page',
    CHAT= '/Chat',
    PROFILE = '/Profile',
    STORE = '/Store',
}

enum RouterStateType {
    PADDLES = 'Paddles',
    BOARDS = 'Boards',   
}



interface UserState {
    routerState?: string;
    routerStateType?: string | null;
}

const initialState : UserState = {
    routerState: RouterState.HOME,
    routerStateType: null,
};

const RouterSlice = createSlice({
    name: "router",
    initialState,
    reducers: { 
        setRouterState: (state, action) => {
            state.routerState = action.payload;
        },
        setRouterStateType: (state, action) => {
            state.routerStateType = action.payload;
        }
    },
  });

export const { setRouterState, setRouterStateType } = RouterSlice.actions;
export default RouterSlice.reducer;


