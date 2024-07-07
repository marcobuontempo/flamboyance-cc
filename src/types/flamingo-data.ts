export type FlamingoToken = {
  symbol: string;
  decimals: number;
  hash: string;
  colour: string;
  image: string;
}

export type FlamingoPool = {
  symbol: string;
  decimals: number;
  hash: string;
  internalPrice: boolean;
  reversePool: boolean;
  targetedIncentivesPool: boolean;
  shouldBeMigrated: boolean;
  rewardToken: FlamingoToken;
  tokens: [FlamingoToken, FlamingoToken];
  mintPrSec: number;
  colour: string;
  tradingInfo: {
    symbol: string;
    baseToken: string;
    quoteToken: string;
    quoteDecimals: number;
    maxPriceDecimals: number;
    priceLevelIntervals: string[];
  },
  displayName?: string;
  rewardTokenHomepage?: string;
  liquidityDisabled?: boolean;
  stakingContract?: string;
  stakingDisabled?: boolean;
}