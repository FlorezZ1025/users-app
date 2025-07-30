import { createReducer, on } from '@ngrx/store';
import {loginSuccess, logout } from './auth.actions';

export const initialLoginInfo = {
  isAuth: false,
  isAdmin: false,
  user: undefined,
};

const initialState = JSON.parse(
  sessionStorage.getItem('login') || JSON.stringify(initialLoginInfo)
);

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginInfo }) => ({
    isAuth: true,
    isAdmin: loginInfo.isAdmin,
    user: loginInfo.user,
  })),
  on(logout, (state) => ({
    ...initialLoginInfo,
  }))
);
