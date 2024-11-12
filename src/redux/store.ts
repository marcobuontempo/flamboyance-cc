import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from '@/redux/features/preferences/preferencesSlice'

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
  }
});

// Infer types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store