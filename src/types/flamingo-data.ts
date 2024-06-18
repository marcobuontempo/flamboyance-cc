import { HexString } from "./common"

export type FlamingoToken = {
  symbol: string,
  decimals: number,
  hash: HexString,
}

export type FlamingoPool = {
  symbol: string,
  decimals: number,
  hash: HexString,
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
  stakingContract?: HexString,
  stakingDisabled?: boolean,
}