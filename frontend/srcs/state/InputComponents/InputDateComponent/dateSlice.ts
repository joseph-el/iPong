
import { createSlice } from '@reduxjs/toolkit';

interface DateState {
    isInvalid: boolean;
    errorMessage: string;
    value: string;
}

const initialState : DateState = {
    isInvalid: false,
    errorMessage: "",
    value: "",
  };

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDateIsInvalid: (state, action) => {
      state.isInvalid = action.payload;
    },
    setDateErrorMessage: (state, action) => {
        state.errorMessage = action.payload;
    },
    setDateValue: (state, action) => {
        state.value = action.payload;
    },
  },
});

export const { setDateIsInvalid , setDateErrorMessage, setDateValue} = dateSlice.actions;
export default dateSlice.reducer;
