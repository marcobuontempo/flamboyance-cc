import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletStake } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useOutletContext } from 'react-router-dom';
import { WalletContextType } from '..';
import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/UserSessionContext';
import { convertFiatCurrency, convertRawAmountToDecimals, poolHashToData } from '../../../utils/helpers';

type TransformedWalletStake = WalletStake |
{
  time: string;
  fiat_amount: string;
};

export default function Staking() {
  const sessionContext = useContext(UserSessionContext);
  const [address] = useOutletContext<WalletContextType>();

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
      header: `Amount (${sessionContext?.currency})`,
      accessorKey: 'fiat_amount',
    },
    {
      header: 'Hash',
      accessorKey: 'hash',
    },
  ];

  const transformData = (entry: WalletStake): TransformedWalletStake => {
    const pool = poolHashToData(entry.pool);
    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      amount: convertRawAmountToDecimals(entry.amount, pool?.decimals, 4),
      fiat_amount: convertFiatCurrency(entry.usd_amount, sessionContext?.exchangeRate, 4),
    };
  };

  const options = {
    queryKey: 'wallet-staking',
    fetchLatest: () => apiClient.getWalletStakingLatest(address),
    fetchHistory: (page: number) => apiClient.getWalletStakingHistory(address, page),
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