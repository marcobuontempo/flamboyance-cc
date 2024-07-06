import { AnalyticsTotalValueLocked } from "../../../types";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import tokens from "../../../flamingo-data/tokens";
import useAnalyticsData from "../../../hooks/useAnalyticsData";
import AnalyticsWrapper from "../../../components/AnalyticsWrapper";

type Props = {}

type TVLEntry = Record<string, string | number>;

type Filters = 'pool_usd' | 'flund_usd' | 'lend_usd';

const selectData = (data: AnalyticsTotalValueLocked[], typeFilter: Filters) => {
  const selected = data.reduce<Array<TVLEntry>>((acc, current) => {
    const entry: Record<string, string | number> = {
      date: current.date.split('T')[0],
      value: parseInt(current.tvl_data[typeFilter]),
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

export default function Claims({ }: Props) {
  const [typeFilter, setTypeFilter] = useState<Filters>('flund_usd');

  const {
    data,
    timeFilter,
    setTimeFilter,
    isPending,
    isError,
  } = useAnalyticsData<TVLEntry>({
    queryKey: 'tvl_data',
    transformData: (data) => selectData(data, typeFilter),
    filters: [typeFilter],
  })

  const filterControls = (
    <div>
      <button className='px-3 border border-solid border-black' value='pool_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Pool</button>
      <button className='px-3 border border-solid border-black' value='flund_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>FLUND</button>
      <button className='px-3 border border-solid border-black' value='lend_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Lend</button>
    </div>
  )

  console.log(data)

  return (
    <AnalyticsWrapper
      setTimeFilter={setTimeFilter}
      isPending={isPending}
      isError={isError}
      filterControls={filterControls}
    >
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray={'5 5'} />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Line dataKey='value' />
        </LineChart>
      </ResponsiveContainer>

    </AnalyticsWrapper>
  )
}