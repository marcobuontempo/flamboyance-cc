import GreenTextCell from '@/components/common/GreenTextCell';
import Table from '@/components/common/Table';
import TokenAmountCell from '@/components/common/TokenAmountCell';
import TruncatedTextCell from '@/components/common/TruncatedTextCell';
import { LiveDataStake } from '@/custom-types/api';
import { FlamingoPool } from '@/custom-types/flamingo-data';
import usePaginatedData from '@/hooks/usePaginatedData';
import apiClient from '@/services/api-client';
import { formatRawAmountToDecimals, formatUnixTimestamp, poolHashToData } from '@/utils/helpers';
import { ColumnDef } from '@tanstack/react-table';

type TransformedLiveDataStake = LiveDataStake |
{
  time: string;
  type: string;
  block: string;
  pool: FlamingoPool | null;
  amount: string;
  fiat_amount: string;
};

const columns: ColumnDef<TransformedLiveDataStake>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Pool',
    accessorKey: 'pool',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoPool} amount={info.row.original.amount} hideImage />,
  },
  {
    header: `Amount (USD)`,
    accessorKey: 'fiat_amount',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Block',
    accessorKey: 'block',
  },
  {
    header: 'Contract',
    accessorKey: 'contract',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
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
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
];

const transformData = (entry: LiveDataStake): TransformedLiveDataStake => {
  const poolData = poolHashToData(entry.pool);
  return {
    ...entry,
    time: formatUnixTimestamp(entry.time),
    type: entry.type.toLocaleLowerCase('en-US'),
    block: entry.index.toLocaleString('en-US'),
    pool: poolData,
    amount: formatRawAmountToDecimals(parseInt(entry.amount), poolData?.decimals),
    fiat_amount: entry.usd_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  };
};

const options = {
  queryKey: 'live-data-staking',
  fetchLatest: () => apiClient.getFlamingoLivedataStakingLatest(),
  fetchHistory: (page: number) => apiClient.getFlamingoLivedataStakingHistory(page),
  transformData: transformData,
}
export default function Staking() {
  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
    refetch,
  } = usePaginatedData<LiveDataStake, TransformedLiveDataStake>(options);

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