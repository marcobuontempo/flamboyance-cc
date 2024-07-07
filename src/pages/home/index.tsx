import { useQueries } from "@tanstack/react-query"
import MainWrapper from "../../components/MainWrapper"
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

  if (totalSupplyQuery.isPending || valueLockedQuery.isPending) {
    return <LoadingSpinner />;
  }

  if (totalSupplyQuery.isError) {
    return <RetryFetch refetch={totalSupplyQuery.refetch} />;
  }

  if (valueLockedQuery.isError) {
    return <RetryFetch refetch={valueLockedQuery.refetch} />;
  }

  return (
    <MainWrapper>
      <h1 className='sm:text-6xl text-4xl pb-10 font-LexendMega'>Flamboyance</h1>
      <div className='neobrutalist-border-1 p-5 text-2xl bg-cyan-50'>
        <p className='p-2'><b>Total FLM Supply: </b><span className='font-SpaceMono'>{totalSupplyQuery.data}</span></p>
        <p className='p-2'><b>Total Value Locked ({sessionContext?.currency}): </b><span className='font-SpaceMono'>{valueLockedQuery.data}</span></p>
      </div>
    </MainWrapper>
  )
}