import { Dispatch, ReactNode } from 'react'

type Props = {
  timeFilter: string;
  setTimeFilter: Dispatch<'daily' | 'monthly' | '30-rolling'>;
  children: ReactNode;
  isPending: boolean;
  isError: boolean;
  filterControls?: ReactNode;
  title?: string;
}

const DEFAULT_FILTER_STYLE = 'px-3 border border-solid border-black';
const ACTIVE_FILTER_STYLE = DEFAULT_FILTER_STYLE + ' font-bold';

export default function AnalyticsWrapper({
  timeFilter,
  setTimeFilter,
  children,
  isPending,
  isError,
  filterControls,
  title,
}: Props) {

  if (isError) {
    return <div>Error!</div>
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <>
      {title && <h2>{title}</h2>}
      <div className='w-full flex justify-between p-2'>
        <div>
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