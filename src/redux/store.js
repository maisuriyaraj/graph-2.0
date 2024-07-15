// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/users';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();