import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authApiService } from "@/store/api/auth/service";
import { authSlice } from "@/store/reducer/authSlice";

const rootReducer = combineReducers({
  [authApiService.reducerPath]: authApiService.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiService.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
