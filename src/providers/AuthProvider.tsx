import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/index';
import { LOGGED_IN, LOGGED_OUT, SET_USER_COOKIE } from '@/store/reducer/authSlice';
import { AuthStatusEnum, User } from '@/types/auth/type';

const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;
const REFRESH_INTERVAL = 1000 * 60 * 2;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const USER_COOKIE = useSelector((state: RootState) => state.auth.USER_COOKIE);
  const AUTH_STATUS = useSelector((state: RootState) => state.auth.AUTH_STATUS);

  const USER = useMemo(() => (USER_COOKIE ? JSON.parse(USER_COOKIE) : null), [USER_COOKIE]) as User;

  useEffect(() => {
    if (!USER) {
      dispatch(LOGGED_OUT());
      return;
    }

    const tokenExpire = new Date(USER.token.accessToken.expiresIn).getTime();
    const refreshTokenExpire = new Date(USER.token.refreshToken.expiresIn).getTime();

    const now = new Date().getTime();

    if (refreshTokenExpire < now) {
      dispatch(LOGGED_OUT());
      return;
    }

    if (tokenExpire < now) {
      fetch(`${AUTH_URL}/user/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: USER.token.refreshToken.jwt
        })
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            dispatch(SET_USER_COOKIE(data));
          } else {
            dispatch(LOGGED_OUT());
          }
        })
        .catch(() => {
          dispatch(LOGGED_OUT());
        });
      return;
    }

    if (USER) {
      fetch(`${AUTH_URL}/user/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${USER.token.accessToken.jwt}`
        }
      }).then(async (response) => {
        if (response.ok) {
          dispatch(LOGGED_IN(USER));
        } else {
          dispatch(LOGGED_OUT());
        }
      });
    }
  }, [USER, dispatch]);

  useEffect(() => {
    if (AUTH_STATUS !== AuthStatusEnum.LOGGED_IN) {
      return;
    }

    const interval = setInterval(() => {
      const tokenExpire = new Date(USER.token.accessToken.expiresIn).getTime();
      const refreshTokenExpire = new Date(USER.token.refreshToken.expiresIn).getTime();

      const now = new Date().getTime();

      if (refreshTokenExpire < now) {
        dispatch(LOGGED_OUT());
        return;
      }

      if (tokenExpire - REFRESH_INTERVAL < now) {
        fetch(`${AUTH_URL}/user/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken: USER.token.refreshToken.jwt
          })
        })
          .then(async (response) => {
            if (response.ok) {
              const data = await response.json();
              dispatch(SET_USER_COOKIE(data));
            } else {
              dispatch(LOGGED_OUT());
            }
          })
          .catch(() => {
            dispatch(LOGGED_OUT());
          });
      }
    }, 1000 * 3);

    return () => clearInterval(interval);
  }, [AUTH_STATUS, dispatch, USER]);

  return children;
}
