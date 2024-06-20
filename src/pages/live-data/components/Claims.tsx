import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { poolHashToData, tokenHashToData } from '../../../utils/helpers';
import { LiveDataClaim } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';

type TransformedLiveDataClaim =
  Omit<LiveDataClaim, 'pool' | 'token'> &
  {
    pool: string | undefined;
    token: string | undefined;
  };

const columns: ColumnDef<TransformedLiveDataClaim>[] = [
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Transaction Hash',
    accessorKey: 'transaction_hash',
  },
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Index',
    accessorKey: 'index',
  },
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'Pool',
    accessorKey: 'pool',
  },
  {
    header: 'Token',
    accessorKey: 'token',
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
  },
  {
    header: 'Amount (USD)',
    accessorKey: 'amount_usd',
  },
];

const transformData = (entry: LiveDataClaim) => {
  const token = tokenHashToData(entry.token);
  const pool = poolHashToData(entry.pool);
  return {
    ...entry,
    pool: pool?.symbol,
    token: token?.symbol,
  }
};

export default function Claims() {
  const options = {
    queryKey: 'live-data-claims',
    fetchLatest: () => apiClient.getFlamingoLivedataClaimsLatest(),
    fetchHistory: (page: number) => apiClient.getFlamingoLivedataClaimsHistory(page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<LiveDataClaim, TransformedLiveDataClaim>(options);

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