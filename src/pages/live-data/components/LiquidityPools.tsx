import { ColumnDef } from "@tanstack/react-table";
import { LiveDataLiquidityPool } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";
import { useContext } from "react";
import { UserSessionContext } from "../../../contexts/UserSessionContext";
import { convertFiatCurrency, convertRawAmountToDecimals, tokenHashToData } from "../../../utils/helpers";

type TransformedLiveDataLiquidityPool = LiveDataLiquidityPool |
{
  time: string;
  lp_fiat_amount: string;
  token_1_fiat_amount: string;
  token_2_fiat_amount: string;
};

export default function LiquidityPools() {
  const sessionContext = useContext(UserSessionContext);

  const columns: ColumnDef<TransformedLiveDataLiquidityPool>[] = [
    {
      header: 'Index',
      accessorKey: 'index',
    },
    {
      header: 'Time',
      accessorKey: 'time',
    },
    {
      header: 'Hash',
      accessorKey: 'hash',
    },
    {
      header: 'User',
      accessorKey: 'user',
    },
    {
      header: 'LP Token',
      accessorKey: 'lp_token',
    },
    {
      header: 'Type',
      accessorKey: 'type',
    },
    {
      header: 'LP Amount',
      accessorKey: 'lp_amount',
    },
    {
      header: `LP Amount (${sessionContext?.currency})`,
      accessorKey: 'lp_fiat_amount',
    },
    {
      header: 'Token 1 Hash',
      accessorKey: 'token_1_hash',
    },
    {
      header: 'Token 1 Amount',
      accessorKey: 'token_1_amount',
    },
    {
      header: `Token 1 Amount (${sessionContext?.currency})`,
      accessorKey: 'token_1_usd_amount',
    },
    {
      header: 'Token 2 Hash',
      accessorKey: 'token_2_hash',
    },
    {
      header: 'Token 2 Amount',
      accessorKey: 'token_2_amount',
    },
    {
      header: `Token 2 Amount (${sessionContext?.currency})`,
      accessorKey: 'token_2_usd_amount',
    },
  ];

  const transformData = (entry: LiveDataLiquidityPool): TransformedLiveDataLiquidityPool => {
    const token1 = tokenHashToData(entry.token_1_hash);
    const token2 = tokenHashToData(entry.token_2_hash);

    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      lp_fiat_amount: convertFiatCurrency(entry.lp_usd_amount, sessionContext?.exchangeRate, 4),
      token_1_amount: convertRawAmountToDecimals(entry.token_1_amount, token1?.decimals, 4),
      token_1_fiat_amount: convertFiatCurrency(entry.token_1_usd_amount, sessionContext?.exchangeRate, 4),
      token_2_amount: convertRawAmountToDecimals(entry.token_2_amount, token2?.decimals, 4),
      token_2_fiat_amount: convertFiatCurrency(entry.token_2_usd_amount, sessionContext?.exchangeRate, 4),
    };
  };

  const options = {
    queryKey: 'live-data-liquidity-pools',
    fetchLatest: () => apiClient.getFlamingoLivedataLpLatest(),
    fetchHistory: (page: number) => apiClient.getFlamingoLivedataLpHistory(page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<LiveDataLiquidityPool, TransformedLiveDataLiquidityPool>(options);

  return (
    <TableWrapper
      data={data}
      columns={columns}
      pageCount={pageCount}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      isPending={isPending}
      isError={isError}
    />
  )
}