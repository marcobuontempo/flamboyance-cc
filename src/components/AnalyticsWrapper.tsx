import { Dispatch, ReactNode } from 'react'

type Props = {
  setTimeFilter: Dispatch<string>;
  children: ReactNode;
  isPending: boolean;
  isError: boolean;
  filterControls?: ReactNode;
}

export default function AnalyticsWrapper({
  setTimeFilter,
  children,
  isPending,
  isError,
  filterControls,
}: Props) {

  if (isError) {
    return <div>Error!</div>
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <button className='px-3 border border-solid border-black' value='daily' onClick={(e) => setTimeFilter(e.currentTarget.value)}>Daily</button>
        <button className='px-3 border border-solid border-black' value='monthly' onClick={(e) => setTimeFilter(e.currentTarget.value)}>Month</button>
        <button className='px-3 border border-solid border-black' value='30-rolling' onClick={(e) => setTimeFilter(e.currentTarget.value)}>30 Days</button>
      </div>

      {filterControls}

      {children}
    </>
  )
}