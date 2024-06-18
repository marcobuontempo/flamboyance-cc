import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import { useState } from 'react';

type Props = {}

export default function Overview({ }: Props) {
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    if (page === 1) {
      return apiClient.getFlamingoLivedataClaimsLatest();
    } else {
      return apiClient.getFlamingoLivedataClaimsHistory(page);
    }
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['live-data-prices'],
    queryFn: fetchData,
  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  console.log(data);
  return (
    <table className='m-2 table border border-solid border-black'>
      <thead>
        <tr className='bg-blue-300'>
          <th></th>
          <th className='p-1 border border-solid border-black'>Token</th>
          <th className='p-1 border border-solid border-black'>Price</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map(token => {
            return (
              <tr key={token.hash} className='border border-solid border-black'>
                <td className='p-1 border border-solid border-black'>IMG</td>
                <td className='p-1 border border-solid border-black'>
                  <p>{token.symbol}</p>
                  <p className='text-xs italic'>({token.unwrappedSymbol})</p>
                </td>
                <td className='p-1 border border-solid border-black'>{token.usd_price}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}