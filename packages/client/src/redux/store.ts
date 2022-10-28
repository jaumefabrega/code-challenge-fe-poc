import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.redux";
import smeReducer from "./sme.redux";
import usersReducer from "./users.redux";

export const store = configureStore({
  reducer: { auth: authReducer, sme: smeReducer, users: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
