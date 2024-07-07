import { Link } from 'react-router-dom'

type Props = {}

export default function Overview({ }: Props) {
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <Link to='/analytics/claims' className='neobrutalist-border-1 w-40 text-center font-bold p-2 bg-cyan-100 hover:bg-cyan-200'>Claims</Link>
      <Link to='/analytics/total-value-locked' className='neobrutalist-border-1 w-40 text-center font-bold p-2 bg-cyan-100 hover:bg-cyan-200'>Total Value Locked</Link>
      <Link to='/analytics/pools' className='neobrutalist-border-1 w-40 text-center font-bold p-2 bg-cyan-100 hover:bg-cyan-200'>Pools</Link>
    </div>
  )
}