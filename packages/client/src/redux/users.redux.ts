import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";

import type { User } from "../../../lib-common/types";
import { smeService } from "../services/sme.service";

type usersState = {
  data: User[];
  fetching: boolean;
  error: SerializedError | null;
};

const initialState: usersState = {
  data: [],
  fetching: false,
  error: null,
};

export const getUsersData = createAsyncThunk("users/getUsersData", async () => {
  const usersData = await smeService.fetchUsers();
  return usersData;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(getUsersData.pending, (state) => {
      state.fetching = true;
      state.error = null;
    });
    builder.addCase(getUsersData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.fetching = false;
    });
    builder.addCase(getUsersData.rejected, (state, action) => {
      state.error = action.error;
      state.fetching = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
