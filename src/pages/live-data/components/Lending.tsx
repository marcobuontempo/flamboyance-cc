import { ColumnDef } from "@tanstack/react-table";
import { LiveDataLend } from "../../../types";
import apiClient from "../../../services/api-client";
import usePaginatedData from "../../../hooks/usePaginatedData";
import TableWrapper from "../../../components/TableWrapper";

type TransformedLiveDataLend = LiveDataLend;

const columns: ColumnDef<TransformedLiveDataLend>[] = [
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

const transformData = (entry: LiveDataLend) => {
  return entry;
};

export default function Lending() {
  const options = {
    queryKey: 'live-data-lending',
    fetchLatest: apiClient.getFlamingoLivedataLendLatest,
    fetchHistory: apiClient.getFlamingoLivedataLendHistory,
    transformData: transformData,
  }

  const {
    data,
    pageIndex,
    setPageIndex,
    pageCount,
    isPending,
    isError,
  } = usePaginatedData<LiveDataLend, TransformedLiveDataLend>(options);

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