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
    <div className='w-full py-5 px-6 rounded-2xl border border-white/10 bg-white-black-gradient-primary'>
      <div className='w-full flex lg:flex-row flex-col items-center flex-wrap gap-2 justify-between p-2'>
        <div className='flex justify-center items-stretch gap-3'>
          <FilterButton active={timeFilter === 'daily'} value='daily' onClick={() => setTimeFilter('daily')}>Today</FilterButton>
          <FilterButton active={timeFilter === 'monthly'} value='monthly' onClick={() => setTimeFilter('monthly')}>Month</FilterButton>
          <FilterButton active={timeFilter === '30-rolling'} value='30-rolling' onClick={() => setTimeFilter('30-rolling')}>Last 30 Days</FilterButton>
        </div >
        {filterControls}
      </div>

      <div className='bg-pink-primary/20 rounded-lg mt-4'>
        <div className='bg-white-transparent rounded-lg p-4'>
          {children}
        </div>
      </div>
    </div>
  )
}