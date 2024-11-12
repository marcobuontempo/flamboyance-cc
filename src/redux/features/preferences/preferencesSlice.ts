import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@redux/store";

export interface PreferencesState {
  preferredCurrency: string;
  currentWalletAddress: string | null;
  savedWalletAddresses: string[];
}

const initialState: PreferencesState = {
  preferredCurrency: 'USD',
  currentWalletAddress: null,
  savedWalletAddresses: [],
}

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferredCurrency: (state, action: PayloadAction<string>) => {
      state.preferredCurrency = action.payload;
    },
    setCurrentWalletAddress: (state, action: PayloadAction<string>) => {
      state.currentWalletAddress = action.payload;
    },
    clearCurrentWalletAddress: (state) => {
      state.currentWalletAddress = null;
    },
    addWalletAddress: (state, action: PayloadAction<string>) => {
      if (!state.savedWalletAddresses.includes(action.payload)) {
        state.savedWalletAddresses.push(action.payload);
      }
    },
    removeWalletAddress: (state, action: PayloadAction<string>) => {
      state.savedWalletAddresses = state.savedWalletAddresses.filter(
        (address) => address !== action.payload
      );
    },
  }
});

export const { 
  setPreferredCurrency, 
  setCurrentWalletAddress, 
  clearCurrentWalletAddress, 
  addWalletAddress, 
  removeWalletAddress
 } = preferencesSlice.actions;

export const selectPreferredCurrency = (state: RootState) => state.preferences.preferredCurrency;
export const selectCurrentWalletAddress = (state: RootState) => state.preferences.currentWalletAddress;
export const selectSavedWalletAddresses = (state: RootState) => state.preferences.savedWalletAddresses;

export default preferencesSlice.reducer;