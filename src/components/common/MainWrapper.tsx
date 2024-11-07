import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  baseURL?: string;
  redirectURL?: string;
};

export default function MainWrapper({ title, baseURL, redirectURL, className, children, ...props }: Props) {
  return (
    <main
      className={`flex flex-col overflow-x-hidden flex-1 text-white rounded-2xl ${className}`}
      {...props}
    >
      <h2 className='text-center text-2xl tracking-widest font-bold py-5 rounded-t-2xl border-2 border-b-0 border-white bg-white/10 overflow-hidden whitespace-nowrap'>{title}</h2>
      <div className='flex-1 overflow-x-auto rounded-b-2xl border-2 border-t-0 border-white p-8'>
        {children}
      </div>
    </main>
  )
}