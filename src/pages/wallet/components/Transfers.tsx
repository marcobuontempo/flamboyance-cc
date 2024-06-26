import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletTransfer } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useOutletContext } from 'react-router-dom';
import { WalletContextType } from '..';

type TransformedWalletTransfer = WalletTransfer;

const columns: ColumnDef<TransformedWalletTransfer>[] = [
  {
    header: 'Time',
    accessorKey: 'time',
  },
  {
    header: 'Index',
    accessorKey: 'index',
  },
  {
    header: 'Hash',
    accessorKey: 'hash',
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Contract',
    accessorKey: 'contract',
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
  },
  {
    header: 'Sender',
    accessorKey: 'sender',
  },
  {
    header: 'Receiver',
    accessorKey: 'receiver',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
];

const transformData = (entry: WalletTransfer) => {
  return entry;
};

export default function Transfers() {
  const [address] = useOutletContext<WalletContextType>();

  const options = {
    queryKey: 'wallet-transfers',
    fetchLatest: () => apiClient.getWalletTransferLatest(address),
    fetchHistory: (page: number) => apiClient.getWalletTransferHistory(address, page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<WalletTransfer, TransformedWalletTransfer>(options);

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