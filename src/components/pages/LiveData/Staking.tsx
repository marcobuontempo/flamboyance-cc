import Table from '@/components/common/Table';
import { LiveDataStake } from '@/custom-types/api';
import usePaginatedData from '@/hooks/usePaginatedData';
import apiClient from '@/services/api-client';
import { poolHashToData } from '@/utils/helpers';
import { ColumnDef } from '@tanstack/react-table';

type TransformedLiveDataStake = LiveDataStake |
{
  time: string;
  fiat_amount: string;
};

const columns: ColumnDef<TransformedLiveDataStake>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Index',
    accessorKey: 'index',
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'Contract',
    accessorKey: 'contract',
  },
  {
    header: 'Pool',
    accessorKey: 'pool',
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
  },
  {
    header: `Amount (USD)`,
    accessorKey: 'fiat_amount',
  },
  {
    header: 'Hash',
    accessorKey: 'hash',
  },
];

const transformData = (entry: LiveDataStake): TransformedLiveDataStake => {
  const pool = poolHashToData(entry.pool);
  return {
    ...entry,
    time: new Date(entry.time).toUTCString(),
    amount: entry.amount,
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