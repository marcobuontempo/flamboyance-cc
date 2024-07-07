import { Dispatch, ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner';
import RetryFetch from './RetryFetch';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

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

const DEFAULT_FILTER_STYLE = 'px-3 neobrutalist-border-1 bg-cyan-100 font-LexendMega';
const ACTIVE_FILTER_STYLE = 'font-bold bg-cyan-300 ' + DEFAULT_FILTER_STYLE;

export default function AnalyticsWrapper({
  timeFilter,
  setTimeFilter,
  children,
  isPending,
  isError,
  refetch,
  filterControls,
  title,
}: Props) {

  if (isError) {
    return <RetryFetch refetch={refetch} />
  }

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {title && <h2 className='text-2xl uppercase text-center p-2 font-bold font-LexendMega'>{title}</h2>}
      <div className='w-full flex sm:flex-row flex-col items-center sm:gap-0 gap-2 justify-between p-2'>
        <div className='flex justify-center items-center'>
          <button className={(timeFilter === 'daily') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='daily' onClick={() => setTimeFilter('daily')}>Daily</button>
          <button className={(timeFilter === 'monthly') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='monthly' onClick={() => setTimeFilter('monthly')}>Month</button>
          <button className={(timeFilter === '30-rolling') ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE} value='30-rolling' onClick={() => setTimeFilter('30-rolling')}>30 Days</button >
        </div >
        {filterControls}
      </div>

      {children}
    </>
  )
}