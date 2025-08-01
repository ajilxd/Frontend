import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ownerState<T> {
  isAuthenticated: boolean;
  accessToken: T | null;
  loading: boolean;
  error: T | null;
  subscription?: object;
  forgetPasswordEmail?: T;
  stripe_customer_id?: T;
  email?: T;
  _id?: T;
  companyName?: T;
  companyId?: T;
}

const initialState: ownerState<string> = {
  isAuthenticated: false,
  accessToken: null,
  loading: false,
  error: null,
  subscription: {},
  forgetPasswordEmail: "",
  stripe_customer_id: "",
  email: "",
  _id: "",
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    ownerLoginSuccess(
      state: ownerState<string>,
      action: PayloadAction<{
        accessToken: string;
        subscription: object;
        stripe_customer_id?: string;
        _id?: string;
        email?: string;
      }>
    ) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      state.subscription = action.payload.subscription;
      state.stripe_customer_id = action.payload.stripe_customer_id ?? "";
      state._id = action.payload._id;
      state.email = action.payload.email;
    },
    ownerLogOutSuccess(state: ownerState<string>) {
      state.error = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.loading = false;
      state.subscription = {};
      state.stripe_customer_id = "";
      state._id = "";
      state.email = "";
    },
    ownerForgetPassword(
      state: ownerState<string>,
      action: PayloadAction<{ forgetPasswordEmail: string }>
    ) {
      state.forgetPasswordEmail = action.payload.forgetPasswordEmail;
    },

    resetOwnerForgetPassword(state: ownerState<string>) {
      state.forgetPasswordEmail = "";
    },

    updateCompanyDetails(
      state: ownerState<string>,
      action: PayloadAction<{ companyName: string; companyId: string }>
    ) {
      state.companyId = action.payload.companyId;
      state.companyName = action.payload.companyName;
    },
  },
});

export const {
  ownerLoginSuccess,
  ownerLogOutSuccess,
  ownerForgetPassword,
  resetOwnerForgetPassword,
  updateCompanyDetails,
} = ownerSlice.actions;

export default ownerSlice.reducer;
