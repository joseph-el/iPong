import { ReducerType, configureStore } from '@reduxjs/toolkit'
import inputReducer from "./InputComponents/inputSlice"
import dateSlice from "./InputComponents/InputDateComponent/dateSlice"

export const store = configureStore({
    reducer: {
      input: inputReducer,
      date: dateSlice,
    },
  });


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>