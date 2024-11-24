import { LiveDataPrice } from "@/custom-types/api";
import apiClient from "@/services/api-client"
import { tokenHashToData } from "@/utils/helpers";
import Table from "@/components/common/Table";
import placeholderImage from "@assets/icons/unknown-placeholder.svg";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import GreenTextCell from "@/components/common/GreenTextCell";
import useExchangeRate from "@/hooks/useExchangeRate";


type TransformedLiveDataPrice = LiveDataPrice &
{
  fiat_price: string;
  image: string;
};

export default function Overview() {
  const { preferredCurrency, exchangeRate } = useExchangeRate();

  const columns: ColumnDef<TransformedLiveDataPrice>[] = [
    {
      header: 'Token',
      accessorKey: 'symbol',
      cell: (info) => (
        <div className="flex flex-nowrap items-center">
          <img className='w-8 h-8 mr-3' src={info.row.original.image} alt={`${info.getValue()} token icon`} width={32} height={32} />
          <span className="font-semibold mr-2 text-white/65">{info.getValue() as string}</span>
          <span>({info.row.original.unwrappedSymbol})</span>
        </div>
      ),
    },
    {
      header: `Price (${preferredCurrency})`,
      accessorKey: 'fiat_price',
      cell: info => <GreenTextCell value={info.getValue() as string} />
    },
  ];

  const transformData = (entries: LiveDataPrice[]): TransformedLiveDataPrice[] => {
    return entries.map(entry => {
      const tokenData = tokenHashToData(entry.hash);
      return {
        ...entry,
        fiat_price: (entry.usd_price * exchangeRate).toLocaleString('en-US', { style: 'currency', currency: preferredCurrency, maximumFractionDigits: 8, minimumFractionDigits: 8 }),
        image: tokenData?.image || placeholderImage,
      };
    });
  };

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