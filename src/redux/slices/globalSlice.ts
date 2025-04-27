import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  activeRole: string;
}

const initialState: GlobalState = {
  activeRole: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setActiveRole(
      state: GlobalState,
      action: PayloadAction<{ activeRole: string }>
    ) {
      state.activeRole = action.payload.activeRole;
    },
  },
});

export const { setActiveRole } = globalSlice.actions;

export default globalSlice.reducer;
