import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@redux/store";

export interface PreferencesState {
  preferredCurrency: string;
  preferredCurrencyConversion: number;
  currentWalletAddress: string | null;
  savedWalletAddresses: string[];
}

const initialState: PreferencesState = {
  preferredCurrency: 'USD',
  preferredCurrencyConversion: 1,
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
    setPreferredCurrencyConversion: (state, action: PayloadAction<number>) => {
      state.preferredCurrencyConversion = action.payload;
    },
    resetPreferredCurrency: (state) => {
      state.preferredCurrency = initialState.preferredCurrency;
      state.preferredCurrencyConversion = initialState.preferredCurrencyConversion;
    },
    setCurrentWalletAddress: (state, action: PayloadAction<string>) => {
      state.currentWalletAddress = action.payload;
    },
    clearCurrentWalletAddress: (state) => {
      state.currentWalletAddress = initialState.currentWalletAddress;
    },
    addSavedWalletAddress: (state, action: PayloadAction<string>) => {
      if (!state.savedWalletAddresses.includes(action.payload)) {
        state.savedWalletAddresses.push(action.payload);
      }
    },
    removeSavedWalletAddress: (state, action: PayloadAction<string>) => {
      state.savedWalletAddresses = state.savedWalletAddresses.filter(
        (address) => address !== action.payload
      );
    },
    clearSavedWalletAddresses: (state) => {
      state.savedWalletAddresses = initialState.savedWalletAddresses;
    },
  }
});

export const { 
  setPreferredCurrency,
  setPreferredCurrencyConversion,
  resetPreferredCurrency,
  setCurrentWalletAddress, 
  clearCurrentWalletAddress, 
  addSavedWalletAddress, 
  removeSavedWalletAddress,
  clearSavedWalletAddresses,
 } = preferencesSlice.actions;

export const selectPreferredCurrency = (state: RootState) => state.preferences.preferredCurrency;
export const selectPreferredCurrencyConversion = (state: RootState) => state.preferences.preferredCurrencyConversion;
export const selectCurrentWalletAddress = (state: RootState) => state.preferences.currentWalletAddress;
export const selectSavedWalletAddresses = (state: RootState) => state.preferences.savedWalletAddresses;

export default preferencesSlice.reducer;