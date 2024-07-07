import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { WalletLend } from '../../../types';
import usePaginatedData from '../../../hooks/usePaginatedData';
import apiClient from '../../../services/api-client';
import { useOutletContext } from 'react-router-dom';
import { WalletContextType } from '..';
import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/UserSessionContext';
import { convertFiatCurrency, convertRawAmountToDecimals, tokenHashToData } from '../../../utils/helpers';

type TransformedWalletLend = WalletLend |
{
  time: string;
  collateral_fiat_price: string;
  collateral_total: string;
  f_token_fiat_price: string;
  f_token_total: string;
  f_token_repay: string;
};

export default function Lending() {
  const sessionContext = useContext(UserSessionContext);
  const [address] = useOutletContext<WalletContextType>();

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
      header: `Collateral Price (${sessionContext?.currency})`,
      accessorKey: 'collateral_fiat_price',
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
      header: `F Token Price (${sessionContext?.currency})`,
      accessorKey: 'f_token_fiat_price',
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

  const transformData = (entry: WalletLend): TransformedWalletLend => {
    const collateralToken = tokenHashToData(entry.collateral_hash);
    const fToken = tokenHashToData(entry.f_token_hash);

    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      collateral_fiat_price: convertFiatCurrency(entry.collateral_usd_price, sessionContext?.exchangeRate, 4),
      collateral_total: convertRawAmountToDecimals(entry.collateral_total, collateralToken?.decimals, 4),
      f_token_fiat_price: convertFiatCurrency(entry.f_token_usd_price, sessionContext?.exchangeRate, 4),
      f_token_total: convertRawAmountToDecimals(entry.f_token_total, fToken?.decimals, 4),
      f_token_repay: convertRawAmountToDecimals(entry.f_token_repay, fToken?.decimals, 4),
    };
  };

  const options = {
    queryKey: 'wallet-lending',
    fetchLatest: () => apiClient.getWalletLendLatest(address),
    fetchHistory: (page: number) => apiClient.getWalletLendHistory(address, page),
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