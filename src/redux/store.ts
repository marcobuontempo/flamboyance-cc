import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import preferencesReducer from "@/redux/features/preferences/preferencesSlice";

const preferencesPersistConfig = {
  key: "preferences",
  storage,
};

const persistedPreferencesReducer = persistReducer(preferencesPersistConfig, preferencesReducer);

export const store = configureStore({
  reducer: {
    preferences: persistedPreferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable checks for redux-persist
    }),
});

export const persistor = persistStore(store);

// Infer types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store