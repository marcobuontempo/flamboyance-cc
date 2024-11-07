import Table from "@/components/common/Table"
import { LiveDataClaim } from "@/custom-types/api";
import usePaginatedData from "@/hooks/usePaginatedData";
import apiClient from "@/services/api-client";
import { poolHashToData, tokenHashToData } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";


type TransformedLiveDataClaim = LiveDataClaim |
{
  time: string;
  amount_fiat: string;
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
    header: `Amount (USD)`,
    accessorKey: 'amount_fiat',
  },
];

const transformData = (entry: LiveDataClaim): TransformedLiveDataClaim => {
  const token = tokenHashToData(entry.token);
  const pool = poolHashToData(entry.pool);
  return {
    ...entry,
    time: new Date(entry.time).toUTCString(),
    amount: entry.amount,
    amount_fiat: entry.amount_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    pool: pool?.symbol,
    token: token?.symbol,
  }
};

const options = {
  queryKey: 'live-data-claims',
  fetchLatest: () => apiClient.getFlamingoLivedataClaimsLatest(),
  fetchHistory: (page: number) => apiClient.getFlamingoLivedataClaimsHistory(page),
  transformData: transformData,
}

export default function Claims() {
  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
    refetch,
  } = usePaginatedData<LiveDataClaim, TransformedLiveDataClaim>(options);


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