import { Dispatch, ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import RetryButton from './RetryButton';
import FilterButton from './FilterButton';

type Props = {
  timeFilter: string;
  setTimeFilter: Dispatch<'daily' | 'monthly' | '30-rolling'>;
  children: ReactNode;
  isPending: boolean;
  isError: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  filterControls?: ReactNode;
  title?: string;
}

export default function AnalyticsWrapper({
  timeFilter,
  setTimeFilter,
  children,
  isPending,
  isError,
  refetch,
  filterControls,
}: Props) {

  if (isError) {
    return <RetryButton refetch={refetch} />
  }

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className='bg-white/10 py-5 px-6 rounded-2xl border border-white'>
      <div className='w-full flex sm:flex-row flex-col items-center sm:gap-0 gap-2 justify-between p-2'>
        <div className='flex justify-center items-center gap-3'>
          <FilterButton active={timeFilter === 'daily'} value='daily' onClick={() => setTimeFilter('daily')}>Today</FilterButton>
          <FilterButton active={timeFilter === 'monthly'} value='monthly' onClick={() => setTimeFilter('monthly')}>Month</FilterButton>
          <FilterButton active={timeFilter === '30-rolling'} value='30-rolling' onClick={() => setTimeFilter('30-rolling')}>Last 30 Days</FilterButton>
        </div >
        {filterControls}
      </div>

      <div className='bg-pink-secondary/20 rounded-lg mt-4'>
        <div className='bg-white/5 rounded-lg p-4'>
          {children}
        </div>
      </div>
    </div>
  )
}