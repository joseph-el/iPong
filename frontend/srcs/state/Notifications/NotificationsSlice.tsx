import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  senderId: string;
  createdAt: string;
  entityType: string;
}

interface NotificationState {
  notifications: Notification[];
  NotificationCount: number;
}

// Initial state
const initialState: NotificationState = {
  notifications: [],
  NotificationCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.NotificationCount = action.payload;
    },
  },
});

export const { addNotification, clearNotifications, setNotificationCount } =
  notificationSlice.actions;
export default notificationSlice.reducer;
