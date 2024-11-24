import axios, { AxiosInstance } from 'axios';
import type { AnalyticsDailyMap, AnalyticsMonthlyMap, AnalyticsRollingMap, AnalyticsTotalSupply, AnalyticsUSDValueLocked, CollectionType, DateTimeQuery, HistoryResponse, LatestResponse, LiveDataClaim, LiveDataFiatExchangeRate, LiveDataLend, LiveDataLiquidityPool, LiveDataPrice, LiveDataStake, LiveDataTrade, LiveDataTransfer, MonthQuery, WalletData } from '@custom-types/api';

export class ApiClient {
  private api: AxiosInstance;

  constructor(url?: string) {
    this.api = axios.create({ baseURL: url ? url : "https://neo-api.b-cdn.net" });
  }


  private async fetchData<T>(endpoint: string, params = {}): Promise<T> {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching data from URL:", endpoint, error);
      throw error;
    }
  }


  // Wallet Data

  public getWalletHistory = async (address: string, page: number) => {
    return this.fetchData<HistoryResponse<WalletData>>("/wallet/history", { neo_address: address, page });
  }

  public getWalletLatest = async (address: string) => {
    return this.fetchData<LatestResponse<WalletData>>("/wallet/latest", { neo_address: address });
  }


  // Flamingo Live Data

  public getFlamingoLivedataPricesLatest = async () => {
    return this.fetchData<LiveDataPrice[]>("/flamingo/live-data/prices/latest", {});
  }

  public getFlamingoLivedataPricesFromblock = async (blocknumber: number) => {
    return this.fetchData<LiveDataPrice[]>(`/flamingo/live-data/prices/from-block/${blocknumber}`, {});
  }

  public getFlamingoLivedataPricesFromdatetime = async ({ year, month, day, hour, minute }: DateTimeQuery) => {
    return this.fetchData<LiveDataPrice[]>(`/flamingo/live-data/prices/from-datetime/${year}/${month}/${day}/${hour}/${minute}`, {});
  }

  public getFlamingoLivedataPricesFromtimestamp = async (timestamp: number) => {
    return this.fetchData<LiveDataPrice[]>(`/flamingo/live-data/prices/from-timestamp/${timestamp}`, {});
  }

  public getFlamingoLivedataFiatexchangerate = async (pair: string) => {
    return this.fetchData<LiveDataFiatExchangeRate>(`/flamingo/live-data/fiat-exchange-rate/${pair}`, {});
  }

  public getFlamingoLivedataClaimsHistory = async (page: number) => {
    return this.fetchData<HistoryResponse<LiveDataClaim>>("/flamingo/live-data/claims/history", { page });
  }

  public getFlamingoLivedataClaimsLatest = async () => {
    return this.fetchData<LatestResponse<LiveDataClaim>>("/flamingo/live-data/claims/latest", {});
  }

  public getFlamingoLivedataTradeHistory = async (page: number) => {
    return this.fetchData<HistoryResponse<LiveDataTrade>>("/flamingo/live-data/trade/history", { page });
  }

  public getFlamingoLivedataTradeLatest = async () => {
    return this.fetchData<LatestResponse<LiveDataTrade>>("/flamingo/live-data/trade/latest", {});
  }

  public getFlamingoLivedataLpHistory = async (page: number) => {
    return this.fetchData<HistoryResponse<LiveDataLiquidityPool>>("/flamingo/live-data/lp/history", { page });
  }

  public getFlamingoLivedataLpLatest = async () => {
    return this.fetchData<LatestResponse<LiveDataLiquidityPool>>("/flamingo/live-data/lp/latest", {});
  }

  public getFlamingoLivedataStakingHistory = async (page: number) => {
    return this.fetchData<HistoryResponse<LiveDataStake>>("/flamingo/live-data/staking/history", { page });
  }

  public getFlamingoLivedataStakingLatest = async () => {
    return this.fetchData<LatestResponse<LiveDataStake>>("/flamingo/live-data/staking/latest", {});
  }

  public getFlamingoLivedataLendHistory = async (page: number) => {
    return this.fetchData<HistoryResponse<LiveDataLend>>("/flamingo/live-data/lend/history", { page });
  }

  public getFlamingoLivedataLendLatest = async () => {
    return this.fetchData<LatestResponse<LiveDataLend>>("/flamingo/live-data/lend/latest", {});
  }

  public getFlamingoLivedataTransferHistory = async (page: number) => {
    return this.fetchData<HistoryResponse<LiveDataTransfer>>("/flamingo/live-data/transfer/history", { page });
  }

  public getFlamingoLivedataTransferLatest = async () => {
    return this.fetchData<LatestResponse<LiveDataTransfer>>("/flamingo/live-data/transfer/latest", {});
  }


  // Flamingo Analytics Data

  public getFlamingoAnalyticsMonthhistory = async <K extends CollectionType>(collection: K, { year, month }: MonthQuery) => {
    return this.fetchData<AnalyticsMonthlyMap[K]>(`/flamingo/analytics/month-history/${collection}`, { year, month });
  }

  public getFlamingoAnalyticsMonthlatest = async <K extends CollectionType>(collection: K) => {
    return this.fetchData<AnalyticsMonthlyMap[K]>(`/flamingo/analytics/month-latest/${collection}`, {});
  }

  public getFlamingoAnalyticsDailyhistory = async <K extends CollectionType>(collection: K, { year, month, day }: DateTimeQuery) => {
    return this.fetchData<AnalyticsDailyMap[K]>(`/flamingo/analytics/daily-history/${collection}`, { year, month, day });
  }

  public getFlamingoAnalyticsDailylatest = async <K extends CollectionType>(collection: K) => {
    return this.fetchData<AnalyticsDailyMap[K]>(`/flamingo/analytics/daily-latest/${collection}`, {});
  }

  public getFlamingoAnalyticsRolling30days = async <K extends CollectionType>(collection: K) => {
    return this.fetchData<AnalyticsRollingMap[K]>(`/flamingo/analytics/rolling-30-days/${collection}`, {});
  }

  public getFlamingoAnalyticsFlamingoTotalsupply = async () => {
    return this.fetchData<AnalyticsTotalSupply>("/flamingo/analytics/flamingo/total-supply", {});
  }

  public getFlamingoAnalyticsFlamingoUsdvaluelocked = async () => {
    return this.fetchData<AnalyticsUSDValueLocked>("/flamingo/analytics/flamingo/usd-value-locked", {});
  }


  // Neo Blockchain Data

  public getNeoBlock = async (index: number, flamingoData: boolean) => {
    return this.fetchData<any>("/neo/block", { index, flamingo_data: flamingoData });
  }

  public getNeoBlockLatest = async (flamingoData: boolean) => {
    return this.fetchData<any>("/neo/block/latest", { flamingo_data: flamingoData });
  }

  public getNeoBlocksHistory = async (page: number, flamingoData: boolean) => {
    return this.fetchData<any>("/neo/blocks/history", { page, flamingo_data: flamingoData });
  }

  public getNeoBlocksLatest = async (flamingoData: boolean) => {
    return this.fetchData<any>("/neo/blocks/latest", { flamingo_data: flamingoData });
  }

  public getNeoTransaction = async (txHash: string) => {
    return this.fetchData<any>("/neo/transaction", { tx_hash: txHash });
  }
}


const apiClient = new ApiClient();
export default apiClient;