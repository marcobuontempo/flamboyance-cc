import { ColumnDef } from "@tanstack/react-table";
import { LiveDataStake } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";

type TransformedLiveDataStake = LiveDataStake;

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
    header: 'Amount (USD)',
    accessorKey: 'usd_amount',
  },
  {
    header: 'Hash',
    accessorKey: 'hash',
  },
];

const transformData = (entry: LiveDataStake) => {
  return entry;
};

export default function Staking() {
  const options = {
    queryKey: 'live-data-staking',
    fetchLatest: apiClient.getFlamingoLivedataStakingLatest,
    fetchHistory: apiClient.getFlamingoLivedataStakingHistory,
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<LiveDataStake, TransformedLiveDataStake>(options);

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