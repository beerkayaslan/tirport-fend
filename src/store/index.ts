import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApiService } from '@/store/api/auth/service';
import { companyApiService } from '@/store/api/company/service';
import { generalApiService } from '@/store/api/general/service';
import { authSlice } from '@/store/reducer/authSlice';

const rootReducer = combineReducers({
  [authApiService.reducerPath]: authApiService.reducer,
  [generalApiService.reducerPath]: generalApiService.reducer,
  [companyApiService.reducerPath]: companyApiService.reducer,
  [authSlice.name]: authSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiService.middleware, generalApiService.middleware, companyApiService.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
