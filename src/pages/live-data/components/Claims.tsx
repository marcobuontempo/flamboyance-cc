import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { HistoryResponse, LatestResponse, LiveDataClaim } from '../../../types';
import { poolHashToData, tokenHashToData } from '../../../utils/helpers';
import { useRef, useState } from 'react';

type Props = {}

type TransformedLiveDataClaim = Omit<LiveDataClaim, 'pool' | 'token'> & {
  pool: string;
  token: string;
};

const columns: ColumnDef<TransformedLiveDataClaim>[] = [
  {
    header: 'User',
    accessorKey: 'user',
  },
  {
    header: 'Index',
    accessorKey: 'index',
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
    header: 'Amount (USD)',
    accessorKey: 'amount_usd',
  },
  {
    header: 'Transaction Hash',
    accessorKey: 'transaction_hash',
  },
  {
    header: 'Unique ID',
    accessorKey: 'unique_id',
  },
  {
    header: 'Time',
    accessorKey: 'time',
  },
];


export default function Claims({ }: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = useRef(0);

  const fetchData = async () => {
    if (pageIndex === 0) {
      return apiClient.getFlamingoLivedataClaimsLatest();
    }
    else {
      return apiClient.getFlamingoLivedataClaimsHistory(pageCount.current - pageIndex);
    }
  }

  const selectData = (data: HistoryResponse<LiveDataClaim> | LatestResponse<LiveDataClaim>) => {    
    if (pageIndex === 0) {
      data = (data as LatestResponse<LiveDataClaim>);
      pageCount.current = data.pages;
      data = data.data;
    } else {
      data = (data as HistoryResponse<LiveDataClaim>);
    }

    return data.map(claim => {
      const token = tokenHashToData(claim.token);
      const pool = poolHashToData(claim.pool);
      return {
        ...claim,
        pool: pool?.symbol || 'unknown',
        token: token?.symbol || 'unknown',
      }
    })
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['live-data-claims', pageIndex],
    queryFn: fetchData,
    select: selectData,
  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <TableWrapper
      columns={columns}
      data={data}
      pageCount={pageCount.current}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
    />
  )
}