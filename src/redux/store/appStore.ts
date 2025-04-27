import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import adminReducer from "../slices/adminSlice";
import globalReducer from "../slices/globalSlice";
import managerReducer from "../slices/managerSlice";
import ownerReducer from "../slices/ownerSlice";
import userReducer from "../slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["owner", "admin", "manager", "global", "user"],
};
const rootReducer = combineReducers({
  admin: adminReducer,
  owner: ownerReducer,
  global: globalReducer,
  manager: managerReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
