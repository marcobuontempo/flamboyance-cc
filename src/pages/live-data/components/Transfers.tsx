import { ColumnDef } from "@tanstack/react-table";
import { LiveDataTransfer } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";

type TransformedLiveDataTransfer = LiveDataTransfer;

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

const transformData = (entry: LiveDataTransfer) => {
  return entry;
};

export default function Transfers() {
  const options = {
    queryKey: 'live-data-transfers',
    fetchLatest: apiClient.getFlamingoLivedataTransferLatest,
    fetchHistory: apiClient.getFlamingoLivedataTransferHistory,
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<LiveDataTransfer, TransformedLiveDataTransfer>(options);

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