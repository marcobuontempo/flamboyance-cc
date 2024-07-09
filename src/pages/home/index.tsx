import { useQueries } from "@tanstack/react-query"
import apiClient from "../../services/api-client"
import { convertFiatCurrency } from "../../utils/helpers"
import { useContext } from "react"
import { UserSessionContext } from "../../contexts/UserSessionContext"
import LoadingSpinner from "../../components/LoadingSpinner"
import RetryFetch from "../../components/RetryFetch"

type Props = {}


export default function HomePage({ }: Props) {
  const sessionContext = useContext(UserSessionContext);

  const selectTotalSupplyData = (data: number) => {
    return data;
  }

  const selectTotalValueLocked = (data: string) => {
    return convertFiatCurrency(parseFloat(data), sessionContext?.exchangeRate, 2);
  }

  const [totalSupplyQuery, valueLockedQuery] = useQueries({
    queries: [
      {
        queryKey: ['flm-total-supply'],
        queryFn: () => apiClient.getFlamingoAnalyticsFlamingoTotalsupply(),
        select: selectTotalSupplyData,
      },
      {
        queryKey: ['flm-total-value-locked'],
        queryFn: () => apiClient.getFlamingoAnalyticsFlamingoUsdvaluelocked(),
        select: selectTotalValueLocked,
      }
    ],
  })

  if (totalSupplyQuery.isError) {
    return <RetryFetch refetch={totalSupplyQuery.refetch} />;
  }

  if (valueLockedQuery.isError) {
    return <RetryFetch refetch={valueLockedQuery.refetch} />;
  }

  return (
    <main className='w-full h-full flex-1 flex flex-col justify-center items-center bg-cyan-50'>
      {
        (totalSupplyQuery.isPending || valueLockedQuery.isPending) ?
          <LoadingSpinner /> :
          <div className='neobrutalist-border-2 sm:p-20 p-10 text-2xl bg-cyan-100'>
            <div className='py-2'>
              <p className='font-bold'>Total FLM Supply:</p>
              <p className='font-SpaceMono'>{totalSupplyQuery.data.toFixed(2)}</p>
            </div>
            <div className='py-2'>
              <p className='font-bold'>Total Value Locked ({sessionContext?.currency}):</p>
              <p className='font-SpaceMono'>{valueLockedQuery.data}</p>
            </div>
          </div>
      }
    </main>
  )
}