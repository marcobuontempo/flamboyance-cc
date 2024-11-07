import { LiveDataPrice } from "@/custom-types/api";
import apiClient from "@/services/api-client"
import { tokenHashToData } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import PlaceholderImage from "@assets/icons/unknown-placeholder.svg";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import RetryButton from "@/components/common/RetryButton";

type Props = {}

const fetchData = async () => {
  return apiClient.getFlamingoLivedataPricesLatest();
}

const selectData = (data: LiveDataPrice[]) => {
  return data.map(token => {
    const tokenData = tokenHashToData(token.hash);
    return {
      ...token,
      usd_price: token.usd_price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 8 }),
      image: tokenData?.image,
    }
  })
}

export default function Overview({ }: Props) {

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['live-data-prices'],
    queryFn: () => fetchData(),
    select: (d) => selectData(d),
  })

  if (isPending) {
    return <LoadingSpinner />;
  } else if (isError) {
    return <RetryButton refetch={refetch} />;
  };

  return (
    <table className='border-spacing-0 border-separate border rounded-2xl'>
      <thead className='text-left'>
        <tr>
          <th className='font-bold py-4 px-6 bg-white/10 rounded-tl-2xl'>Token</th>
          <th className='font-bold w-full px-6 bg-white/10 rounded-tr-2xl'>Price (USD)</th>
        </tr>
      </thead>

      <tbody className='font-ibm-plex-mono'>
        {
          data.map(token => {
            return (
              <tr key={token.hash}>
                <td className='flex flex-nowrap px-6 py-4 border-r border-b'>
                  <img className='inline h-8 min-h-8 w-8 min-w-8 mr-3' width={32} height={32} src={token.image || PlaceholderImage} />
                  <span className='mr-2 font-semibold'>{token.symbol}</span>
                  <span className='font-normal text-white/50'>({token.unwrappedSymbol})</span>
                </td>
                <td className='px-6 py-4 text-green-primary border-b'>
                  {token.usd_price}
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}