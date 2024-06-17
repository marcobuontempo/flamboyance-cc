import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

type Props = {}

export default function ErrorPage({ }: Props) {
  const error: unknown = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <main className='h-dvh flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col justify-center items-center w-1/2 h-1/2 border-2 border-solid border-black'>
        <div className='p-5'>
          <p className='text-4xl p-5 font-bold'>Oops!</p>
          <p className='sm:text-3xl text-xl'>something is wrong.</p>
          <p className='pt-5 italic'>{error.statusText || error.message}</p>
        </div>
        <Link to='/' className='border-2 border-solid border-black p-2'>Go to Home</Link>
      </div>
    </main>
  )
}