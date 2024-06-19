import { ColumnDef } from "@tanstack/react-table";
import { LiveDataLiquidityPool } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";

type TransformedLiveDataLiquidityPool = LiveDataLiquidityPool;

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
    header: 'LP Amount (USD)',
    accessorKey: 'lp_usd_amount',
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
    header: 'Token 1 Amount (USD)',
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
    header: 'Token 2 Amount (USD)',
    accessorKey: 'token_2_usd_amount',
  },
];

const transformData = (entry: LiveDataLiquidityPool) => {
  return entry;
};

export default function LiquidityPools() {
  const options = {
    queryKey: 'live-data-liquidity-pools',
    fetchLatest: apiClient.getFlamingoLivedataLpLatest,
    fetchHistory: apiClient.getFlamingoLivedataLpHistory,
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