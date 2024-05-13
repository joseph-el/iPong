import { createSlice } from '@reduxjs/toolkit';

export enum GenderType {
    UNK,
    MALE,
    FELMALE
}

interface GenderState {
    UserGender: GenderType;
    Invalide: boolean;
}

const initialState : GenderState = {
    UserGender: GenderType.UNK,
    Invalide: false
};

const genderSlice = createSlice({
    name: 'gender',
    initialState,
    reducers: {
      setGender: (state, action) => {
        state.UserGender = action.payload;
      },
      setGenderInvalide: (state, action) => {
        state.Invalide = action.payload;
      },
    },

  });
  
  export const { setGender, setGenderInvalide } = genderSlice.actions;
  export default genderSlice.reducer;

