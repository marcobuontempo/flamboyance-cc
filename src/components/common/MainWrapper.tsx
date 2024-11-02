import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement> { };

export default function MainWrapper({ className, children, ...props }: Props) {
  return (
    <main
      className={`${className} flex-1 text-white rounded-2xl border-2 border-white backdrop-blur drop-shadow`}
      {...props}
    >
      {children}
    </main>
  )
}