import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import TableWrapper from '../../../components/TableWrapper';
import { ColumnDef } from '@tanstack/react-table';
import { LiveDataClaim, LiveDataClaimResponse } from '../../../types';
import { poolHashToData, tokenHashToData } from '../../../utils/helpers';

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
  const fetchData = async () => {
    return apiClient.getFlamingoLivedataClaimsLatest();
  }

  const transformData = (data: LiveDataClaimResponse) => {
    return data.data.map(claim => {
      const token = tokenHashToData(claim.token);
      const pool = poolHashToData(claim.pool);
      return {
        ...claim,
        pool: pool?.symbol || 'undefined',
        token: token?.symbol || 'undefined',
      }
    })
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['live-data-claims'],
    queryFn: fetchData,
    select: transformData,
  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  console.log(data);
  return (
    <TableWrapper
      columns={columns}
      data={data}
    />
  )
}