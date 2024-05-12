import { ReducerType, configureStore } from '@reduxjs/toolkit'
import inputReducer from "./InputComponent/inputSlice"

export const store = configureStore({
    reducer: {
      input: inputReducer,
    },
  });


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>