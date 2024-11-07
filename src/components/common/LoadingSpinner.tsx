import { MoonLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className='w-full h-full inline-flex justify-center items-center relative'>
      <MoonLoader
        color='#EE006B'
        speedMultiplier={0.3}
        size={50}
        aria-label='loading spinner'
      />
      <img src='/images/logo_alt.svg' height={25} width={25} className='w-1/2 h-1/2 absolute -top-0.5 left-0 right-0 bottom-0 m-auto' />
    </div>
  )
}