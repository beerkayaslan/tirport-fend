import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/store/api/config';

const URL = import.meta.env.VITE_COMPANY_API_URL;

export const companyApiService = createApi({
  reducerPath: 'companyApi',
  baseQuery: baseQuery(URL),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({})
});
