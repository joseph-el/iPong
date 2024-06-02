import { createSlice } from '@reduxjs/toolkit';



interface GenderState {
    UserGender:  String;
    Invalide: boolean;
}

const initialState : GenderState = {
    UserGender: "Undefined",
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

