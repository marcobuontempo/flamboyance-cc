import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletStake } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useContext } from 'react';
import { UserContext } from '../../../App';

type TransformedWalletStake = WalletStake;

const columns: ColumnDef<TransformedWalletStake>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Index',
    accessorKey: 'index',
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'Contract',
    accessorKey: 'contract',
  },
  {
    header: 'Pool',
    accessorKey: 'pool',
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
  },
  {
    header: 'Amount (USD)',
    accessorKey: 'usd_amount',
  },
  {
    header: 'Hash',
    accessorKey: 'hash',
  },
];

const transformData = (entry: WalletStake) => {
  return entry;
};

export default function Staking() {
  const user = useContext(UserContext);

  const options = {
    queryKey: 'wallet-staking',
    fetchLatest: () => apiClient.getWalletStakingLatest(user.currentWallet),
    fetchHistory: (page: number) => apiClient.getWalletStakingHistory(user.currentWallet, page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<WalletStake, TransformedWalletStake>(options);

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