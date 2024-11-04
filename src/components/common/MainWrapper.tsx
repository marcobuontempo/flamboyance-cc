import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
};

export default function MainWrapper({ title, className, children, ...props }: Props) {
  return (
    <main
      className={`${className} flex-1 text-white rounded-2xl`}
      {...props}
    >
      <h2 className='text-white/60 text-center text-2xl tracking-widest font-bold py-6 rounded-t-2xl border-2 border-b-0 border-white bg-white/10 overflow-hidden whitespace-nowrap'>{title}</h2>
      <div className='rounded-b-2xl border-2 border-t-0 border-white'>
        {children}
      </div>
    </main>
  )
}