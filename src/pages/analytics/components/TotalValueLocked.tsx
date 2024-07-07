import { AnalyticsTotalValueLocked } from "../../../types";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useContext, useState } from "react";
import useAnalyticsData from "../../../hooks/useAnalyticsData";
import AnalyticsWrapper from "../../../components/AnalyticsWrapper";
import { convertFiatCurrency } from "../../../utils/helpers";
import { UserSessionContext } from "../../../contexts/UserSessionContext";

type Props = {}

type TVLEntry = Record<string, string | number>;

type Filters = 'pool_usd' | 'flund_usd' | 'lend_usd';

const DEFAULT_FILTER_STYLE = 'px-3 border border-solid border-black';
const ACTIVE_FILTER_STYLE = DEFAULT_FILTER_STYLE + ' font-bold';

const selectData = (data: AnalyticsTotalValueLocked[], typeFilter: Filters, exchangeRate: number | undefined) => {
  const selected = data.reduce<Array<TVLEntry>>((acc, current) => {
    const entry: Record<string, string | number> = {
      date: current.date.split('T')[0],
      value: convertFiatCurrency(parseInt(current.tvl_data[typeFilter]), exchangeRate, 4),
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

export default function TotalValueLocked({ }: Props) {
  const sessionContext = useContext(UserSessionContext);
  const [typeFilter, setTypeFilter] = useState<Filters>('flund_usd');

  const {
    data,
    timeFilter,
    setTimeFilter,
    isPending,
    isError,
  } = useAnalyticsData<TVLEntry>({
    queryKey: 'tvl_data',
    transformData: (data) => selectData(data, typeFilter, sessionContext?.exchangeRate),
    filters: [typeFilter],
  })

  const filterControls = (
    <div>
      <button className={(typeFilter === 'pool_usd') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='pool_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Pool</button>
      <button className={(typeFilter === 'flund_usd') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='flund_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>FLUND</button>
      <button className={(typeFilter === 'lend_usd') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='lend_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>Lend</button>
    </div>
  )

  return (
    <AnalyticsWrapper
      timeFilter={timeFilter}
      setTimeFilter={setTimeFilter}
      isPending={isPending}
      isError={isError}
      filterControls={filterControls}
      title={`Total Value Locked (${sessionContext?.currency})`}
    >
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray={'3 3'} />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Line dataKey='value' />
        </LineChart>
      </ResponsiveContainer>

    </AnalyticsWrapper>
  )
}