import { useState } from 'react';
import { CollectionType } from '../types';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';

type AnalyticsDataHookParams<TransformedData> = {
  queryKey: CollectionType;
  transformData: (data: any) => TransformedData[];
  filters?: string[];
}

export default function useAnalyticsData<TransformedData>({
  queryKey,
  transformData,
  filters = [],
}: AnalyticsDataHookParams<TransformedData>) {

  const [timeFilter, setTimeFilter] = useState<'daily' | 'monthly' | '30-rolling'>('monthly');

  const fetchData = async () => {
    let data;
    if (timeFilter === 'daily') {
      data = await apiClient.getFlamingoAnalyticsDailylatest(queryKey);
    } else if (timeFilter === 'monthly') {
      data = await apiClient.getFlamingoAnalyticsMonthlatest(queryKey);
    } else if (timeFilter === '30-rolling') {
      data = await apiClient.getFlamingoAnalyticsRolling30days(queryKey);
    } else {
      data = await apiClient.getFlamingoAnalyticsDailylatest(queryKey);
    }
    return Array.isArray(data) ? data : [data];
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [queryKey, timeFilter, ...filters],
    queryFn: fetchData,
    select: transformData,
  })

  return {
    data,
    timeFilter,
    setTimeFilter,
    isPending,
    isError,
    refetch,
  }
}