import { ReducerType, configureStore } from '@reduxjs/toolkit'
import inputReducer from "./InputComponents/inputSlice"
import dateSlice from "./InputComponents/InputDateComponent/dateSlice"
import genderSlice from './Checkbox/CheckboxSlice';
import UserSlice from './UserInfo/UserSlice';
import achievementSlice from './Achievement/AchievementSlice';
import notificationSlice from "./Notifications/NotificationsSlice";

export const store = configureStore({
    reducer: {
      input: inputReducer,
      date: dateSlice,
      gender: genderSlice,
      userState: UserSlice,
      achievement: achievementSlice,
      notification: notificationSlice,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>