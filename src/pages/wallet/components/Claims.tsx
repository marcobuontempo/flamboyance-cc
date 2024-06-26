import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletClaim } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useOutletContext } from 'react-router-dom';
import { WalletContextType } from '..';

type TransformedWalletClaim = WalletClaim;

const columns: ColumnDef<TransformedWalletClaim>[] = [
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
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

const transformData = (entry: WalletClaim) => {
  return entry;
};

export default function Claims() {
  const [address] = useOutletContext<WalletContextType>();

  const options = {
    queryKey: 'wallet-claims',
    fetchLatest: () => apiClient.getWalletClaimsLatest(address),
    fetchHistory: (page: number) => apiClient.getWalletClaimsHistory(address, page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<WalletClaim, TransformedWalletClaim>(options);

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