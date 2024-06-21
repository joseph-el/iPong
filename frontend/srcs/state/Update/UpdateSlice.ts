import { createSlice } from "@reduxjs/toolkit";

interface UpdateState {
    update: boolean;
}

const initialState : UpdateState = {
    update: false,
};

const updateState = createSlice({
    name: "update",
    initialState,
    reducers: {
        setUpdate: (state, action) => {
            state.update = action.payload;
        },
    },
});

export const { setUpdate } = updateState.actions;
export default updateState.reducer;