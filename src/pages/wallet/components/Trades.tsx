import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletTrade } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useContext } from 'react';
import { UserContext } from '../../../App';

type TransformedWalletTradeWalletTrade = WalletTrade;

const columns: ColumnDef<TransformedWalletTradeWalletTrade>[] = [
  {
    header: 'Transaction Hash',
    accessorKey: 'transaction_hash',
  },
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Index',
    accessorKey: 'index',
  },
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'From Token',
    accessorKey: 'from_token',
  },
  {
    header: 'From Amount',
    accessorKey: 'from_amount',
  },
  {
    header: 'From Amount (USD)',
    accessorKey: 'from_amount_usd',
  },
  {
    header: 'To Token',
    accessorKey: 'to_token',
  },
  {
    header: 'To Amount',
    accessorKey: 'to_amount',
  },
  {
    header: 'To Amount (USD)',
    accessorKey: 'to_amount_usd',
  },
  {
    header: 'Total Fees (USD)',
    accessorKey: 'total_usd_fees',
  },
];

const transformData = (entry: WalletTrade) => {
  return entry;
};

export default function Trades() {
  const user = useContext(UserContext);

  const options = {
    queryKey: 'wallet-trades',
    fetchLatest: () => apiClient.getWalletTradeLatest(user.currentWallet),
    fetchHistory: (page: number) => apiClient.getWalletTradeHistory(user.currentWallet, page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<WalletTrade, TransformedWalletTradeWalletTrade>(options);

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