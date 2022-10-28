import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../../../lib-common/types";
import { smeAxios } from "../services/sme.service";
import { jwtDecode } from "../utils/jwt";

type AuthState = {
  user: User | null;
  loggedIn: boolean;
  token: string | null;
  exp: number | null;
};

const emptyState = {
  user: null,
  loggedIn: false,
  exp: null,
  token: null,
};

function setAxiosAuth(token: string | null) {
  smeAxios.interceptors.request.clear();
  smeAxios.interceptors.request.use((config) => ({
    ...config,
    headers: { ...config.headers, Authorization: token },
  }));
}

function getStateFromToken(token: string | null): AuthState {
  const parsedToken = jwtDecode(token);

  if (!parsedToken || new Date(parsedToken.payload.exp * 1000) < new Date()) {
    localStorage.removeItem("token");
    setAxiosAuth(null);
    return emptyState;
  }

  localStorage.setItem("token", parsedToken.raw);
  setAxiosAuth(`Bearer ${token}`);
  return {
    user: parsedToken.payload.userData,
    exp: parsedToken.payload.exp,
    loggedIn: true,
    token: token,
  };
}

const initialState = getStateFromToken(localStorage.getItem("token"));

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutPartial: () => {
      return getStateFromToken(null);
    },
    login: (_, action: PayloadAction<string>) => {
      return getStateFromToken(action.payload);
    },
  },
});

export const { logoutPartial, login } = authSlice.actions;

export default authSlice.reducer;
