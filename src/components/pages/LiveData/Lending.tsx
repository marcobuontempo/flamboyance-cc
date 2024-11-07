import Table from '@/components/common/Table';
import { LiveDataLend } from '@/custom-types/api';
import usePaginatedData from '@/hooks/usePaginatedData';
import apiClient from '@/services/api-client';
import { tokenHashToData } from '@/utils/helpers';
import { ColumnDef } from '@tanstack/react-table';

type Props = {}

type TransformedLiveDataLend = LiveDataLend |
{
  time: string;
  collateral_fiat_price: string;
  collateral_total: string;
  f_token_fiat_price: string;
  f_token_total: string;
  f_token_repay: string;
};

const columns: ColumnDef<TransformedLiveDataLend>[] = [
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Transaction ID',
    accessorKey: 'tx_id',
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Block',
    accessorKey: 'block',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Collateral Hash',
    accessorKey: 'collateral_hash',
  },
  {
    header: `Collateral Price (USD)`,
    accessorKey: 'collateral_fiat_price',
  },
  {
    header: 'Collateral Total',
    accessorKey: 'collateral_total',
  },
  {
    header: 'F Token Hash',
    accessorKey: 'f_token_hash',
  },
  {
    header: `F Token Price (USD)`,
    accessorKey: 'f_token_fiat_price',
  },
  {
    header: 'F Token Total',
    accessorKey: 'f_token_total',
  },
  {
    header: 'F Token Repay',
    accessorKey: 'f_token_repay',
  },
];

const transformData = (entry: LiveDataLend): TransformedLiveDataLend => {
  const collateralToken = tokenHashToData(entry.collateral_hash);
  const fToken = tokenHashToData(entry.f_token_hash);

  return {
    ...entry,
    time: new Date(entry.time).toUTCString(),
    collateral_fiat_price: entry.collateral_usd_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    collateral_total: entry.collateral_total,
    f_token_fiat_price: entry.f_token_usd_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    f_token_total: entry.f_token_total,
    f_token_repay: entry.f_token_repay,
  };
};

const options = {
  queryKey: 'live-data-lending',
  fetchLatest: () => apiClient.getFlamingoLivedataLendLatest(),
  fetchHistory: (page: number) => apiClient.getFlamingoLivedataLendHistory(page),
  transformData: transformData,
}

export default function Lending({ }: Props) {
  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
    refetch,
  } = usePaginatedData<LiveDataLend, TransformedLiveDataLend>(options);

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