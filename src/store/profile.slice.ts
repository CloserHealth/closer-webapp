'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { deleteItem, getItem, saveItem } from '../helpers/storage.helper';
import { profileStorageKey } from '../constants/index.constant';

export const sliceName = 'profile';

export interface RopeSubscription {
  id?: string;
  _id?: string;
  start: string;
  end: string;
  active: boolean;
}

export interface ProfileState {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  company?: string;
  jobTitle?: string;
  profilePic?: string;
  email?: string;
  isVerified?: boolean;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  subscription?: RopeSubscription;
  createdAt?: string;
  [key: string]: any;
}

interface IProfileLoginAction {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

const initialState: ProfileState = {
  ...((getItem(profileStorageKey) || {}) as ProfileState),
};

export const profileSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    profileLoginAction: (state, action: PayloadAction<IProfileLoginAction>) => {
      saveItem(profileStorageKey, { ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
    profileLogoutAction: (state) => {
      deleteItem(profileStorageKey);
      // location.reload();
      return {};
    },
    profileUpdateAction: (state, action) => {
      saveItem(profileStorageKey, { ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { profileLoginAction, profileLogoutAction, profileUpdateAction } = profileSlice.actions;

export default profileSlice.reducer;
