export type FlamingoToken = {
  symbol: string,
  decimals: number,
  hash: string,
  colour: string,
}

export type FlamingoPool = {
  symbol: string,
  decimals: number,
  hash: string,
  internalPrice: boolean,
  reversePool: boolean,
  targetedIncentivesPool: boolean,
  shouldBeMigrated: boolean,
  rewardToken: FlamingoToken,
  tokens: [FlamingoToken, FlamingoToken],
  mintPrSec: number,
  tradingInfo: {
    symbol: string,
    baseToken: string,
    quoteToken: string,
    quoteDecimals: number,
    maxPriceDecimals: number,
    priceLevelIntervals: string[],
  },
  displayName?: string,
  rewardTokenHomepage?: string,
  liquidityDisabled?: boolean,
  stakingContract?: string,
  stakingDisabled?: boolean,
}