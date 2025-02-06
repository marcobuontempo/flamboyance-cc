import { AnalyticsTotalValueLocked } from "@custom-types/api";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import useAnalyticsData from "@hooks/useAnalyticsData";
import AnalyticsWrapper from "@components/common/AnalyticsWrapper";
import useExchangeRate from "@hooks/useExchangeRate";
import FilterButton from "@/components/common/FilterButton";

type Props = {}

type TVLEntry = Record<string, string | number>;

type Filters = 'pool_usd' | 'flund_usd' | 'lend_usd';


export default function TotalValueLocked({ }: Props) {
  const { preferredCurrency, exchangeRate } = useExchangeRate();
  const [typeFilter, setTypeFilter] = useState<Filters>('flund_usd');

  const selectData = (data: AnalyticsTotalValueLocked[], typeFilter: Filters) => {
    const selected = data.reduce<Array<TVLEntry>>((acc, current) => {
      const entry: Record<string, string | number> = {
        date: current.date.split('T')[0],
        [preferredCurrency]: parseFloat((parseFloat(current.tvl_data[typeFilter].replace(',', '')) * exchangeRate).toFixed(2)),
      }

      acc.push(entry);
      return acc;
    }, [])

    const sorted = selected.sort((a, b) => {
      const aDate = a.date as string;
      const bDate = b.date as string;
      return aDate.localeCompare(bDate);
    })

    return sorted;
  };


  const {
    data,
    timeFilter,
    setTimeFilter,
    isPending,
    isError,
    refetch,
  } = useAnalyticsData<TVLEntry>({
    queryKey: 'tvl_data',
    transformData: (data) => selectData(data, typeFilter),
    filters: [typeFilter],
  })

  const filterControls = (
    <div className='flex justify-center items-center gap-3'>
      <FilterButton active={typeFilter === 'pool_usd'} value='pool_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Pool</FilterButton>
      <FilterButton active={typeFilter === 'flund_usd'} value='flund_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>FLUND</FilterButton>
      <FilterButton active={typeFilter === 'lend_usd'} value='lend_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Lend</FilterButton>
    </div>
  )

  return (
    <AnalyticsWrapper
      timeFilter={timeFilter}
      setTimeFilter={setTimeFilter}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
      filterControls={filterControls}
    >
      <ResponsiveContainer width={'100%'} height={'100%'} minHeight={300}>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray={'3 3'} strokeWidth={1} stroke="#ffffff33" />
          <XAxis dataKey='date' fontSize={'12px'} />
          <YAxis fontSize={'12px'} domain={['auto', 'auto']} />
          <Tooltip />
          <Line dataKey={preferredCurrency} stroke='#d90070' strokeWidth={4} dot={false} />
        </LineChart>
      </ResponsiveContainer>

    </AnalyticsWrapper>
  )
}