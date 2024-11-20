import GreenTextCell from "@/components/common/GreenTextCell";
import Table from "@/components/common/Table";
import TokenAmountCell from "@/components/common/TokenAmountCell";
import TruncatedTextCell from "@/components/common/TruncatedTextCell";
import { LiveDataTrade } from "@/custom-types/api";
import { FlamingoToken } from "@/custom-types/flamingo-data";
import usePaginatedData from "@/hooks/usePaginatedData";
import apiClient from "@/services/api-client";
import { formatRawAmountToDecimals, formatUnixTimestamp, tokenHashToData } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

type TransformedLiveDataTrade = LiveDataTrade |
{
  time: string;
  block: string;
  from_combined: FlamingoToken | null;
  from_amount: string;
  from_amount_fiat: string;
  to_combined: FlamingoToken | null;
  to_amount: string;
  to_amount_fiat: string;
  total_fees_fiat: string;
};

const columns: ColumnDef<TransformedLiveDataTrade>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'From Token',
    accessorKey: 'from_combined',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.from_amount} />,
  },
  {
    header: `From Amount (USD)`,
    accessorKey: 'from_amount_fiat',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'To Token',
    accessorKey: 'to_combined',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.to_amount} />,
  },
  {
    header: `To Amount (USD)`,
    accessorKey: 'to_amount_fiat',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: `Total Fees (USD)`,
    accessorKey: 'total_fees_fiat',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Block',
    accessorKey: 'block',
  },
  {
    header: 'Address',
    accessorKey: 'user',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
  {
    header: 'TX Hash',
    accessorKey: 'transaction_hash',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
];

const transformData = (entry: LiveDataTrade): TransformedLiveDataTrade => {
  const fromTokenData = tokenHashToData(entry.from_token);
  const toTokenData = tokenHashToData(entry.to_token);

  return {
    ...entry,
    time: formatUnixTimestamp(entry.time),
    block: entry.index.toLocaleString('en-US'),
    from_combined: fromTokenData,
    from_amount: formatRawAmountToDecimals(parseInt(entry.from_amount), fromTokenData?.decimals),
    from_amount_fiat: entry.from_amount_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    to_combined: toTokenData,
    to_amount: formatRawAmountToDecimals(parseInt(entry.to_amount), toTokenData?.decimals),
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