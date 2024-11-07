import Table from '@/components/common/Table';
import { LiveDataLiquidityPool } from '@/custom-types/api';
import usePaginatedData from '@/hooks/usePaginatedData';
import apiClient from '@/services/api-client';
import { tokenHashToData } from '@/utils/helpers';
import { ColumnDef } from '@tanstack/react-table';

type TransformedLiveDataLiquidityPool = LiveDataLiquidityPool |
{
  time: string;
  lp_fiat_amount: string;
  token_1_fiat_amount: string;
  token_2_fiat_amount: string;
};

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
    header: `LP Amount (USD)`,
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
    header: `Token 1 Amount (USD)`,
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
    header: `Token 2 Amount (USD)`,
    accessorKey: 'token_2_usd_amount',
  },
];

const transformData = (entry: LiveDataLiquidityPool): TransformedLiveDataLiquidityPool => {
  const token1 = tokenHashToData(entry.token_1_hash);
  const token2 = tokenHashToData(entry.token_2_hash);

  return {
    ...entry,
    time: new Date(entry.time).toUTCString(),
    lp_fiat_amount: entry.lp_usd_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    token_1_amount: entry.token_1_amount,
    token_1_fiat_amount: entry.token_1_usd_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    token_2_amount: entry.token_2_amount,
    token_2_fiat_amount: entry.token_2_usd_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  };
};

const options = {
  queryKey: 'live-data-liquidity-pools',
  fetchLatest: () => apiClient.getFlamingoLivedataLpLatest(),
  fetchHistory: (page: number) => apiClient.getFlamingoLivedataLpHistory(page),
  transformData: transformData,
}

export default function LiquidityPools() {
  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
    refetch,
  } = usePaginatedData<LiveDataLiquidityPool, TransformedLiveDataLiquidityPool>(options);

  return (
    <Table
      data={data}
      columns={columns}
      pageCount={pageCount}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
    />
  )
}