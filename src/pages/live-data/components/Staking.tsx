import { ColumnDef } from "@tanstack/react-table";
import { LiveDataStake } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";
import { useContext } from "react";
import { UserSessionContext } from "../../../contexts/UserSessionContext";
import { convertFiatCurrency, convertRawAmountToDecimals, poolHashToData } from "../../../utils/helpers";

type TransformedLiveDataStake = LiveDataStake |
{
  time: string;
  fiat_amount: string;
};

export default function Staking() {
  const sessionContext = useContext(UserSessionContext);

  const columns: ColumnDef<TransformedLiveDataStake>[] = [
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

  const transformData = (entry: LiveDataStake): TransformedLiveDataStake => {
    const pool = poolHashToData(entry.pool);
    return {
      ...entry,
      time: new Date(entry.time).toUTCString(),
      amount: convertRawAmountToDecimals(entry.amount, pool?.decimals, 4),
      fiat_amount: convertFiatCurrency(entry.usd_amount, sessionContext?.exchangeRate, 4),
    };
  };

  const options = {
    queryKey: 'live-data-staking',
    fetchLatest: () => apiClient.getFlamingoLivedataStakingLatest(),
    fetchHistory: (page: number) => apiClient.getFlamingoLivedataStakingHistory(page),
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<LiveDataStake, TransformedLiveDataStake>(options);

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