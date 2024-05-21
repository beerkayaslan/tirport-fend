import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getCookie } from 'react-use-cookie';

export default function baseQuery(URL: string) {
  const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const user = getCookie('user') ? JSON.parse(getCookie('user')) : null;
      if (!user || !user?.token?.accessToken) {
        return headers;
      }

      if (user && user.token.accessToken) {
        headers.set('Authorization', `Bearer ${user.token.accessToken.jwt}`);
      }
      return headers;
    }
  });

  return async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    return await baseQuery(args, api, extraOptions);
  };
}
