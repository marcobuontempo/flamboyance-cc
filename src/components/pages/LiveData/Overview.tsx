import { LiveDataPrice } from "@/custom-types/api";
import apiClient from "@/services/api-client"
import { tokenHashToData } from "@/utils/helpers";
import Table from "@/components/common/Table";
import placeholderImage from "@assets/icons/unknown-placeholder.svg";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";


type TransformedLiveDataPrice = Omit<LiveDataPrice, 'usd_price'> &
{
  usd_price: string;
  image: string;
};

const columns: ColumnDef<TransformedLiveDataPrice>[] = [
  {
    header: 'Token',
    accessorKey: 'symbol',
    cell: (info) => (
      <div className="flex flex-nowrap">
        <img className='w-8 h-8 mr-3' src={info.row.original.image} alt={`${info.getValue()} token icon`} width={32} height={32} />
        <span className="font-semibold mr-2 text-white/65">{info.getValue() as string}</span>
        <span>({info.row.original.unwrappedSymbol})</span>
      </div>
    ),
  },
  {
    header: 'Price (USD)',
    accessorKey: 'usd_price',
    cell: (info) => (
      <span className="text-green-primary">{info.getValue() as string}</span>
    )
  },
];

const transformData = (entries: LiveDataPrice[]): TransformedLiveDataPrice[] => {
  return entries.map(entry => {
    const tokenData = tokenHashToData(entry.hash);
    return {
      ...entry,
      usd_price: entry.usd_price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 8, minimumFractionDigits: 8 }),
      image: tokenData?.image || placeholderImage,
    };
  });
};

export default function Overview() {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['live-data-overview'],
    queryFn: () => apiClient.getFlamingoLivedataPricesLatest(),
    select: transformData,
  });

  return (
    <div className="flex justify-center items-center">
      <Table
        data={data}
        columns={columns}
        isPending={isPending}
        isError={isError}
        refetch={refetch}
        className="w-full max-w-2xl"
      />
    </div>
  )
}