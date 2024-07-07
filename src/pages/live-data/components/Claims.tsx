import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { convertFiatCurrency, convertRawAmountToDecimals, poolHashToData, tokenHashToData } from '../../../utils/helpers';
import { LiveDataClaim } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/UserSessionContext';

type TransformedLiveDataClaim = LiveDataClaim |
{
  time: string;
  amount_fiat: string;
  pool: string | undefined;
  token: string | undefined;
};

export default function Claims() {
  const sessionContext = useContext(UserSessionContext);

  const columns: ColumnDef<TransformedLiveDataClaim>[] = [
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
      header: 'Pool',
      accessorKey: 'pool',
    },
    {
      header: 'Token',
      accessorKey: 'token',
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
    },
    {
      header: `Amount (${sessionContext?.currency})`,
      accessorKey: 'amount_fiat',
    },
  ];

  const transformData = (entry: LiveDataClaim): TransformedLiveDataClaim => {
    const token = tokenHashToData(entry.token);
    const pool = poolHashToData(entry.pool);
    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      amount: convertRawAmountToDecimals(entry.amount, token?.decimals, 4),
      amount_fiat: convertFiatCurrency(entry.amount_usd, sessionContext?.exchangeRate, 4),
      pool: pool?.symbol,
      token: token?.symbol,
    }
  };

  const options = {
    queryKey: 'live-data-claims',
    fetchLatest: () => apiClient.getFlamingoLivedataClaimsLatest(),
    fetchHistory: (page: number) => apiClient.getFlamingoLivedataClaimsHistory(page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
    refetch,
  } = usePaginatedData<LiveDataClaim, TransformedLiveDataClaim>(options);

  return (
    <TableWrapper
      data={data}
      columns={columns}
      pageCount={pageCount}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
      title='Claims'
    />
  )
}