import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ownerState {
  isAuthenticated: boolean;
  subscription: object | null;
  forgetPasswordEmail: string | null;
  stripe_customer_id: string | null;
  email: string | null;
  _id: string | null;
  companyName: string | null;
  companyId: string | null;
  name: string | null;
}

const initialState: ownerState = {
  isAuthenticated: false,
  subscription: null,
  forgetPasswordEmail: null,
  stripe_customer_id: null,
  email: null,
  _id: null,
  name: null,
  companyId: null,
  companyName: null,
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    ownerLoginSuccess(
      state: ownerState,
      action: PayloadAction<{
        accessToken: string;
        subscription: object;
        stripe_customer_id: string;
        _id: string;
        email: string;
        name: string;
      }>
    ) {
      state.isAuthenticated = true;
      state.subscription = action.payload.subscription;
      state.stripe_customer_id = action.payload.stripe_customer_id;
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    ownerLogOutSuccess(state: ownerState) {
      state.isAuthenticated = false;
      state.subscription = null;
      state.stripe_customer_id = null;
      state._id = null;
      state.email = null;
      state.name = null;
    },
    ownerForgetPassword(
      state: ownerState,
      action: PayloadAction<{ forgetPasswordEmail: string }>
    ) {
      state.forgetPasswordEmail = action.payload.forgetPasswordEmail;
    },

    resetOwnerForgetPassword(state: ownerState) {
      state.forgetPasswordEmail = "";
    },

    updateCompanyDetails(
      state: ownerState,
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
