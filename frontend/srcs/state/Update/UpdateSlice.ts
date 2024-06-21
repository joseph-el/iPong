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
        setUpdate: (state) => {
            state.update = !state.update;
        },
    },
});

export const { setUpdate } = updateState.actions;
export default updateState.reducer;