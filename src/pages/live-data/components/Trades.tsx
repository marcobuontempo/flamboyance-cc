import { ColumnDef } from "@tanstack/react-table";
import { LiveDataTrade } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";

type TransformedLiveDataTrade = LiveDataTrade;

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
    header: 'From Amount (USD)',
    accessorKey: 'from_amount_usd',
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
    header: 'To Amount (USD)',
    accessorKey: 'to_amount_usd',
  },
  {
    header: 'Total Fees (USD)',
    accessorKey: 'total_usd_fees',
  },
];

const transformData = (entry: LiveDataTrade) => {
  return entry;
};

export default function Trades() {
  const options = {
    queryKey: 'live-data-trades',
    fetchLatest: apiClient.getFlamingoLivedataTradeLatest,
    fetchHistory: apiClient.getFlamingoLivedataTradeHistory,
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<LiveDataTrade, TransformedLiveDataTrade>(options);

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