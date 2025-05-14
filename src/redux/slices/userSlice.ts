import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Basic types
type Profile = {
  name?: string;
  image?: string;
  email?: string;
};

type Company = {
  name?: string;
};

type Owner = {
  ownerId?: string;
  ownerIsSubscribed?: boolean;
  ownerSubscribedPlan?: string;
  name?: string;
};

type Stats = {
  totalFinishedTasks: string;
  totalAttemptedTasks: string;
  totalActiveTasks: string;
  totalDueTasks: string;
  totalProjects_count: string;
  overallTaskCount: string;
  joinedDate: string;
  isDisabled: boolean;
};

type Manager = {
  image: string;
  name: string;
};

// User state
interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  company: Company;
  owner: Owner;
  profile: Profile;
  stats?: Stats;
  manager: Manager;
  id: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  loading: false,
  error: null,
  owner: {
    ownerId: "",
    ownerIsSubscribed: false,
    ownerSubscribedPlan: "",
    name: "",
  },
  company: { name: "" },
  stats: undefined,
  id: "",
  manager: {
    image: "",
    name: "",
  },
  profile: {
    name: "",
    image: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginSuccess(
      state,
      action: PayloadAction<{
        accessToken: string;
        data: {
          ownerName: string;
          ownerId: string;
          company: string;
          id: string;
          managerImage: string;
          managerName: string;
          ownerIsSubscribed: boolean;
          ownerSubscribedPlan: string;
          name: string;
          image: string;
          email: string;
        };
      }>
    ) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      state.company.name = action.payload.data.company ?? "";
      state.id = action.payload.data.id;
      state.manager.name = action.payload.data.managerName;
      state.manager.image = action.payload.data.managerImage ?? "";
      state.owner.name = action.payload.data.ownerName;
      state.owner.ownerIsSubscribed = action.payload.data.ownerIsSubscribed;
      state.owner.ownerSubscribedPlan = action.payload.data.ownerSubscribedPlan;
      state.owner.ownerId = action.payload.data.ownerId;
      state.profile.name = action.payload.data.name;
      state.profile.image = action.payload.data.image;
      state.profile.email = action.payload.data.email;
    },
    userLogOutSuccess(state) {
      state.isAuthenticated = true;
      state.accessToken = "";
      state.loading = false;
      state.error = null;
      state.company.name = "";
      state.id = "";
      state.manager.name = "";
      state.manager.image = "";
      state.owner.name = "";
      state.owner.ownerIsSubscribed = false;
      state.owner.ownerSubscribedPlan = "";
      state.profile.name = "";
      state.profile.image = "";
      state.profile.email = "";
    },
  },
});

export const { userLoginSuccess, userLogOutSuccess } = userSlice.actions;

export default userSlice.reducer;
