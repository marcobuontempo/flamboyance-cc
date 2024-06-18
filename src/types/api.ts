import { HexString } from './';


/* Queries */

export type CollectionType = 'claim_data' | 'tvl_data' | 'f_token_data' | 'pool_data' | 'token_data' | 'total_data';

export type DateTimeQuery = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
};

export type MonthQuery = {
  year: number,
  month: number,
};


/* Base Response for Flamingo Finance Data */

type FlamingoFinanceBaseResponseType<T> = {
  data: T[],
  pages: number,
  total: number,
};


/* Wallet Data */

type WalletWallet = {
  address: HexString,
  created_at_block: number,
  created_at_time: number,
  last_snapshot: number,
  last_seen_block: number,
  last_seen_time: number,
  balances: {
    [token: HexString]: string,
  },
  stats: {
    gas_claimed: string,
    gas_burned: string,
    transactions: string,

    total_liquidity_added_usd?: string,
    total_times_liquidity_added?: string,
    total_times_liquidity_removed?: string,
    total_trades?: string,
    total_trading_fees_usd?: string,
  },
  trading?: {
    [token: HexString]: {
      token_a: string,
      token_b: string,
      from_b: string,
      to_a: string,
      from_b_usd: string,
      to_a_usd: string,
      fees_b: string,
      fees_b_usd: string,
      times_swapped_b_to_a: string,
      from_a: string,
      to_b: string,
      from_a_usd: string,
      to_b_usd: string,
      fees_a: string,
      times_swapped_a_to_b: string,
    }
  },
  internal_balances?: {
    [key: HexString]: {
      [key: HexString]: string,
    },
  },
  liquidity?: {
    [pool: HexString]: {
      token_1: string,
      token_2: string,
      token_1_amount_current: string,
      token_2_amount_current: string,
      token_1_amount_total_added: string,
      token_2_amount_total_added: string,
      token_1_usd_amount: string,
      token_2_usd_amount: string,
      lp_token_amount: string,
      lp_token_usd_amount: string,
      times_added: string,
      token_1_amount_total_removed: string,
      token_2_amount_total_removed: string,
      times_removed: string,
    },
  },
};

type WalletClaim = {
  unique_id: HexString,
  transaction_hash: HexString,
  time: number,
  index: number,
  user: HexString,
  from_token: HexString,
  from_amount: string,
  from_amount_usd: number,
  to_token: HexString,
  to_amount: string,
  to_amount_usd: number,
  total_usd_fees: number,
};

type WalletTrade = {
  transaction_hash: HexString,
  time: number,
  index: number,
  user: HexString,
  from_token: HexString,
  from_amount: string,
  from_amount_usd: number,
  to_token: string,
  to_amount: string,
  to_amount_usd: number,
  total_usd_fees: number,
  swaps: {
    unique_id: HexString,
    pool_hash: HexString,
    from_token: HexString,
    from_amount: string,
    from_amount_usd: number,
    to_token: string,
    to_amount: string,
    to_amount_usd: number,
    fee_amount: string,
    fee_amount_usd: number,
  }[],
};

type WalletLiquidityPool = {
  index: number,
  time: number,
  hash: HexString,
  user: HexString,
  lp_token: HexString,
  type: 'removeLiquidity' | 'addLiquidity',
  lp_amount: string,
  lp_usd_amount: number,
  token_1_hash: HexString,
  token_1_amount: string,
  token_1_usd_amount: number,
  token_2_hash: HexString,
  token_2_amount: string,
  token_2_usd_amount: number,
};

type WalletStake = {
  time: number,
  index: number,
  unique_id: HexString,
  type: 'stake' | 'unstake',
  user: HexString,
  contract: HexString,
  pool: HexString,
  amount: string,
  usd_amount: number,
  hash: HexString,
};

type WalletLend = {
  type: 'RepayFToken' | 'WithdrawCollateral' | 'DepositCollateral' | 'MintFToken',
  tx_id: HexString,
  unique_id: HexString,
  time: number,
  block: number,
  collateral_usd_price: number,
  f_token_usd_price: number,
  collateral_hash: HexString,
  address: HexString,
  f_token_total: string,
  f_token_repay: string,
  collateral_total: string,
};

type WalletTransfer = {
  time: number,
  index: number,
  hash: HexString,
  unique_id: HexString,
  contract: HexString,
  amount: string,
  sender: HexString | 'Mint',
  receiver: HexString,
  type: 'Transfer' | 'Mint/Burn',
};


/* Live Data */

type LiveDataPrice = {
  symbol: string,
  unwrappedSymbol: string,
  hash: HexString,
  usd_price: number,
};

type LiveDataFiatExchangeRate = number;

export type LiveDataClaim = {
  unique_id: HexString,
  transaction_hash: HexString,
  time: number,
  index: number,
  user: HexString,
  pool: HexString,
  token: HexString,
  amount: string,
  amount_usd: number,
};

type LiveDataTrade = WalletTrade;

type LiveDataLiquidityPool = WalletLiquidityPool;

type LiveDataStake = WalletStake;

type LiveDataLend = WalletLend;

type LiveDataTransfer = WalletTransfer;


/* Analytics Data */

type AnalyticsClaim = {
  date: string,
  claim_data: {
    claims: string,
    claims_usd: string,
    [key: HexString]: {
      claims: string,
      claims_usd: string,
      total_amount: string,
    },
  },
};

type AnalyticsTotalValueLocked = {
  date: string,
  tvl_data: {
    pool_usd: string,
    flund_usd: string,
    lend_usd: string,
    tokens: {
      [key: HexString]: string,
    },
  },
};

