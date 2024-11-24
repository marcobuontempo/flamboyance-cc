import Table from "@/components/common/Table";
import TokenAmountCell from "@/components/common/TokenAmountCell";
import TruncatedTextCell from "@/components/common/TruncatedTextCell";
import { LiveDataTransfer } from "@/custom-types/api";
import { FlamingoToken } from "@/custom-types/flamingo-data";
import usePaginatedData from "@/hooks/usePaginatedData";
import apiClient from "@/services/api-client";
import { formatRawAmountToDecimals, formatUnixTimestamp, tokenHashToData } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

type TransformedLiveDataTransfer = LiveDataTransfer &
{
  time: string;
  type: string;
  amount: string;
  token: FlamingoToken | null;
  block: string;
};

const columns: ColumnDef<TransformedLiveDataTransfer>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Token',
    accessorKey: 'token',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.amount} />,
  },
  {
    header: 'Block',
    accessorKey: 'block',
  },
  {
    header: 'Sender',
    accessorKey: 'sender',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Receiver',
    accessorKey: 'receiver',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
  {
    header: 'TX Hash',
    accessorKey: 'hash',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
];

const transformData = (entry: LiveDataTransfer): TransformedLiveDataTransfer => {
  const tokenData = tokenHashToData(entry.contract);

  return {
    ...entry,
    time: formatUnixTimestamp(entry.time),
    type: entry.type.toLocaleLowerCase('en-US'),
    block: entry.index.toLocaleString('en-US'),
    amount: formatRawAmountToDecimals(parseInt(entry.amount), tokenData?.decimals),
    token: tokenData,
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