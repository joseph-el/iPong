import { createSlice } from '@reduxjs/toolkit';

interface AchievementState {
    ShowAchievementBadge: number | null;
    UpdatedLevel: number | null;
}

const initialState : AchievementState = {
    ShowAchievementBadge: null,
    UpdatedLevel: null
}

const achievementSlice = createSlice({
    name: 'achievement',
    initialState,
    reducers: {
      setUpdatedLevel: (state, action) => {
        state.UpdatedLevel = action.payload;
      },
      setAchievementBadge: (state, action) => {
        state.ShowAchievementBadge = action.payload;
      },
    },

  });
  
  export const { setAchievementBadge, setUpdatedLevel } = achievementSlice.actions;
  export default achievementSlice.reducer;