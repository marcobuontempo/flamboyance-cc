import Table from "@/components/common/Table"
import { LiveDataClaim } from "@/custom-types/api";
import { FlamingoToken } from "@/custom-types/flamingo-data";
import usePaginatedData from "@/hooks/usePaginatedData";
import apiClient from "@/services/api-client";
import { formatUnixTimestamp, poolHashToData, tokenHashToData } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";


type TransformedLiveDataClaim = Omit<LiveDataClaim, 'index' | 'time' | 'pool'> &
{
  index: string;
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
    cell: (info) => {
      const { symbol, image } = info.getValue() as FlamingoToken;
      return (
        <div className="flex flex-nowrap items-center">
          <img className="max-w-8 w-8 mr-3 object-contain" src={image} alt={`${symbol} token symbol`} width={32} height={32} />
          <span className="mr-2">{info.row.original.amount}</span>
          <span>({symbol})</span>
        </div>
      );
    },
  },
  {
    header: `USD Value`,
    accessorKey: 'amount_fiat',
    cell: (info) => (
      <span className="text-green-primary">{info.getValue() as string}</span>
    ),
  },
  {
    header: 'Block',
    accessorKey: 'index',
  },
  {
    header: 'Address',
    accessorKey: 'user',
    cell: info => (
      <p className="truncate w-24">{info.getValue() as string}</p>
    ),
  },
  {
    header: 'TX Hash',
    accessorKey: 'transaction_hash',
    cell: info => (
      <p className="truncate w-24">{info.getValue() as string}</p>
    ),
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
    cell: info => (
      <p className="truncate w-24">{info.getValue() as string}</p>
    ),
  },
];

const transformData = (entry: LiveDataClaim): TransformedLiveDataClaim => {
  return {
    ...entry,
    index: entry.index.toLocaleString('en-US'),
    time: formatUnixTimestamp(entry.time),
    pool: poolHashToData(entry.pool)?.symbol,
    combined_token: tokenHashToData(entry.token),
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