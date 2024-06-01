import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
    isInvalid: boolean;
    errorMessage: string;
    value: [];
  }
  
  const initialState : ChatState = {
    isInvalid: false,
    errorMessage: "",
    value: [],
  };


  const inputSlice = createSlice({
    name: "iPongChat",
    initialState: {},
    reducers: {
      setIsInvalid: (state, action) => {
      },

    },
  });
  
  
  export const {  setIsInvalid } = inputSlice.actions;
  export default inputSlice.reducer;