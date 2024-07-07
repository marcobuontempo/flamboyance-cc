import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletLiquidityPool } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useOutletContext } from 'react-router-dom';
import { WalletContextType } from '..';
import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/UserSessionContext';
import { convertFiatCurrency, convertRawAmountToDecimals, tokenHashToData } from '../../../utils/helpers';

type TransformedWalletLiquidityPool = WalletLiquidityPool |
{
  time: string;
  lp_fiat_amount: string;
  token_1_fiat_amount: string;
  token_2_fiat_amount: string;
};

export default function LiquidityPools() {
  const sessionContext = useContext(UserSessionContext);
  const [address] = useOutletContext<WalletContextType>();

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
      header: `LP Amount (${sessionContext?.currency})`,
      accessorKey: 'lp_fiat_amount',
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
      header: `Token 1 Amount (${sessionContext?.currency})`,
      accessorKey: 'token_1_fiat_amount',
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
      header: `Token 2 Amount (${sessionContext?.currency})`,
      accessorKey: 'token_2_fiat_amount',
    },
  ];

  const transformData = (entry: WalletLiquidityPool): TransformedWalletLiquidityPool => {
    const token1 = tokenHashToData(entry.token_1_hash);
    const token2 = tokenHashToData(entry.token_2_hash);

    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      lp_fiat_amount: convertFiatCurrency(entry.lp_usd_amount, sessionContext?.exchangeRate, 4),
      token_1_amount: convertRawAmountToDecimals(entry.token_1_amount, token1?.decimals, 4),
      token_1_fiat_amount: convertFiatCurrency(entry.token_1_usd_amount, sessionContext?.exchangeRate, 4),
      token_2_amount: convertRawAmountToDecimals(entry.token_2_amount, token2?.decimals, 4),
      token_2_fiat_amount: convertFiatCurrency(entry.token_2_usd_amount, sessionContext?.exchangeRate, 4),
    };
  };

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