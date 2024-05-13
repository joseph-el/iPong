import { createSlice } from "@reduxjs/toolkit";

interface InputState {
  color: string;
  isInvalid: boolean;
  errorMessage: string;
  value: string;
}

const initialState : InputState = {
  color: "success",
  isInvalid: false,
  errorMessage: "",
  value: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState: {},
  reducers: {
    setColor: (state, action) => {
      const { id, color } = action.payload;
      if (!state[id]) state[id] = { ...initialState };
      state[id].color = color;
    },
    setIsInvalid: (state, action) => {
      const { id, isInvalid } = action.payload;
      if (!state[id]) state[id] = { ...initialState };
      state[id].isInvalid = isInvalid;
    },
    setErrorMessage: (state, action) => {
      const { id, errorMessage } = action.payload;
      if (!state[id]) state[id] = { ...initialState };
      state[id].errorMessage = errorMessage;
    },
    setValue: (state, action) => {
      const { id, value } = action.payload;
      if (!state[id]) state[id] = { ...initialState };
      state[id].value = value;      
    },
  },
});


export const { setColor, setIsInvalid, setErrorMessage, setValue } = inputSlice.actions;
export default inputSlice.reducer;
