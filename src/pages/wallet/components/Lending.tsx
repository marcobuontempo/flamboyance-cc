import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletLend } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useContext } from 'react';
import { UserContext } from '../../../App';

type TransformedWalletLend = WalletLend;

const columns: ColumnDef<TransformedWalletLend>[] = [
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
    header: 'Collateral Price (USD)',
    accessorKey: 'collateral_usd_price',
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
    header: 'F Token Price (USD)',
    accessorKey: 'f_token_usd_price',
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

const transformData = (entry: WalletLend) => {
  return entry;
};

export default function Lending() {
  const user = useContext(UserContext);

  const options = {
    queryKey: 'wallet-lending',
    fetchLatest: () => apiClient.getWalletLendLatest(user.currentWallet),
    fetchHistory: (page: number) => apiClient.getWalletLendHistory(user.currentWallet, page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<WalletLend, TransformedWalletLend>(options);

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