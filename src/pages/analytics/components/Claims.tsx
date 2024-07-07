import { AnalyticsClaim } from "../../../types";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { tokenHashToData } from "../../../utils/helpers";
import { useState } from "react";
import tokens from "../../../flamingo-data/tokens";
import useAnalyticsData from "../../../hooks/useAnalyticsData";
import AnalyticsWrapper from "../../../components/AnalyticsWrapper";

type Props = {}

type ClaimEntry = Record<string, string | number>;

type Filters = 'claims' | 'claims_usd';

const DEFAULT_FILTER_STYLE = 'px-3 border border-solid border-black';
const ACTIVE_FILTER_STYLE = DEFAULT_FILTER_STYLE + ' font-bold';

const selectData = (data: AnalyticsClaim[], typeFilter: Filters) => {
  const selected = data.reduce<Array<ClaimEntry>>((acc, current) => {
    const dateFormatted = current.date.split('T')[0];
    const entry: ClaimEntry = {
      date: dateFormatted,
    }

    for (let key in current.claim_data) {
      if (!key.startsWith('0x')) continue;
      const tokenClaim = current.claim_data[key] as any;
      const tokenData = tokenHashToData(key);
      const tokenSymbol = tokenData?.symbol || key;
      entry[tokenSymbol] = parseInt(tokenClaim[typeFilter]);
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
  const [typeFilter, setTypeFilter] = useState<Filters>('claims_usd');

  const {
    data,
    timeFilter,
    setTimeFilter,
    isPending,
    isError,
  } = useAnalyticsData<ClaimEntry>({
    queryKey: 'claim_data',
    transformData: (data) => selectData(data, typeFilter),
    filters: [typeFilter],
  })

  const filterControls = (
    <div>
      <button className={(typeFilter === 'claims') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='claims' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>#</button>
      <button className={(typeFilter === 'claims_usd') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='claims_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>$</button>
    </div>
  )

  return (
    <AnalyticsWrapper
      timeFilter={timeFilter}
      setTimeFilter={setTimeFilter}
      isPending={isPending}
      isError={isError}
      filterControls={filterControls}
      title='Claims'
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
            Object.entries(tokens).map(([token, attributes]) => (
              <Bar key={token} stackId='a' dataKey={token} fill={attributes.colour} />
            ))
          }

        </BarChart>
      </ResponsiveContainer>

    </AnalyticsWrapper>
  )
}