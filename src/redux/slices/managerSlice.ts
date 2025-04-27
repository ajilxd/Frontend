import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type profileType = {
  name?: string;
  image?: string;
  email?: string;
  id?: string;
};

type companyType = {
  name: string;
};

type ownerType<T> = {
  ownerId?: T;
  ownerIsSubscribed?: boolean;
  ownerSubscribedPlan?: T;
  name?: T;
};

type statsType<T> = {
  totalProjectsCompleted?: T;
  totalProjectsCommitted?: T;
  ongoingProjectsCount?: T;
  totalMembersOnhand?: T;
  totalCompletedTasks?: T;
  joinedDate?: T;
  isDisabled?: boolean;
};

interface managerState<T> {
  isAuthenticated: boolean;
  accessToken: T | null;
  loading: boolean;
  error: T | null;
  company: companyType;
  owner: ownerType<T>;
  profile: profileType;
  stats?: statsType<T>;
  id: T;
}

const initialState: managerState<string> = {
  isAuthenticated: false,
  accessToken: null,
  loading: false,
  error: null,
  profile: { name: "", image: "", email: "", id: "" },
  owner: {
    ownerId: "",
    ownerIsSubscribed: false,
    ownerSubscribedPlan: "",
    name: "",
  },
  company: { name: "" },
  stats: undefined,
  id: "",
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    managerLoginSuccess(
      state: managerState<string>,
      action: PayloadAction<{
        accessToken: string;
        data: {
          id: string;
          company: string;
          image: string;
          name: string;
          email: string;
          ownerId: string;
          ownerIsSubscribed: boolean;
          ownerSubscribedPlan: string;
          ownerName: string;
        };
      }>
    ) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      state.id = action.payload.data.id;
      state.company.name = action.payload.data.company ?? "";
      state.profile.image = action.payload.data.image;
      state.profile.name = action.payload.data.name;
      state.profile.email = action.payload.data.email;
      state.owner.name = action.payload.data.ownerName;
      state.owner.ownerId = action.payload.data.ownerId;
      state.owner.ownerIsSubscribed = action.payload.data.ownerIsSubscribed;
      state.owner.ownerSubscribedPlan = action.payload.data.ownerSubscribedPlan;
    },
    managerLogOutSuccess(state: managerState<string>) {
      state.error = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.loading = false;
      state.company.name = "";
      state.profile.image = "";
      state.profile.name = "";
      state.profile.email = "";
      state.owner.name = "";
      state.owner.ownerId = "";
      state.owner.ownerIsSubscribed = false;
      state.owner.ownerSubscribedPlan = "";
    },
  },
});

export const { managerLoginSuccess, managerLogOutSuccess } =
  managerSlice.actions;

export default managerSlice.reducer;
