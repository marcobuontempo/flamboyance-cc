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


/* Base Responses for Flamingo Finance Data */

export type LatestResponse<T> = {
  data: T[],
  pages: number,
  total: number,
};

export type HistoryResponse<T> = T[];


/* Wallet Data */

export type WalletData = {
  address?: string,
  created_at_block?: number,
  created_at_time?: number,
  last_snapshot?: number,
  last_seen_block?: number,
  last_seen_time?: number,
  balances?: {
    [token: string]: string,
  },
  stats?: {
    gas_claimed?: string,
    gas_burned?: string,
    transactions?: string,
    total_liquidity_added_usd?: string,
    total_times_liquidity_added?: string,
    total_times_liquidity_removed?: string,
    total_trades?: string,
    total_trading_fees_usd?: string,
  },
  trading?: {
    [token: string]: {
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
    [key: string]: {
      [key: string]: string,
    },
  },
  liquidity?: {
    [pool: string]: {
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

/* Live Data */

export type LiveDataPrice = {
  symbol: string,
  unwrappedSymbol: string,
  hash: string,
  usd_price: number,
};

export type LiveDataFiatExchangeRate = number;

export type LiveDataClaim = {
  unique_id: string,
  transaction_hash: string,
  time: number,
  index: number,
  user: string,
  pool: string,
  token: string,
  amount: string,
  amount_usd: number,
};

export type LiveDataTrade = WalletTrade;

export type LiveDataLiquidityPool = WalletLiquidityPool;

export type LiveDataStake = WalletStake;

export type LiveDataLend = WalletLend;

export type LiveDataTransfer = WalletTransfer;


/* Analytics Data */

export type AnalyticsClaim = {
  date: string,
  claim_data: {
    claims: string,
    claims_usd: string,
    [key: string]: {
      claims: string,
      claims_usd: string,
      total_amount: string,
    } | string,
  },
};

export type AnalyticsTotalValueLocked = {
  date: string,
  tvl_data: {
    pool_usd: string,
    flund_usd: string,
    lend_usd: string,
    tokens: {
      [key: string]: string,
    },
  },
};

export type AnalyticsFToken = {
  date: string,
  f_token_data: {
    [key: string]: {
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

export type AnalyticsPool = {
  date: string,
  pool_data: {
    [key: string]: {
      tokens: {
        [key: string]: {
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

export type AnalyticsToken = {
  date: string,
  token_data: {
    [key: string]: {
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

export type AnalyticsTotal = {
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

export type AnalyticsTotalSupply = number;

export type AnalyticsUSDValueLocked = string;

export type AnalyticsDailyMap = {
  'claim_data': AnalyticsClaim,
  'tvl_data': AnalyticsTotalValueLocked,
  'f_token_data': AnalyticsFToken,
  'pool_data': AnalyticsPool,
  'token_data': AnalyticsToken,
  'total_data': AnalyticsTotal,
};

export type AnalyticsMonthlyMap = {
  'claim_data': AnalyticsClaim[],
  'tvl_data': AnalyticsTotalValueLocked[],
  'f_token_data': AnalyticsFToken[],
  'pool_data': AnalyticsPool[],
  'token_data': AnalyticsToken[],
  'total_data': AnalyticsTotal[],
};

export type AnalyticsRollingMap = {
  'claim_data': AnalyticsClaim[],
  'tvl_data': AnalyticsTotalValueLocked[],
  'f_token_data': AnalyticsFToken[],
  'pool_data': AnalyticsPool[],
  'token_data': AnalyticsToken[],
  'total_data': AnalyticsTotal[],
};
