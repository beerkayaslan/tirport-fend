import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/store/api/config';

const URL = import.meta.env.VITE_GENERAL_API_URL;

export const generalApiService = createApi({
  reducerPath: 'generalApi',
  baseQuery: baseQuery(URL),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({})
});
