import axios, { AxiosInstance } from 'axios';
import { AnalyticsDailyMap, AnalyticsMonthlyMap, AnalyticsRollingMap, AnalyticsTotalSupply, AnalyticsUSDValueLocked, CollectionType, DateTimeQuery, HistoryResponse, LatestResponse, LiveDataClaim, LiveDataFiatExchangeRate, LiveDataLend, LiveDataLiquidityPool, LiveDataPrice, LiveDataStake, LiveDataTrade, LiveDataTransfer, MonthQuery, WalletClaim, WalletLend, WalletLiquidityPool, WalletStake, WalletTrade, WalletTransfer, WalletWallet } from '../types';

export class ApiClient {
  private api: AxiosInstance;

  constructor(url?: string) {
    this.api = axios.create({ baseURL: url ? url : "https://neo-api.b-cdn.net" });
  }


  private async fetchData<T>(endpoint: string, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data as T;
    } catch (error) {
      console.error("Error fetching data from URL:", endpoint, error);
      throw error;
    }
  }


  // Wallet Data

  public async getWalletWalletHistory(address: string, page: number) {
    return this.fetchData<HistoryResponse<WalletWallet>>("/wallet/wallet/history", { neo_address: address, page });
  }

  public async getWalletWalletLatest(address: string) {
    return this.fetchData<LatestResponse<WalletWallet>>("/wallet/wallet/latest", { neo_address: address });
  }

  public async getWalletClaimsHistory(address: string, page: number) {
    return this.fetchData<HistoryResponse<WalletClaim>>("/wallet/claims/history", { neo_address: address, page });
  }

  public async getWalletClaimsLatest(address: string) {
    return this.fetchData<LatestResponse<WalletClaim>>("/wallet/claims/latest", { neo_address: address });
  }

  public async getWalletTradeHistory(address: string, page: number) {
    return this.fetchData<HistoryResponse<WalletTrade>>("/wallet/trade/history", { neo_address: address, page });
  }

  public async getWalletTradeLatest(address: string) {
    return this.fetchData<LatestResponse<WalletTrade>>("/wallet/trade/latest", { neo_address: address });
  }

  public async getWalletLpHistory(address: string, page: number) {
    return this.fetchData<HistoryResponse<WalletLiquidityPool>>("/wallet/lp/history", { neo_address: address, page });
  }

  public async getWalletLpLatest(address: string) {
    return this.fetchData<LatestResponse<WalletLiquidityPool>>("/wallet/lp/latest", { neo_address: address });
  }

  public async getWalletStakingHistory(address: string, page: number) {
    return this.fetchData<HistoryResponse<WalletStake>>("/wallet/staking/history", { neo_address: address, page });
  }

  public async getWalletStakingLatest(address: string) {
    return this.fetchData<LatestResponse<WalletStake>>("/wallet/staking/latest", { neo_address: address });
  }

  public async getWalletLendHistory(address: string, page: number) {
    return this.fetchData<HistoryResponse<WalletLend>>("/wallet/lend/history", { neo_address: address, page });
  }

  public async getWalletLendLatest(address: string) {
    return this.fetchData<LatestResponse<WalletLend>>("/wallet/lend/latest", { neo_address: address });
  }

  public async getWalletTransferHistory(address: string, page: number) {
    return this.fetchData<HistoryResponse<WalletTransfer>>("/wallet/transfer/history", { neo_address: address, page });
  }

  public async getWalletTransferLatest(address: string) {
    return this.fetchData<LatestResponse<WalletTransfer>>("/wallet/transfer/latest", { neo_address: address });
  }

  // Flamingo Live Data

  public async getFlamingoLivedataPricesLatest() {
    return this.fetchData<LiveDataPrice[]>("/flamingo/live-data/prices/latest", {});
  }

  public async getFlamingoLivedataPricesFromblock(blocknumber: number) {
    return this.fetchData<LiveDataPrice[]>(`/flamingo/live-data/prices/from-block/${blocknumber}`, {});
  }

  public async getFlamingoLivedataPricesFromdatetime({ year, month, day, hour, minute }: DateTimeQuery) {
    return this.fetchData<LiveDataPrice[]>(`/flamingo/live-data/prices/from-datetime/${year}/${month}/${day}/${hour}/${minute}`, {});
  }

  public async getFlamingoLivedataPricesFromtimestamp(timestamp: number) {
    return this.fetchData<LiveDataPrice[]>(`/flamingo/live-data/prices/from-timestamp/${timestamp}`, {});
  }

  public async getFlamingoLivedataFiatexchangerate(pair: string) {
    return this.fetchData<LiveDataFiatExchangeRate>(`/flamingo/live-data/fiat-exchange-rate/${pair}`, {});
  }

  public async getFlamingoLivedataClaimsHistory(page: number) {
    return this.fetchData<HistoryResponse<LiveDataClaim>>("/flamingo/live-data/claims/history", { page });
  }

  public async getFlamingoLivedataClaimsLatest() {
    return this.fetchData<LatestResponse<LiveDataClaim>>("/flamingo/live-data/claims/latest", {});
  }

  public async getFlamingoLivedataTradeHistory(page: number) {
    return this.fetchData<HistoryResponse<LiveDataTrade>>("/flamingo/live-data/trade/history", { page });
  }

  public async getFlamingoLivedataTradeLatest() {
    return this.fetchData<LatestResponse<LiveDataTrade>>("/flamingo/live-data/trade/latest", {});
  }

  public async getFlamingoLivedataLpHistory(page: number) {
    return this.fetchData<HistoryResponse<LiveDataLiquidityPool>>("/flamingo/live-data/lp/history", { page });
  }

  public async getFlamingoLivedataLpLatest() {
    return this.fetchData<LatestResponse<LiveDataLiquidityPool>>("/flamingo/live-data/lp/latest", {});
  }

  public async getFlamingoLivedataStakingHistory(page: number) {
    return this.fetchData<HistoryResponse<LiveDataStake>>("/flamingo/live-data/staking/history", { page });
  }

  public async getFlamingoLivedataStakingLatest() {
    return this.fetchData<LatestResponse<LiveDataStake>>("/flamingo/live-data/staking/latest", {});
  }

  public async getFlamingoLivedataLendHistory(page: number) {
    return this.fetchData<HistoryResponse<LiveDataLend>>("/flamingo/live-data/lend/history", { page });
  }

  public async getFlamingoLivedataLendLatest() {
    return this.fetchData<LatestResponse<LiveDataLend>>("/flamingo/live-data/lend/latest", {});
  }

  public async getFlamingoLivedataTransferHistory(page: number) {
    return this.fetchData<HistoryResponse<LiveDataTransfer>>("/flamingo/live-data/transfer/history", { page });
  }

  public async getFlamingoLivedataTransferLatest() {
    return this.fetchData<LatestResponse<LiveDataTransfer>>("/flamingo/live-data/transfer/latest", {});
  }

  // Flamingo Analytics Data

  public async getFlamingoAnalyticsMonthhistory(collection: CollectionType, { year, month }: MonthQuery) {
    return this.fetchData<AnalyticsMonthlyMap[typeof collection]>(`/flamingo/analytics/month-history/${collection}`, { year, month });
  }

  public async getFlamingoAnalyticsMonthlatest(collection: CollectionType) {
    return this.fetchData<AnalyticsMonthlyMap[typeof collection]>(`/flamingo/analytics/month-latest/${collection}`, {});
  }

  public async getFlamingoAnalyticsDailyhistory(collection: CollectionType, { year, month, day }: DateTimeQuery) {
    return this.fetchData<AnalyticsDailyMap[typeof collection]>(`/flamingo/analytics/daily-history/${collection}`, { year, month, day });
  }

  public async getFlamingoAnalyticsDailylatest(collection: CollectionType) {
    return this.fetchData<AnalyticsDailyMap[typeof collection]>(`/flamingo/analytics/daily-latest/${collection}`, {});
  }

  public async getFlamingoAnalyticsRolling30days(collection: CollectionType) {
    return this.fetchData<AnalyticsRollingMap[typeof collection]>(`/flamingo/analytics/rolling-30-days/${collection}`, {});
  }

  public async getFlamingoAnalyticsFlamingoTotalsupply() {
    return this.fetchData<AnalyticsTotalSupply>("/flamingo/analytics/flamingo/total-supply", {});
  }

  public async getFlamingoAnalyticsFlamingoUsdvaluelocked() {
    return this.fetchData<AnalyticsUSDValueLocked>("/flamingo/analytics/flamingo/usd-value-locked", {});
  }

  // Neo Blockchain Data

  public async getNeoBlock(index: number, flamingoData: boolean) {
    return this.fetchData<any>("/neo/block", { index, flamingo_data: flamingoData });
  }

  public async getNeoBlockLatest(flamingoData: boolean) {
    return this.fetchData<any>("/neo/block/latest", { flamingo_data: flamingoData });
  }

  public async getNeoBlocksHistory(page: number, flamingoData: boolean) {
    return this.fetchData<any>("/neo/blocks/history", { page, flamingo_data: flamingoData });
  }

  public async getNeoBlocksLatest(flamingoData: boolean) {
    return this.fetchData<any>("/neo/blocks/latest", { flamingo_data: flamingoData });
  }

  public async getNeoTransaction(txHash: string) {
    return this.fetchData<any>("/neo/transaction", { tx_hash: txHash });
  }
}


const apiClient = new ApiClient();
export default apiClient;