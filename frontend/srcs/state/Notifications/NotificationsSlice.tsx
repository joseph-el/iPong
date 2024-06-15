import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  senderId: string;
  receiverId: string;
  createdAt: string;
  entityType: string;
  RoomId: string;
  NotificationId?: string;
  
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
    setNotification: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.NotificationCount = action.payload;
    },
  },
});

export const { addNotification, clearNotifications, setNotification,setNotificationCount } =
  notificationSlice.actions;
export default notificationSlice.reducer;
