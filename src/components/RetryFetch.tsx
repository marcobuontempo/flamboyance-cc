import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

type Props = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

export default function RetryFetch({ refetch }: Props) {
  return (
    <div className='w-full h-full text-center flex flex-col justify-center items-center'>
      <p className='text-2xl p-3'>Error loading data!</p>
      <button className='border-2 border-solid border-black px-5 py-1 text-lg font-bold bg-cyan-100 hover:bg-cyan-200' onClick={() => refetch()}>Retry</button>
    </div>
  )
}