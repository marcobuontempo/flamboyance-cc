import GreenTextCell from "@/components/common/GreenTextCell";
import Table from "@/components/common/Table"
import TokenAmountCell from "@/components/common/TokenAmountCell";
import TruncatedTextCell from "@/components/common/TruncatedTextCell";
import { LiveDataClaim } from "@/custom-types/api";
import { FlamingoToken } from "@/custom-types/flamingo-data";
import usePaginatedData from "@/hooks/usePaginatedData";
import apiClient from "@/services/api-client";
import { formatRawAmountToDecimals, formatUnixTimestamp, poolHashToData, tokenHashToData } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";


type TransformedLiveDataClaim = Omit<LiveDataClaim, 'time' | 'pool'> &
{
  block: string;
  time: string;
  pool: string | undefined;
  combined_token: FlamingoToken | null;
  amount_fiat: string;
};

const columns: ColumnDef<TransformedLiveDataClaim>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Pool',
    accessorKey: 'pool',
  },
  {
    header: 'Token',
    accessorKey: 'combined_token',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.amount} />,
  },
  {
    header: `USD Value`,
    accessorKey: 'amount_fiat',
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
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
];

const transformData = (entry: LiveDataClaim): TransformedLiveDataClaim => {
  const poolData = poolHashToData(entry.pool);
  const tokenData = tokenHashToData(entry.token);
  return {
    ...entry,
    amount: formatRawAmountToDecimals(parseInt(entry.amount), tokenData?.decimals),
    block: entry.index.toLocaleString('en-US'),
    time: formatUnixTimestamp(entry.time),
    pool: poolData?.symbol,
    combined_token: tokenData,
    amount_fiat: entry.amount_usd.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 4 }),
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