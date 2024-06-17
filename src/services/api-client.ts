import axios, { AxiosInstance } from 'axios';
import { AnalyticsDailyResponseMap, AnalyticsFlamingoTotalSupplyResponse, AnalyticsMonthlyResponseMap, AnalyticsRollingResponseMap, AnalyticsUSDValueLockedResponse, CollectionType, DateTimeQuery, LiveDataClaimResponse, LiveDataFiatExchangeRateResponse, LiveDataLendResponse, LiveDataLiquidityPoolResponse, LiveDataPricesResponse, LiveDataStakeResponse, LiveDataTradeResponse, LiveDataTransferResponse, MonthQuery, WalletClaimResponse, WalletLendResponse, WalletLiquidityPoolResponse, WalletStakeResponse, WalletTradeResponse, WalletTransferResponse, WalletWalletResponse } from '../types';

export default class ApiClient {
  api: AxiosInstance;

  constructor(url?: string) {
    this.api = axios.create({ baseURL: url ? url : "https://neo-api.b-cdn.net" });
  }


  // PRIVATE

  async fetchData<T>(endpoint: string, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data as T;
    } catch (error) {
      console.error("Error fetching data from URL:", endpoint, error);
      throw error;
    }
  }


  // PUBLIC

  // Wallet Data

  async getWalletWalletHistory(address: string, page: number) {
    return this.fetchData<WalletWalletResponse>("/wallet/wallet/history", { neo_address: address, page });
  }

  async getWalletWalletLatest(address: string) {
    return this.fetchData<WalletWalletResponse>("/wallet/wallet/latest", { neo_address: address });
  }

  async getWalletClaimsHistory(address: string, page: number) {
    return this.fetchData<WalletClaimResponse>("/wallet/claims/history", { neo_address: address, page });
  }

  async getWalletClaimsLatest(address: string) {
    return this.fetchData<WalletClaimResponse>("/wallet/claims/latest", { neo_address: address });
  }

  async getWalletTradeHistory(address: string, page: number) {
    return this.fetchData<WalletTradeResponse>("/wallet/trade/history", { neo_address: address, page });
  }

  async getWalletTradeLatest(address: string) {
    return this.fetchData<WalletTradeResponse>("/wallet/trade/latest", { neo_address: address });
  }

  async getWalletLpHistory(address: string, page: number) {
    return this.fetchData<WalletLiquidityPoolResponse>("/wallet/lp/history", { neo_address: address, page });
  }

  async getWalletLpLatest(address: string) {
    return this.fetchData<WalletLiquidityPoolResponse>("/wallet/lp/latest", { neo_address: address });
  }

  async getWalletStakingHistory(address: string, page: number) {
    return this.fetchData<WalletStakeResponse>("/wallet/staking/history", { neo_address: address, page });
  }

  async getWalletStakingLatest(address: string) {
    return this.fetchData<WalletStakeResponse>("/wallet/staking/latest", { neo_address: address });
  }

  async getWalletLendHistory(address: string, page: number) {
    return this.fetchData<WalletLendResponse>("/wallet/lend/history", { neo_address: address, page });
  }

  async getWalletLendLatest(address: string) {
    return this.fetchData<WalletLendResponse>("/wallet/lend/latest", { neo_address: address });
  }

  async getWalletTransferHistory(address: string, page: number) {
    return this.fetchData<WalletTransferResponse>("/wallet/transfer/history", { neo_address: address, page });
  }

  async getWalletTransferLatest(address: string) {
    return this.fetchData<WalletTransferResponse>("/wallet/transfer/latest", { neo_address: address });
  }

  // Flamingo Live Data

  async getFlamingoLivedataPricesLatest() {
    return this.fetchData<LiveDataPricesResponse>("/flamingo/live-data/prices/latest", {});
  }

  async getFlamingoLivedataPricesFromblock(blocknumber: number) {
    return this.fetchData<LiveDataPricesResponse>(`/flamingo/live-data/prices/from-block/${blocknumber}`, {});
  }

  async getFlamingoLivedataPricesFromdatetime({ year, month, day, hour, minute }: DateTimeQuery) {
    return this.fetchData<LiveDataPricesResponse>(`/flamingo/live-data/prices/from-datetime/${year}/${month}/${day}/${hour}/${minute}`, {});
  }

  async getFlamingoLivedataPricesFromtimestamp(timestamp: number) {
    return this.fetchData<LiveDataPricesResponse>(`/flamingo/live-data/prices/from-timestamp/${timestamp}`, {});
  }

  async getFlamingoLivedataFiatexchangerate(pair: string) {
    return this.fetchData<LiveDataFiatExchangeRateResponse>(`/flamingo/live-data/fiat-exchange-rate/${pair}`, {});
  }

  async getFlamingoLivedataClaimsHistory(page: number) {
    return this.fetchData<LiveDataClaimResponse>("/flamingo/live-data/claims/history", { page });
  }

  async getFlamingoLivedataClaimsLatest() {
    return this.fetchData<LiveDataClaimResponse>("/flamingo/live-data/claims/latest", {});
  }

  async getFlamingoLivedataTradeHistory(page: number) {
    return this.fetchData<LiveDataTradeResponse>("/flamingo/live-data/trade/history", { page });
  }

  async getFlamingoLivedataTradeLatest() {
    return this.fetchData<LiveDataTradeResponse>("/flamingo/live-data/trade/latest", {});
  }

  async getFlamingoLivedataLpHistory(page: number) {
    return this.fetchData<LiveDataLiquidityPoolResponse>("/flamingo/live-data/lp/history", { page });
  }

  async getFlamingoLivedataLpLatest() {
    return this.fetchData<LiveDataLiquidityPoolResponse>("/flamingo/live-data/lp/latest", {});
  }

  async getFlamingoLivedataStakingHistory(page: number) {
    return this.fetchData<LiveDataStakeResponse>("/flamingo/live-data/staking/history", { page });
  }

  async getFlamingoLivedataStakingLatest() {
    return this.fetchData<LiveDataStakeResponse>("/flamingo/live-data/staking/latest", {});
  }

  async getFlamingoLivedataLendHistory(page: number) {
    return this.fetchData<LiveDataLendResponse>("/flamingo/live-data/lend/history", { page });
  }

  async getFlamingoLivedataLendLatest() {
    return this.fetchData<LiveDataLendResponse>("/flamingo/live-data/lend/latest", {});
  }

  async getFlamingoLivedataTransferHistory(page: number) {
    return this.fetchData<LiveDataTransferResponse>("/flamingo/live-data/transfer/history", { page });
  }

  async getFlamingoLivedataTransferLatest() {
    return this.fetchData<LiveDataTransferResponse>("/flamingo/live-data/transfer/latest", {});
  }

  // Flamingo Analytics Data

  async getFlamingoAnalyticsMonthhistory(collection: CollectionType, { year, month }: MonthQuery) {
    return this.fetchData<AnalyticsMonthlyResponseMap[typeof collection]>(`/flamingo/analytics/month-history/${collection}`, { year, month });
  }

  async getFlamingoAnalyticsMonthlatest(collection: CollectionType) {
    return this.fetchData<AnalyticsMonthlyResponseMap[typeof collection]>(`/flamingo/analytics/month-latest/${collection}`, {});
  }

  async getFlamingoAnalyticsDailyhistory(collection: CollectionType, { year, month, day }: DateTimeQuery) {
    return this.fetchData<AnalyticsDailyResponseMap[typeof collection]>(`/flamingo/analytics/daily-history/${collection}`, { year, month, day });
  }

  async getFlamingoAnalyticsDailylatest(collection: CollectionType) {
    return this.fetchData<AnalyticsDailyResponseMap[typeof collection]>(`/flamingo/analytics/daily-latest/${collection}`, {});
  }

  async getFlamingoAnalyticsRolling30days(collection: CollectionType) {
    return this.fetchData<AnalyticsRollingResponseMap[typeof collection]>(`/flamingo/analytics/rolling-30-days/${collection}`, {});
  }

  async getFlamingoAnalyticsFlamingoTotalsupply() {
    return this.fetchData<AnalyticsFlamingoTotalSupplyResponse>("/flamingo/analytics/flamingo/total-supply", {});
  }

  async getFlamingoAnalyticsFlamingoUsdvaluelocked() {
    return this.fetchData<AnalyticsUSDValueLockedResponse>("/flamingo/analytics/flamingo/usd-value-locked", {});
  }

  // Neo Blockchain Data

  async getNeoBlock(index: number, flamingoData: boolean) {
    return this.fetchData<any>("/neo/block", { index, flamingo_data: flamingoData });
  }

  async getNeoBlockLatest(flamingoData: boolean) {
    return this.fetchData<any>("/neo/block/latest", { flamingo_data: flamingoData });
  }

  async getNeoBlocksHistory(page: number, flamingoData: boolean) {
    return this.fetchData<any>("/neo/blocks/history", { page, flamingo_data: flamingoData });
  }

  async getNeoBlocksLatest(flamingoData: boolean) {
    return this.fetchData<any>("/neo/blocks/latest", { flamingo_data: flamingoData });
  }

  async getNeoTransaction(txHash: string) {
    return this.fetchData<any>("/neo/transaction", { tx_hash: txHash });
  }
}
