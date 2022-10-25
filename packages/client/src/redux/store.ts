import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.redux";
import smeReducer from "./sme.redux";

export const store = configureStore({
  reducer: { auth: authReducer, sme: smeReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
