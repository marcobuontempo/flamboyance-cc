import bs58 from 'bs58';
import tokens from '@flamingo-data/tokens';
import pools from '@flamingo-data/pools';

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

export const formatUnixTimestamp = (datetime: number) => {
  return new Date(datetime).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).replace(',', '') + ' GMT';
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