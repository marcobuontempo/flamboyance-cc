import { AnalyticsPool } from "../../../types";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { poolHashToData } from "../../../utils/helpers";
import { useContext, useState } from "react";
import useAnalyticsData from "../../../hooks/useAnalyticsData";
import AnalyticsWrapper from "../../../components/AnalyticsWrapper";
import pools from "../../../flamingo-data/pools";
import { UserSessionContext } from "../../../contexts/UserSessionContext";

type Props = {}

type PoolEntry = Record<string, string | number>;

type Filters = 'swaps' | 'volume_usd_total';

const DEFAULT_FILTER_STYLE = 'px-3 border border-solid border-black';
const ACTIVE_FILTER_STYLE = DEFAULT_FILTER_STYLE + ' font-bold';

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

  return sorted;
};

export default function Pools({ }: Props) {
  const sessionContext = useContext(UserSessionContext);
  const [typeFilter, setTypeFilter] = useState<Filters>('volume_usd_total');

  const {
    data,
    timeFilter,
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
      <button className={(typeFilter === 'swaps') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='swaps' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Swaps #</button>
      <button className={(typeFilter === 'volume_usd_total') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='volume_usd_total' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Volume ({sessionContext?.currency})</button>
    </div>
  )

  return (
    <AnalyticsWrapper
      timeFilter={timeFilter}
      setTimeFilter={setTimeFilter}
      isPending={isPending}
      isError={isError}
      filterControls={filterControls}
      title='Pools'
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