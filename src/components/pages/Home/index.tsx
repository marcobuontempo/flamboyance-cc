import useExchangeRate from "@/hooks/useExchangeRate";
import apiClient from "@/services/api-client"
import MainWrapper from "@components/common/MainWrapper"
import { useQueries } from "@tanstack/react-query"
import { PulseLoader } from "react-spinners";

export default function HomePage() {
  const { preferredCurrency, exchangeRate } = useExchangeRate();

  const selectTotalSupplyData = (data: number) => {
    return data.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  const selectTotalValueLocked = (data: string) => {
    return (parseFloat(data.replace(',','')) * exchangeRate).toLocaleString('en-US', { style: 'currency', currency: preferredCurrency, maximumFractionDigits: 0 })
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
    ]
  })

  return (
    <MainWrapper title='Home'>
      <div className='flex flex-wrap gap-3 md:gap-6 text-white/80'>
        <div className='w-full p-6 border border-white rounded-2xl text-center md:text-left'>
          <h3 className='text-2xl font-bold mb-3'>Welcome to Flamboyance</h3>
          <p>
            Flamboyance, your DeFi dashboard for Flamingo Finance! Get real-time insights into token conversions, liquidity pools, staking, and more &mdash; all in one place.
          </p>
          <br />
          <p>
            <span className='underline'>Add your Neo N3 wallet address</span> to effortlessly track all your Flamingo Finance activities. Dive into the DeFi world and maximize your investments with Flamboyance today!
          </p>
        </div>

        <div className='w-full flex flex-col lg:flex-row gap-6 justify-between'>
          <div className='w-full lg:w-1/2 border border-white rounded-2xl p-6'>
            <h4 className='text-center font-bold mb-3'>Total FLM Supply</h4>
            <p className='rounded-lg py-6 px-4 text-3xl font-ibm-plex-mono text-center font-semibold text-pink-primary bg-pink-secondary/25'>
              {
                (totalSupplyQuery.isPending || valueLockedQuery.isPending)
                  ? <PulseLoader color='#D90070' size={10} speedMultiplier={0.35} aria-label='loading spinner' />
                  : totalSupplyQuery.data
              }
            </p>
          </div>
          <div className='w-full lg:w-1/2 border border-white rounded-2xl p-6'>
            <h4 className='text-center font-bold mb-3'>Total Value Locked ({preferredCurrency})</h4>
            <p className='rounded-lg py-6 px-4 text-3xl font-ibm-plex-mono text-center font-semibold text-green-primary bg-green-secondary/25'>
              {
                (totalSupplyQuery.isPending || valueLockedQuery.isPending)
                  ? <PulseLoader color='#3AD900' size={10} speedMultiplier={0.35} aria-label='loading spinner' />
                  : valueLockedQuery.data
              }
            </p>
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}