type AnalyticsFToken = {
  date: string,
  f_token_data: {
    [key: HexString]: {
      deposit_count?: string,
      deposited_collateral?: string,
      withdraw_count?: string,
      withdrawn_collateral?: string,
      repay_count?: string,
      f_token_interest?: string,
      f_token_repay_total?: string,
      mint_count?: string,
      f_token_minted_total?: string,
      liquidation_count?: string,
      liquidated_collateral?: string,
    },
  }
};

type AnalyticsPool = {
  date: string,
  pool_data: {
    [key: HexString]: {
      tokens: {
        [key: HexString]: {
          from_amount_total?: string,
          from_amounnt_usd_total?: string,
          fee_amount_usd_total?: string,
          from_swap_count?: string,
          to_amount_total?: string,
          to_amount_usd_total?: string,
          to_swap_count?: string,
          add_liquidity_tokens?: string,
          add_liquidity_tokens_usd?: string,
          remove_liquidity_tokens?: string,
          remove_liquidity_tokens_usd?: string,
        },
      },
      swaps: string,
      fees_usd_total: string,
      volume_usd_total: string,
      reward_token?: string,
      total_amount_claimed?: string,
      total_amount_usd_claimed?: string,
      claims_count?: string,
      add_liquidity_count?: string,
      add_liquidity_tokens?: string,
      add_liquidity_tokens_usd?: string,
      remove_liquidity_count?: string,
      remove_liquidity_tokens?: string,
      remove_liquidity_tokens_usd?: string,
      stake_count?: string,
      stake_tokens?: string,
      stake_tokens_usd?: string,
      unstake_count?: string,
      unstake_tokens?: string,
      unstake_tokens_usd?: string,
    },
  };
};

type AnalyticsToken = {
  date: string,
  token_data: {
    [key: HexString]: {
      from_amount_total?: string,
      from_amount_usd_total?: string,
      fee_amount_usd_total?: string,
      from_swap_count?: string,
      to_amount_total?: string,
      to_amount_usd_total?: string,
      to_swap_count?: string,
      add_liquidity_count?: string,
      add_liquidity_tokens?: string,
      add_liquidity_tokens_usd?: string,
      remove_liquidity_count?: string,
      remove_liquidity_tokens?: string,
      remove_liquidity_tokens_usd?: string,
    },
  },
};

type AnalyticsTotal = {
  date: string,
  total_data: {
    swaps: string,
    swap_fee_usd: string,
    swap_volume: string,
    add_liquidity_count: string,
    add_liquidity_usd: string,
    remove_liquidity_count: string,
    remove_liquidity_usd: string,
    stake_count: string,
    stake_usd: string,
    unstake_count: string,
    unstake_usd: string,
    flund_total_usd_value: string,
    flund_events: string,
    total_transactions: string,
    total_gas_burned: string,
    claims: string,
    claims_usd: string,
  },
};

type AnalyticsTotalSupply = number;

type AnalyticsUSDValueLocked = string;


/* API Responses */

export type WalletWalletResponse = FlamingoFinanceBaseResponseType<WalletWallet>;

export type WalletClaimResponse = FlamingoFinanceBaseResponseType<WalletClaim>;

export type WalletTradeResponse = FlamingoFinanceBaseResponseType<WalletTrade>;

export type WalletLiquidityPoolResponse = FlamingoFinanceBaseResponseType<WalletLiquidityPool>;

export type WalletStakeResponse = FlamingoFinanceBaseResponseType<WalletStake>;

export type WalletLendResponse = FlamingoFinanceBaseResponseType<WalletLend>;

export type WalletTransferResponse = FlamingoFinanceBaseResponseType<WalletTransfer>;

export type LiveDataPricesResponse = LiveDataPrice[];

export type LiveDataFiatExchangeRateResponse = LiveDataFiatExchangeRate;

export type LiveDataClaimResponse = FlamingoFinanceBaseResponseType<LiveDataClaim>;

export type LiveDataTradeResponse = FlamingoFinanceBaseResponseType<LiveDataTrade>;

export type LiveDataLiquidityPoolResponse = FlamingoFinanceBaseResponseType<LiveDataLiquidityPool>;

export type LiveDataStakeResponse = FlamingoFinanceBaseResponseType<LiveDataStake>;

export type LiveDataLendResponse = FlamingoFinanceBaseResponseType<LiveDataLend>;

export type LiveDataTransferResponse = FlamingoFinanceBaseResponseType<LiveDataTransfer>;

export type AnalyticsDailyResponseMap = {
  'claim_data': AnalyticsClaim,
  'tvl_data': AnalyticsTotalValueLocked,
  'f_token_data': AnalyticsFToken,
  'pool_data': AnalyticsPool,
  'token_data': AnalyticsToken,
  'total_data': AnalyticsTotal,
};

export type AnalyticsMonthlyResponseMap = {
  'claim_data': AnalyticsClaim[],
  'tvl_data': AnalyticsTotalValueLocked[],
  'f_token_data': AnalyticsFToken[],
  'pool_data': AnalyticsPool[],
  'token_data': AnalyticsToken[],
  'total_data': AnalyticsTotal[],
};

export type AnalyticsRollingResponseMap = {
  'claim_data': AnalyticsClaim[],
  'tvl_data': AnalyticsTotalValueLocked[],
  'f_token_data': AnalyticsFToken[],
  'pool_data': AnalyticsPool[],
  'token_data': AnalyticsToken[],
  'total_data': AnalyticsTotal[],
};

export type AnalyticsFlamingoTotalSupplyResponse = AnalyticsTotalSupply;

export type AnalyticsUSDValueLockedResponse = AnalyticsUSDValueLocked;
