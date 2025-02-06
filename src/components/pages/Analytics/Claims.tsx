import { AnalyticsClaim } from "@custom-types/api";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { tokenHashToData } from "@utils/helpers";
import { useState } from "react";
import tokens from "@flamingo-data/tokens";
import useAnalyticsData from "@hooks/useAnalyticsData";
import AnalyticsWrapper from "@components/common/AnalyticsWrapper";
import useExchangeRate from "@/hooks/useExchangeRate";
import FilterButton from "@/components/common/FilterButton";

type ClaimEntry = Record<string, string | number>;

type Filters = 'claims' | 'claims_usd';

export default function Claims() {
  const { preferredCurrency, exchangeRate } = useExchangeRate();

  const [typeFilter, setTypeFilter] = useState<Filters>('claims_usd');

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
        entry[tokenSymbol] = typeFilter === 'claims_usd' ? parseFloat((parseFloat(tokenClaim[typeFilter].replace(',','')) * exchangeRate).toFixed(2)) : parseInt(tokenClaim[typeFilter]);
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
  } = useAnalyticsData<ClaimEntry>({
    queryKey: 'claim_data',
    transformData: (data) => selectData(data, typeFilter),
    filters: [typeFilter],
  })

  const filterControls = (
    <div className='flex justify-center items-center gap-3'>
      <FilterButton active={typeFilter === 'claims'} value='claims' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>#</FilterButton>
      <FilterButton active={typeFilter === 'claims_usd'} value='claims_usd' onClick={(e) => setTypeFilter(e.currentTarget.value as Filters)}>{preferredCurrency}</FilterButton>
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
            Object.entries(tokens).map(([token, attributes]) => (
              <Bar key={token} stackId='a' dataKey={token} fill={attributes.colour} />
            ))
          }

        </BarChart>
      </ResponsiveContainer>

    </AnalyticsWrapper>
  )
}