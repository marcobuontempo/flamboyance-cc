import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import { LiveDataPrice } from '../../../types';

type Props = {}

const fetchData = async () => {
  return apiClient.getFlamingoLivedataPricesLatest();
}

const selectData = (data: LiveDataPrice[]) => {
  return data;
}

export default function Overview({ }: Props) {
  const { isPending, isError, data } = useQuery({
    queryKey: ['live-data-prices'],
    queryFn: () => fetchData(),
    select: selectData,
  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

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