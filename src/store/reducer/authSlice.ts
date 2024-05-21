import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from 'react-use-cookie'

import { AuthState, AuthStatusEnum } from '@/types/auth/type'

const initialState = {
  AUTH_STATUS: AuthStatusEnum.LOADING,
  USER: null,
  USER_COOKIE: getCookie('user')
} satisfies AuthState as AuthState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGGED_IN: (state, action) => {
      state.AUTH_STATUS = AuthStatusEnum.LOGGED_IN
      state.USER = action.payload
      setCookie('user', JSON.stringify(action.payload))
    },
    LOGGED_OUT: (state) => {
      state.AUTH_STATUS = AuthStatusEnum.LOGGED_OUT
      state.USER = null
      state.USER_COOKIE = ''
      setCookie('user', '')
    },
    SET_USER_COOKIE: (state, action) => {
      setCookie('user', JSON.stringify(action.payload))
      state.USER_COOKIE = JSON.stringify(action.payload)
    }
  }
})

export const { LOGGED_IN, LOGGED_OUT, SET_USER_COOKIE } = authSlice.actions
export default authSlice.reducer
