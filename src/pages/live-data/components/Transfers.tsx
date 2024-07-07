import { ColumnDef } from "@tanstack/react-table";
import { LiveDataTransfer } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";
import { convertRawAmountToDecimals, tokenHashToData } from "../../../utils/helpers";

type TransformedLiveDataTransfer = LiveDataTransfer |
{
  time: string;
};

export default function Transfers() {
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
      amount: convertRawAmountToDecimals(entry.amount, token?.decimals, 4),
    };
  };

  const options = {
    queryKey: 'live-data-transfers',
    fetchLatest: () => apiClient.getFlamingoLivedataTransferLatest(),
    fetchHistory: (page: number) => apiClient.getFlamingoLivedataTransferHistory(page),
    transformData: transformData,
  }

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
    <TableWrapper
      data={data}
      columns={columns}
      pageCount={pageCount}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
      title='Transfers'
    />
  )
}