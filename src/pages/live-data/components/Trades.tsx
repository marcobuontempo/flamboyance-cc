import { ColumnDef } from "@tanstack/react-table";
import { LiveDataTrade } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";
import { useContext } from "react";
import { UserSessionContext } from "../../../contexts/UserSessionContext";
import { convertFiatCurrency, convertRawAmountToDecimals, tokenHashToData } from "../../../utils/helpers";

type TransformedLiveDataTrade = LiveDataTrade |
{
  time: string;
  from_amount_fiat: string;
  to_amount_fiat: string;
  total_fees_fiat: string;
};


export default function Trades() {
  const sessionContext = useContext(UserSessionContext);

  const columns: ColumnDef<TransformedLiveDataTrade>[] = [
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
      accessorKey: 'total_usd_fees',
    },
  ];

  const transformData = (entry: LiveDataTrade): TransformedLiveDataTrade => {
    const fromToken = tokenHashToData(entry.from_token);
    const toToken = tokenHashToData(entry.to_token);
    
    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      from_amount: convertRawAmountToDecimals(entry.from_amount, fromToken?.decimals, 4),
      from_amount_fiat: convertFiatCurrency(entry.from_amount_usd, sessionContext?.exchangeRate, 4),
      to_amount: convertRawAmountToDecimals(entry.to_amount, toToken?.decimals, 4),
      to_amount_fiat: convertFiatCurrency(entry.to_amount_usd, toToken?.decimals, 4),
      total_fees_fiat: convertFiatCurrency(entry.total_usd_fees, sessionContext?.exchangeRate, 4),
    };
  };

  const options = {
    queryKey: 'live-data-trades',
    fetchLatest: () => apiClient.getFlamingoLivedataTradeLatest(),
    fetchHistory: (page: number) => apiClient.getFlamingoLivedataTradeHistory(page),
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
  } = usePaginatedData<LiveDataTrade, TransformedLiveDataTrade>(options);

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
      title='Trades'
    />
  )
}