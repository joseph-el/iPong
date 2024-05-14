import { createSlice } from "@reduxjs/toolkit";

export enum RouterState {
    HOME = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    PROFILE = '/profile',
    NOT_FOUND = '/not-found',
    SERVER_ERROR = '/server-error',
    UNAUTHORIZED = '/unauthorized',
    FORBIDDEN = '/forbidden',
    BAD_REQUEST = '/bad-request',
    INTERNAL_SERVER_ERROR = '/internal-server-error',
    SERVICE_UNAVAILABLE = '/service-unavailable', 

}

interface UserState {
    routerState: RouterState;
}

const initialState : UserState = {
    routerState: RouterState.HOME,
};

const userState = createSlice({
    name: "router",
    initialState,
    reducers: { 
        setRouterState: (state, action) => {
            state.routerState = action.payload;
        },
    },
  });

export const { setRouterState } = userState.actions;
export default userState.reducer;


