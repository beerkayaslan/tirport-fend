import { createApi } from '@reduxjs/toolkit/query/react'

import baseQuery from '@/store/api/config'

const URL = import.meta.env.VITE_AUTH_API_URL

export const authApiService = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery(URL),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({})
})
