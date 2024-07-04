import { useQuery } from "@tanstack/react-query"
import apiClient from "../../../services/api-client"
import { AnalyticsClaim } from "../../../types";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { tokenHashToData } from "../../../utils/helpers";
import { useState } from "react";
import tokens from "../../../flamingo-data/tokens";

type Props = {}

const fetchData = (timeFilter: string) => {
  if (timeFilter === 'latest') {
    return apiClient.getFlamingoAnalyticsMonthlatest('claim_data');
  } else if (timeFilter === '30days') {
    return apiClient.getFlamingoAnalyticsRolling30days('claim_data');
  } else {
    return apiClient.getFlamingoAnalyticsMonthlatest('claim_data');
  }
}

const selectData = (data: AnalyticsClaim[], typeFilter: string) => {
  const selected = data.reduce<Array<Record<string, string | number>>>((acc, current) => {
    const dateFormatted = current.date.split('T')[0];
    const entry: Record<string, string | number> = {
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
  const [timeFilter, setTimeFilter] = useState('latest');
  const [typeFilter, setTypeFilter] = useState('claims');

  const { data, isPending, isError, } = useQuery({
    queryKey: ['analytics-claims', timeFilter, typeFilter],
    queryFn: () => fetchData(timeFilter),
    select: (fetched) => selectData(fetched, typeFilter),
  })

  if (isError) {
    return <div>Error!</div>
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <button className='px-3 border border-solid border-black' value='latest' onClick={(e) => setTimeFilter(e.currentTarget.value)}>Latest</button>
        <button className='px-3 border border-solid border-black' value='30days' onClick={(e) => setTimeFilter(e.currentTarget.value)}>30 Days</button>
      </div>
      <div>
        <button className='px-3 border border-solid border-black' value='claims' onClick={(e) => setTypeFilter(e.currentTarget.value)}>#</button>
        <button className='px-3 border border-solid border-black' value='claims_usd' onClick={(e) => setTypeFilter(e.currentTarget.value)}>$</button>
      </div>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <BarChart
          data={data}
        >
          <CartesianGrid strokeDasharray={'5 5'} />
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
    </>
  )
}