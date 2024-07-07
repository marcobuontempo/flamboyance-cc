import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletClaim } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useOutletContext } from 'react-router-dom';
import { WalletContextType } from '..';
import { convertFiatCurrency, convertRawAmountToDecimals, tokenHashToData } from '../../../utils/helpers';
import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/UserSessionContext';

type TransformedWalletClaim = WalletClaim |
{
  time: string;
  from_amount_fiat: string;
  to_amount_fiat: string;
  total_fiat_fees: string;
};

export default function Claims() {
  const sessionContext = useContext(UserSessionContext);
  const [address] = useOutletContext<WalletContextType>();

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
      header: `From Amount (${sessionContext?.currency})`,
      accessorKey: 'from_amount_fiat',
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
      header: `To Amount (${sessionContext?.currency})`,
      accessorKey: 'to_amount_fiat',
    },
    {
      header: `Total Fees (${sessionContext?.currency})`,
      accessorKey: 'total_fiat_fees',
    },
  ];

  const transformData = (entry: WalletClaim): TransformedWalletClaim => {
    const fromToken = tokenHashToData(entry.from_token);
    const toToken = tokenHashToData(entry.to_token);

    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      from_amount: convertRawAmountToDecimals(entry.from_amount, fromToken?.decimals, 4),
      from_amount_fiat: convertFiatCurrency(entry.from_amount_usd, sessionContext?.exchangeRate, 4),
      to_amount: convertRawAmountToDecimals(entry.to_amount, toToken?.decimals, 4),
      to_amount_fiat: convertFiatCurrency(entry.to_amount_usd, sessionContext?.exchangeRate, 4),
      total_fiat_fees: convertFiatCurrency(entry.total_usd_fees, sessionContext?.exchangeRate, 4),
    };
  };

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