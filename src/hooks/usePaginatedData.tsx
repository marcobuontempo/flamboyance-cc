import { useRef, useState } from 'react';
import { HistoryResponse, LatestResponse } from '../types';
import { useQuery } from '@tanstack/react-query';

type PaginatedDataHookParams<RawType, TransformedData> = {
  queryKey: string;
  fetchLatest: (...args: any[]) => Promise<LatestResponse<RawType>>;
  fetchHistory: (...args: any[]) => Promise<HistoryResponse<RawType>>;
  transformData: (entry: RawType) => TransformedData;
}

export default function usePaginatedData<RawType, TransformedData>({
  queryKey,
  fetchLatest,
  fetchHistory,
  transformData,
}: PaginatedDataHookParams<RawType, TransformedData>) {

  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = useRef(1);

  const fetchData = () => {
    if (pageIndex === 0) {
      return fetchLatest();
    } else {
      return fetchHistory(pageCount.current - pageIndex);
    }
  }

  const selectData = (data: HistoryResponse<RawType> | LatestResponse<RawType>) => {
    if (pageIndex === 0) {
      data = (data as LatestResponse<RawType>);
      pageCount.current = data.pages;
      data = data.data;
    } else {
      data = (data as HistoryResponse<RawType>);
    }

    return data.map(transformData);
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [queryKey, pageIndex],
    queryFn: fetchData,
    select: selectData,
  })

  return {
    data,
    pageIndex,
    setPageIndex,
    pageCount: pageCount.current,
    isPending,
    isError,
    refetch,
  }
}