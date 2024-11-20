import GreenTextCell from '@/components/common/GreenTextCell';
import Table from '@/components/common/Table';
import TokenAmountCell from '@/components/common/TokenAmountCell';
import TruncatedTextCell from '@/components/common/TruncatedTextCell';
import { LiveDataLend } from '@/custom-types/api';
import { FlamingoToken } from '@/custom-types/flamingo-data';
import usePaginatedData from '@/hooks/usePaginatedData';
import apiClient from '@/services/api-client';
import { formatRawAmountToDecimals, formatUnixTimestamp, tokenHashToData } from '@/utils/helpers';
import { ColumnDef } from '@tanstack/react-table';

type TransformedLiveDataLend = Omit<LiveDataLend, 'block' | 'type'> |
{
  time: string;
  block: string;
  type: string;
  collateral_combined: FlamingoToken | null;
  collateral_fiat_price: string;
  collateral_total: string;
  f_token_combined: FlamingoToken | null;
  f_token_fiat_price: string;
  f_token_total: string;
  f_token_repay: string;
};

const columns: ColumnDef<TransformedLiveDataLend>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Collateral Token',
    accessorKey: 'collateral_combined',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.collateral_total as string} />,
  },
  {
    header: `Collateral Price (USD)`,
    accessorKey: 'collateral_fiat_price',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'F Token',
    accessorKey: 'f_token_combined',
    cell: info => <TokenAmountCell token={info.getValue() as FlamingoToken} amount={info.row.original.f_token_total as string} />,
  },
  {
    header: `F Token Price (USD)`,
    accessorKey: 'f_token_fiat_price',
    cell: info => <GreenTextCell value={info.getValue() as string} />,
  },
  {
    header: 'F Token Repay',
    accessorKey: 'f_token_repay',
  },
  {
    header: 'Block',
    accessorKey: 'block',
  },
  {
    header: 'Address',
    accessorKey: 'address',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
  {
    header: 'TX Hash',
    accessorKey: 'tx_id',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
    cell: info => <TruncatedTextCell value={info.getValue() as string} />,
  },
];

const transformData = (entry: LiveDataLend): TransformedLiveDataLend => {
  const collateralTokenData = tokenHashToData(entry.collateral_hash);
  const fTokenData = tokenHashToData(entry.f_token_hash);

  return {
    ...entry,
    time: formatUnixTimestamp(entry.time),
    type: entry.type.replace(/([A-Z])/g, ' $1').trim().toLocaleLowerCase('en-US'),
    block: entry.block.toLocaleString('en-US'),
    collateral_combined: collateralTokenData,
    collateral_fiat_price: entry.collateral_usd_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    collateral_total: formatRawAmountToDecimals(parseInt(entry.collateral_total), collateralTokenData?.decimals),
    f_token_combined: fTokenData,
    f_token_fiat_price: entry.f_token_usd_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    f_token_total: formatRawAmountToDecimals(parseInt(entry.f_token_total), fTokenData?.decimals),
    f_token_repay: formatRawAmountToDecimals(parseInt(entry.f_token_repay), fTokenData?.decimals),
  };
};

const options = {
  queryKey: 'live-data-lending',
  fetchLatest: () => apiClient.getFlamingoLivedataLendLatest(),
  fetchHistory: (page: number) => apiClient.getFlamingoLivedataLendHistory(page),
  transformData: transformData,
}

export default function Lending() {
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