import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import { LiveDataPrice } from '../../../types';
import { convertFiatCurrency, tokenHashToData } from '../../../utils/helpers';
import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/UserSessionContext';

type Props = {}

const fetchData = async () => {
  return apiClient.getFlamingoLivedataPricesLatest();
}

const selectData = (data: LiveDataPrice[], exchangeRate: number | undefined) => {
  return data.map(token => {
    const tokenData = tokenHashToData(token.hash);
    return {
      ...token,
      fiat_price: convertFiatCurrency(token.usd_price, exchangeRate, 8),
      image: tokenData?.image,
    }
  });
}

export default function Overview({ }: Props) {
  const sessionContext = useContext(UserSessionContext);

  const { isPending, isError, data } = useQuery({
    queryKey: ['live-data-prices'],
    queryFn: () => fetchData(),
    select: (d) => selectData(d, sessionContext?.exchangeRate),
  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <table className='m-2 table'>
      <thead>
        <tr className='bg-blue-300'>
          <th className='p-1 border border-solid border-black' colSpan={2}>Token</th>
          <th className='p-1 border border-solid border-black'>Price ({sessionContext?.currency})</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map(token => {
            return (
              <tr key={token.hash} className='border border-solid border-black'>
                <td className='p-1 border border-solid border-black'><img src={token.image} width={50} height={50} className='object-contain max-w-fit p-2' /></td>
                <td className='p-1 border border-solid border-black text-center'>
                  <p>{token.symbol}</p>
                  <p className='text-xs italic'>({token.unwrappedSymbol})</p>
                </td>
                <td className='p-2 border border-solid border-black text-right'>{token.fiat_price}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}