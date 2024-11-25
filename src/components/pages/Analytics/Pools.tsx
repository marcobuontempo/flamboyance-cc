import { AnalyticsPool } from "@custom-types/api";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { poolHashToData } from "@utils/helpers";
import { useState } from "react";
import useAnalyticsData from "@hooks/useAnalyticsData";
import AnalyticsWrapper from "@components/common/AnalyticsWrapper";
import pools from "@flamingo-data/pools";
import useExchangeRate from "@/hooks/useExchangeRate";
import FilterButton from "@/components/common/FilterButton";

type PoolEntry = Record<string, string | number>;

type Filters = 'swaps' | 'volume_usd_total';

export default function Pools() {
  const { preferredCurrency, exchangeRate } = useExchangeRate();
  const [typeFilter, setTypeFilter] = useState<Filters>('volume_usd_total');


  const selectData = (data: AnalyticsPool[], typeFilter: Filters) => {
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
          entry[poolSymbol] = typeFilter === 'volume_usd_total' ? parseFloat(value) * exchangeRate : parseInt(value);
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

    return sorted;
  };

  const {
    data,
    timeFilter,
    setTimeFilter,
    isPending,
    isError,
    refetch,
  } = useAnalyticsData<PoolEntry>({
    queryKey: 'pool_data',
    transformData: (data) => selectData(data, typeFilter),
    filters: [typeFilter],
  })

  const filterControls = (
    <div className='flex justify-center items-center gap-3'>
      <FilterButton active={typeFilter === 'swaps'} value={'swaps'} onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>#</FilterButton>
      <FilterButton active={typeFilter === 'volume_usd_total'} value={'volume_usd_total'} onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>{preferredCurrency}</FilterButton>
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
        <BarChart
          data={data}
        >
          <CartesianGrid strokeDasharray={'3 3'} strokeWidth={1} stroke="#ffffff33" />
          <XAxis dataKey='date' fontSize={'12px'} />
          <YAxis fontSize={'12px'} domain={['auto', 'auto']} />
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