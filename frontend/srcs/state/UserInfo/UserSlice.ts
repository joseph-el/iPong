import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  email: string;
  githubLink: string | null;
  isVerified: boolean;
  level: number;
  linkedInLink: string | null;
  picture: string;
  username: string;
  FriendsCount: number;
}

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  bio: null,
  email: '',
  githubLink: null,
  isVerified: false,
  level: 0,
  linkedInLink: null,
  picture: '',
  username: '',
  FriendsCount: 0,
};

const userState = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setBio: (state, action) => {
      state.bio = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setGithubLink: (state, action) => {
      state.githubLink = action.payload;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setLinkedInLink: (state, action) => {
      state.linkedInLink = action.payload;
    },
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setFriendsCount: (state, action) => {
      state.FriendsCount = action.payload;
    },
    setUserProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setId,
  setFirstName,
  setLastName,
  setBio,
  setEmail,
  setGithubLink,
  setIsVerified,
  setLevel,
  setLinkedInLink,
  setPicture,
  setUsername,
  setFriendsCount,
  setUserProfile,
} = userState.actions;

export default userState.reducer;
