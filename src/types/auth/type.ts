export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto extends User {}

export interface User {
  id: string;
  name: string;
  email: string;
  token: {
    accessToken: {
      jwt: string;
      expiresIn: number | string;
    };
    refreshToken: {
      jwt: string;
      expiresIn: number | string;
    };
  };
}

export interface AuthState {
  AUTH_STATUS: AuthStatusEnum;
  USER: User | null;
  USER_COOKIE: string | null;
}

export enum AuthStatusEnum {
  LOADING = 'LOADING',
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT'
}
