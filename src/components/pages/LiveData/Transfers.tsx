import Table from "@/components/common/Table";
import { LiveDataTransfer } from "@/custom-types/api";
import usePaginatedData from "@/hooks/usePaginatedData";
import apiClient from "@/services/api-client";
import { tokenHashToData } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

type TransformedLiveDataTransfer = LiveDataTransfer |
{
  time: string;
};

const columns: ColumnDef<TransformedLiveDataTransfer>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Index',
    accessorKey: 'index',
  },
  {
    header: 'Hash',
    accessorKey: 'hash',
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Contract',
    accessorKey: 'contract',
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
  },
  {
    header: 'Sender',
    accessorKey: 'sender',
  },
  {
    header: 'Receiver',
    accessorKey: 'receiver',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
];

const transformData = (entry: LiveDataTransfer): TransformedLiveDataTransfer => {
  const token = tokenHashToData(entry.contract);

  return {
    ...entry,
    time: new Date(entry.time).toUTCString(),
    amount: entry.amount,
  };
};

const options = {
  queryKey: 'live-data-transfers',
  fetchLatest: () => apiClient.getFlamingoLivedataTransferLatest(),
  fetchHistory: (page: number) => apiClient.getFlamingoLivedataTransferHistory(page),
  transformData: transformData,
}

export default function Transfers() {
  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
    refetch,
  } = usePaginatedData<LiveDataTransfer, TransformedLiveDataTransfer>(options);

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