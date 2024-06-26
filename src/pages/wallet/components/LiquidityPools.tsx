import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletLiquidityPool } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useOutletContext } from 'react-router-dom';
import { WalletContextType } from '..';

type TransformedWalletLiquidityPool = WalletLiquidityPool;

const columns: ColumnDef<TransformedWalletLiquidityPool>[] = [
  {
    header: 'Index',
    accessorKey: 'index',
  },
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Hash',
    accessorKey: 'hash',
  },
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'LP Token',
    accessorKey: 'lp_token',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'LP Amount',
    accessorKey: 'lp_amount',
  },
  {
    header: 'LP Amount (USD)',
    accessorKey: 'lp_usd_amount',
  },
  {
    header: 'Token 1 Hash',
    accessorKey: 'token_1_hash',
  },
  {
    header: 'Token 1 Amount',
    accessorKey: 'token_1_amount',
  },
  {
    header: 'Token 1 Amount (USD)',
    accessorKey: 'token_1_usd_amount',
  },
  {
    header: 'Token 2 Hash',
    accessorKey: 'token_2_hash',
  },
  {
    header: 'Token 2 Amount',
    accessorKey: 'token_2_amount',
  },
  {
    header: 'Token 2 Amount (USD)',
    accessorKey: 'token_2_usd_amount',
  },
];

const transformData = (entry: WalletLiquidityPool) => {
  return entry;
};

export default function LiquidityPools() {
  const [address] = useOutletContext<WalletContextType>();

  const options = {
    queryKey: 'wallet-liquidity-pools',
    fetchLatest: () => apiClient.getWalletLpLatest(address),
    fetchHistory: (page: number) => apiClient.getWalletLpHistory(address, page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<WalletLiquidityPool, TransformedWalletLiquidityPool>(options);

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