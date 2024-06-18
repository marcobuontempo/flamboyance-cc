import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';

type Props = {}

export default function Claims({ }: Props) {
  const fetchData = async () => {
    return apiClient.getFlamingoLivedataClaimsLatest();
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ['live-data-claims'],
    queryFn: fetchData,
  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  console.log(data);
  return (
    <>
    </>
  )
}