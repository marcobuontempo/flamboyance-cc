import GreenTextCell from '@/components/common/GreenTextCell';
import Table from '@/components/common/Table';
import TokenAmountCell from '@/components/common/TokenAmountCell';
import TruncatedTextCell from '@/components/common/TruncatedTextCell';
import { LiveDataLiquidityPool } from '@/custom-types/api';
import { FlamingoPool, FlamingoToken } from '@/custom-types/flamingo-data';
import usePaginatedData from '@/hooks/usePaginatedData';
import apiClient from '@/services/api-client';
import { formatRawAmountToDecimals, formatUnixTimestamp, poolHashToData, tokenHashToData } from '@/utils/helpers';
import { ColumnDef } from '@tanstack/react-table';

type TransformedLiveDataLiquidityPool = Omit<LiveDataLiquidityPool, 'type' | 'lp_total'> |
{
  time: string;
  block: string;
  type: string;
  lp_combined: FlamingoPool | null;
  lp_amount: string;
  lp_fiat_amount: string;
  token_1_combined: FlamingoToken | null;
  token_1_amount: string;
  token_1_fiat_amount: string;
  token_2_combined: FlamingoToken | null;
  token_2_amount: string;
  token_2_fiat_amount: string;
};

const columns: ColumnDef<TransformedLiveDataLiquidityPool>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'LP Token',
    accessorKey: 'lp_combined',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoPool} amount={info.row.original.lp_amount as string} hideImage />,
  },
  {
    header: `LP Amount (USD)`,
    accessorKey: 'lp_fiat_amount',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Token 1',
    accessorKey: 'token_1_combined',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.token_1_amount as string} />,
  },
  {
    header: `Token 1 Amount (USD)`,
    accessorKey: 'token_1_fiat_amount',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Token 2',
    accessorKey: 'token_2_combined',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.token_2_amount as string} />,
  },
  {
    header: `Token 2 Amount (USD)`,
    accessorKey: 'token_2_fiat_amount',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Block',
    accessorKey: 'block',
  },
  {
    header: 'Address',
    accessorKey: 'user',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
  {
    header: 'TX Hash',
    accessorKey: 'hash',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
];

const transformData = (entry: LiveDataLiquidityPool): TransformedLiveDataLiquidityPool => {
  const lpData = poolHashToData(entry.lp_token);
  const token1Data = tokenHashToData(entry.token_1_hash);
  const token2Data = tokenHashToData(entry.token_2_hash);

  return {
    ...entry,
    time: formatUnixTimestamp(entry.time),
    type: entry.type.replace(/([A-Z])/g, ' $1').trim().toLocaleLowerCase(),
    block: entry.index.toLocaleString('en-US'),
    lp_combined: lpData,
    lp_amount: formatRawAmountToDecimals(parseInt(entry.lp_amount), lpData?.decimals),
    lp_fiat_amount: entry.lp_usd_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    token_1_combined: token1Data,
    token_1_amount: formatRawAmountToDecimals(parseInt(entry.token_1_amount), token1Data?.decimals),
    token_1_fiat_amount: entry.token_1_usd_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    token_2_combined: token2Data,
    token_2_amount: formatRawAmountToDecimals(parseInt(entry.token_2_amount), token2Data?.decimals),
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