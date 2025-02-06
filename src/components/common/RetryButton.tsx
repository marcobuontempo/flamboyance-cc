import Button from './Button'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

type Props = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
}

export default function RetryButton({ refetch }: Props) {
  return (
    <Button onClick={() => refetch()}>
      Retry
    </Button>
  )
}