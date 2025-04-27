import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState<T> {
  isAuthenticated: boolean;
  accessToken: T | null;
  loading: boolean;
  error: T | null;
}

const initialState: AdminState<string> = {
  isAuthenticated: false,
  accessToken: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginSuccess(
      state: AdminState<string>,
      action: PayloadAction<{ accessToken: string }>
    ) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
    },
    adminLogOutSuccess(state: AdminState<string>) {
      state.error = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.loading = false;
    },
  },
});

export const { adminLoginSuccess, adminLogOutSuccess } = adminSlice.actions;

export default adminSlice.reducer;
