// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import {authLoginReducer, authReducer, userReducer} from './slice/users';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer,
      login:authLoginReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();