import { AnalyticsClaim, AnalyticsPool } from "../../../types";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { poolHashToData, tokenHashToData } from "../../../utils/helpers";
import { useState } from "react";
import tokens from "../../../flamingo-data/tokens";
import useAnalyticsData from "../../../hooks/useAnalyticsData";
import AnalyticsWrapper from "../../../components/AnalyticsWrapper";
import pools from "../../../flamingo-data/pools";

type Props = {}

type PoolEntry = Record<string, string | number>;

type Filters = 'swaps' | 'volume_usd_total';

const selectData = (data: AnalyticsPool[], typeFilter: Filters) => {
  console.log(data);
  const selected = data.reduce<Array<PoolEntry>>((acc, current) => {
    const dateFormatted = current.date.split('T')[0];
    const entry: PoolEntry = {
      date: dateFormatted,
    }

    for (let key in current.pool_data) {
      if (!key.startsWith('0x')) continue;
      const pool = current.pool_data[key] as any;
      const poolData = poolHashToData(key);
      const poolSymbol = poolData?.symbol || key;
      const value = pool[typeFilter];
      if (value) {
        entry[poolSymbol] = parseInt(value);
      }
    }

    acc.push(entry);
    return acc;
  }, [])

  const sorted = selected.sort((a, b) => {
    const aDate = a.date as string;
    const bDate = b.date as string;
    return aDate.localeCompare(bDate);
  })

  console.log(sorted)

  return sorted;
};

export default function Pools({ }: Props) {
  const [typeFilter, setTypeFilter] = useState<Filters>('volume_usd_total');

  const {
    data,
    setTimeFilter,
    isPending,
    isError,
  } = useAnalyticsData<PoolEntry>({
    queryKey: 'pool_data',
    transformData: (data) => selectData(data, typeFilter),
    filters: [typeFilter],
  })

  const filterControls = (
    <div>
      <button className='px-3 border border-solid border-black' value='swaps' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Swaps</button>
      <button className='px-3 border border-solid border-black' value='volume_usd_total' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Volume $</button>
    </div>
  )

  return (
    <AnalyticsWrapper
      setTimeFilter={setTimeFilter}
      isPending={isPending}
      isError={isError}
      filterControls={filterControls}
    >
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <BarChart
          data={data}
        >
          <CartesianGrid strokeDasharray={'3 3'} />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />

          {
            Object.entries(pools).map(([token, attributes]) => (
              <Bar key={token} stackId='a' dataKey={token} fill={attributes.colour} />
            ))
          }

        </BarChart>
      </ResponsiveContainer>

    </AnalyticsWrapper>
  )
}