import { createSlice } from '@reduxjs/toolkit';

interface AchievementState {
    ShowAchievementBadge: number | null;
}

const initialState : AchievementState = {
    ShowAchievementBadge: null
}

const achievementSlice = createSlice({
    name: 'achievement',
    initialState,
    reducers: {
      setAchievementBadge: (state, action) => {
        state.ShowAchievementBadge = action.payload;
      },
    },

  });
  
  export const { setAchievementBadge } = achievementSlice.actions;
  export default achievementSlice.reducer;