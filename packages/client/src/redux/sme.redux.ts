import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";

import type { SME } from "../../../lib-common/types";
import { smeService } from "../services/sme.service";

type smeState = {
  data: SME;
  fetching: boolean;
  error: SerializedError | null;
};

const initialState: smeState = {
  data: { id: "", legalName: "", businessType: "" },
  fetching: false,
  error: null,
};

export const getSmeData = createAsyncThunk("sme/getSmeData", async () => {
  const smeData = await smeService.fetchSME();
  return smeData;
});

export const smeSlice = createSlice({
  name: "sme",
  initialState,
  reducers: {
    clearSme: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(getSmeData.pending, (state) => {
      state.fetching = true;
      state.error = null;
    });
    builder.addCase(getSmeData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.fetching = false;
    });
    builder.addCase(getSmeData.rejected, (state, action) => {
      state.error = action.error;
      state.fetching = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearSme } = smeSlice.actions;

export default smeSlice.reducer;
