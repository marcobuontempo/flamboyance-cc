import Table from "@/components/common/Table";
import { LiveDataTrade } from "@/custom-types/api";
import usePaginatedData from "@/hooks/usePaginatedData";
import apiClient from "@/services/api-client";
import { tokenHashToData } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

type TransformedLiveDataTrade = LiveDataTrade |
{
  time: string;
  from_amount_fiat: string;
  to_amount_fiat: string;
  total_fees_fiat: string;
};



const columns: ColumnDef<TransformedLiveDataTrade>[] = [
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
    header: 'From Token',
    accessorKey: 'from_token',
  },
  {
    header: 'From Amount',
    accessorKey: 'from_amount',
  },
  {
    header: `From Amount (USD)`,
    accessorKey: 'from_amount_fiat',
  },
  {
    header: 'To Token',
    accessorKey: 'to_token',
  },
  {
    header: 'To Amount',
    accessorKey: 'to_amount',
  },
  {
    header: `To Amount (USD)`,
    accessorKey: 'to_amount_fiat',
  },
  {
    header: `Total Fees (USD)`,
    accessorKey: 'total_usd_fees',
  },
];

const transformData = (entry: LiveDataTrade): TransformedLiveDataTrade => {
  const fromToken = tokenHashToData(entry.from_token);
  const toToken = tokenHashToData(entry.to_token);

  return {
    ...entry,
    time: new Date(entry.time).toUTCString(),
    from_amount: entry.from_amount,
    from_amount_fiat: entry.from_amount_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    to_amount: entry.to_amount,
    to_amount_fiat: entry.to_amount_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    total_fees_fiat: entry.total_usd_fees.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  };
};

const options = {
  queryKey: 'live-data-trades',
  fetchLatest: () => apiClient.getFlamingoLivedataTradeLatest(),
  fetchHistory: (page: number) => apiClient.getFlamingoLivedataTradeHistory(page),
  transformData: transformData,
}

export default function Trades() {
  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
    refetch,
  } = usePaginatedData<LiveDataTrade, TransformedLiveDataTrade>(options);

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