import { Link } from 'react-router-dom'

type Props = {}

export default function Overview({ }: Props) {
  return (
    <div className='flex flex-col gap-5 justify-center items-center p-5'>
      GO TO:
      <Link to='/analytics/claims' className='neobrutalist-border-1 w-40 text-center font-bold p-2 bg-cyan-100 hover:bg-cyan-200 font-LexendMega'>Claims</Link>
      <Link to='/analytics/total-value-locked' className='neobrutalist-border-1 w-40 text-center font-bold p-2 bg-cyan-100 hover:bg-cyan-200 font-LexendMega'>Total Value Locked</Link>
      <Link to='/analytics/pools' className='neobrutalist-border-1 w-40 text-center font-bold p-2 bg-cyan-100 hover:bg-cyan-200 font-LexendMega'>Pools</Link>
    </div>
  )
}