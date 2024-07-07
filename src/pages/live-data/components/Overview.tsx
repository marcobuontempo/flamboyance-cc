import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import { LiveDataPrice } from '../../../types';
import { convertFiatCurrency, tokenHashToData } from '../../../utils/helpers';
import { useContext } from 'react';
import { UserSessionContext } from '../../../contexts/UserSessionContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import RetryFetch from '../../../components/RetryFetch';

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

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['live-data-prices'],
    queryFn: () => fetchData(),
    select: (d) => selectData(d, sessionContext?.exchangeRate),
  })

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <RetryFetch refetch={refetch} />;
  }

  return (
    <table className='m-2 table neobrutalist-border-1'>
      <thead>
        <tr className='bg-cyan-100 border-b-2 border-black border-solid'>
          <th className='p-1 border border-solid border-black' colSpan={2}>Token</th>
          <th className='p-1 border border-solid border-black'>Price ({sessionContext?.currency})</th>
        </tr>
      </thead>
      <tbody className='bg-purple-50 font-SpaceMono'>
        {
          data.map(token => {
            return (
              <tr key={token.hash} className='border border-solid border-black'>
                <td className='p-1 border border-solid border-black'><img src={token.image} width={50} height={50} className='object-contain max-w-fit p-2' /></td>
                <td className='p-1 border border-solid border-black text-center'>
                  <p>{token.symbol}</p>
                  <p className='text-xs italic contrast-50'>({token.unwrappedSymbol})</p>
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