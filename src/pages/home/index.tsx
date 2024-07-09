import { useQueries } from "@tanstack/react-query"
import apiClient from "../../services/api-client"
import { convertFiatCurrency } from "../../utils/helpers"
import { useContext } from "react"
import { UserSessionContext } from "../../contexts/UserSessionContext"
import LoadingSpinner from "../../components/LoadingSpinner"
import RetryFetch from "../../components/RetryFetch"
import styled, { keyframes } from "styled-components"

type Props = {}

const moveBackground = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
`;

const BackgroundMain = styled.main`
  position: relative;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(/images/logo.png);
    background-repeat: repeat;
    background-size: 50px 50px;
    opacity: 0.2;
    z-index: -1;
    animation: ${moveBackground} 60s linear infinite;
  }
`;

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
    <BackgroundMain className='w-full h-full flex-1 flex flex-col justify-center items-center bg-cyan-50'>
      {
        (totalSupplyQuery.isPending || valueLockedQuery.isPending) ?
          <LoadingSpinner /> :
          <div className='flex sm:flex-row flex-col justify-center items-center neobrutalist-border-2 md:p-20 sm:p-10 text-2xl bg-cyan-100'>
            <div className='p-5 sm:p-8 text-center'>
              <h2 className='text-2xl sm:text-4xl font-bold text-purple-400 font-LexendMega'>Welcome to Flamboyance</h2>
              <p className='italic text-center text-lg'>a <a href='https://flamingo.finance/' target='_blank' className='font-bold text-purple-400'>Flamingo Finance</a> DeFi dashboard & explorer</p>
            </div>
            <div className='w-fit sm:text-xl text-lg'>
              <div className='py-2'>
                <p className='font-bold'>Total FLM Supply:</p>
                <p className='font-SpaceMono'>{totalSupplyQuery.data.toFixed(2)}</p>
              </div>
              <div className='py-2'>
                <p className='font-bold'>Total Value Locked ({sessionContext?.currency}):</p>
                <p className='font-SpaceMono'>{valueLockedQuery.data}</p>
              </div>
            </div>
          </div>
      }
    </BackgroundMain>
  )
}