import apiClient from "@/services/api-client"
import MainWrapper from "@components/common/MainWrapper"
import { useQueries } from "@tanstack/react-query"

export default function HomePage() {

  const selectTotalSupplyData = (data: number) => {
    return data.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  const selectTotalValueLocked = (data: string) => {
    return parseFloat(data).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
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
      <div className='flex flex-wrap gap-6 p-8 text-white/80'>
        <div className='w-full p-6 border border-white rounded-2xl'>
          <h3 className='text-2xl font-bold mb-3'>Welcome to Flamboyance</h3>
          <p>
            Flamboyance, your DeFi dashboard for Flamingo Finance! Get real-time insights into token conversions, liquidity pools, staking, and more &mdash; all in one place.
          </p>
          <br />
          <p>
            <span className='underline'>Add your Neo N3 wallet address</span> to effortlessly track all your Flamingo Finance activities. Dive into the DeFi world and maximize your investments with Flamboyance today!
          </p>
        </div>

        <div className='w-full flex gap-6 justify-between'>
          <div className='w-1/2 border border-white rounded-2xl p-6'>
            <h4 className='text-center font-bold mb-3'>Total FLM Supply</h4>
            <p className='rounded-lg py-6 px-4 text-3xl font-ibm-plex-mono text-center font-semibold text-pink-primary bg-pink-secondary/25'>
              {
                (totalSupplyQuery.isPending || valueLockedQuery.isPending)
                  ? '...'
                  : totalSupplyQuery.data
              }
            </p>
          </div>
          <div className='w-1/2 border border-white rounded-2xl p-6'>
            <h4 className='text-center font-bold mb-3'>Total Value Locked (USD)</h4>
            <p className='rounded-lg py-6 px-4 text-3xl font-ibm-plex-mono text-center font-semibold text-green-primary bg-green-secondary/25'>
              {
                (totalSupplyQuery.isPending || valueLockedQuery.isPending)
                  ? '...'
                  : valueLockedQuery.data
              }
            </p>
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}