import { HexString } from '../types';
import tokens from '../flamingo-data/tokens';
import pools from '../flamingo-data/pools';

export const poolHashToData = (hash: HexString) => {
  for (let key in pools) {
    const pool = pools[key];
    if (pool.hash === hash) {
      return pool;
    }
  }
  return null;
}

export const tokenHashToData = (hash: HexString) => {
  for (let key in tokens) {
    const token = tokens[key];
    if (token.hash === hash) {
      return token;
    }
  }
  return null;
}