import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { poolHashToData, tokenHashToData } from '../../../utils/helpers';
import { LiveDataClaim } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';

type Props = {}

type TransformedLiveDataClaim =
  Omit<LiveDataClaim, 'pool' | 'token'> &
  {
    pool: string;
    token: string;
  };

const columns: ColumnDef<TransformedLiveDataClaim>[] = [
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'Index',
    accessorKey: 'index',
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
  {
    header: 'Transaction Hash',
    accessorKey: 'transaction_hash',
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Time',
    accessorKey: 'time',
  },
];

const transformData = (claim: LiveDataClaim) => {
  const token = tokenHashToData(claim.token);
  const pool = poolHashToData(claim.pool);
  return {
    ...claim,
    pool: pool?.symbol || 'unknown',
    token: token?.symbol || 'unknown',
  }
};

export default function Claims({ }: Props) {
  const options = {
    queryKey: 'live-data-claims',
    fetchLatest: apiClient.getFlamingoLivedataClaimsLatest,
    fetchHistory: apiClient.getFlamingoLivedataClaimsHistory,
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