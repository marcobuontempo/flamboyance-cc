import bs58 from 'bs58';
import tokens from '../flamingo-data/tokens';
import pools from '../flamingo-data/pools';
import { LocalStorageSettings } from '../types';

export const poolHashToData = (hash: string) => {
  for (let key in pools) {
    const pool = pools[key];
    if (pool.hash === hash) {
      return pool;
    }
  }
  return null;
}

export const tokenHashToData = (hash: string) => {
  for (let key in tokens) {
    const token = tokens[key];
    if (token.hash === hash) {
      return token;
    }
  }
  return null;
}

export const sha256 = async (data: Uint8Array): Promise<Uint8Array> => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}

export const isValidNeoN3Address = async (address: string): Promise<boolean> => {
  try {
    const decoded = bs58.decode(address);

    if (decoded.length !== 25) {
      return false;
    }

    const data = decoded.slice(0, -4);
    const checksum = decoded.slice(-4);

    const hash1 = await sha256(data);
    const hash2 = await sha256(hash1);
    const computedChecksum = hash2.slice(0, 4);

    return computedChecksum.every((byte, index) => byte === checksum[index]);
  } catch (error) {
    return false;
  }
}

export const getLocalStorageWallets = () => {
  let wallets: Array<string> = [];
  const storedWalletsData = localStorage.getItem('wallets');
  if (storedWalletsData) {
    wallets = JSON.parse(storedWalletsData);
  }
  return wallets;
}

export const addWalletToLocalStorage = (address: string) => {
  const wallets = getLocalStorageWallets();
  const exists = wallets.find(wallet => wallet === address);
  if (!exists) {
    wallets.push(address);
  }
  const updatedWalletsJSON = JSON.stringify(wallets);
  localStorage.setItem('wallets', updatedWalletsJSON);
}

export const getLocalStorageSettings = () => {
  let settings: LocalStorageSettings | null = null;
  const storedSettings = localStorage.getItem('settings');
  if (storedSettings) {
    settings = JSON.parse(storedSettings);
  }
  return settings;
}

export const setLocalStorageSettings = (settings: LocalStorageSettings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export const convertFiatCurrency = (amount: number | undefined, exchangeRate: number | undefined, outputDecimals: number) => {
  if (!amount) return '';
  exchangeRate = exchangeRate || 1;
  return (exchangeRate * amount).toFixed(outputDecimals).toString();
}

export const convertRawAmountToDecimals = (amount: number | string | undefined, tokenDecimals: number | undefined, outputDecimals: number) => {
  if (!amount) return '';
  if (!tokenDecimals) return amount.toString();

  amount = amount.toString();
  const prefix = parseInt(amount.slice(0, -1 * tokenDecimals)) || 0;
  const suffix = amount.slice(-1 * tokenDecimals, -1 * tokenDecimals + outputDecimals) || '0'.repeat(outputDecimals);

  return `${prefix}${outputDecimals > 0 ? '.' : ''}${suffix}`;
}