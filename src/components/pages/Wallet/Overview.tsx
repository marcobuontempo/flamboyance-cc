import Table from "@/components/common/Table";
import { FlamingoToken } from "@/custom-types/flamingo-data";
import { formatRawAmountToDecimals, tokenHashToData } from "@/utils/helpers";
import { LatestResponse, LiveDataPrice, WalletData } from "@custom-types/api";
import { useAppSelector } from "@hooks/useReduxHooks";
import { selectCurrentWalletAddress } from "@redux/features/preferences/preferencesSlice";
import apiClient from "@services/api-client";
import placeholderImage from '@assets/icons/unknown-placeholder.svg'
import { QueryObserverResult, RefetchOptions, useQueries } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import GreenTextCell from "@/components/common/GreenTextCell";
import useExchangeRate from "@/hooks/useExchangeRate";

type TransformedWalletData = FlamingoToken & {
  tokenHash: string;
  amount: string;
};

type CombinedData = TransformedWalletData & LiveDataPrice &
{
  fiat_amount: string;
  unwrappedSymbol: string;
};

export default function Overview() {
  const { preferredCurrency, exchangeRate } = useExchangeRate();
  const currentWalletAddress = useAppSelector(selectCurrentWalletAddress);
  if (!currentWalletAddress) return null;

  const columns: ColumnDef<CombinedData>[] = [
    {
      header: 'Token',
      accessorKey: 'token',
      cell: (info) => (
        <div className="flex flex-nowrap items-center">
          <img className='w-8 h-8 mr-3' src={info.row.original.image} alt={`${info.getValue()} token icon`} width={32} height={32} />
          <span className="font-semibold mr-2 text-white/65">{info.row.original.symbol}</span>
          <span>({info.row.original.unwrappedSymbol})</span>
        </div>
      ),
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
    },
    {
      header: `Total Value (${preferredCurrency})`,
      accessorKey: 'fiat_amount',
      cell: info => <GreenTextCell value={info.getValue() as string} />
    },
  ];
  
  const transformWalletData = (entries: LatestResponse<WalletData>): TransformedWalletData[] | undefined => {
    if (entries.data[0].balances) {
      return Object.entries(entries.data[0].balances)
        .map(([tokenHash, tokenAmount]) => {
          const tokenData = tokenHashToData(tokenHash);
          if (!tokenData) return undefined; // Skip if tokenData is undefined
          return {
            ...tokenData,
            tokenHash,
            amount: formatRawAmountToDecimals(parseInt(tokenAmount), tokenData.decimals),
            image: tokenData.image || placeholderImage,
          };
        })
        .filter((token): token is TransformedWalletData => token !== undefined); // Ensure valid type
    }
    return undefined;
  };
  
  const transformPricesData = (entries: LiveDataPrice[]): LiveDataPrice[] => {
    return entries; // This transformation currently does nothing
  };

  const [walletQuery, pricesQuery] = useQueries({
    queries: [
      {
        queryKey: ['wallet-latest', currentWalletAddress],
        queryFn: () => apiClient.getWalletLatest(currentWalletAddress),
        select: transformWalletData,
      },
      {
        queryKey: ['live-data-prices'],
        queryFn: () => apiClient.getFlamingoLivedataPricesLatest(),
        select: transformPricesData,
      },
    ],
  });

  // Check loading and error states
  const isPending = walletQuery.isLoading || pricesQuery.isLoading;
  const isError = walletQuery.isError || pricesQuery.isError;
  const refetch = async (options?: RefetchOptions): Promise<QueryObserverResult<any, Error>> => {
    await walletQuery.refetch(options);
    return await pricesQuery.refetch(options);
  };  

  // Combine data when both queries are successful
  const data: CombinedData[] =
    walletQuery.data && pricesQuery.data
      ? walletQuery.data.map(walletItem => {
        const priceData = pricesQuery.data?.find(
          priceItem => walletItem.tokenHash === priceItem.hash
        );

        if (!priceData) return undefined; // Skip if no matching price data

        return {
          ...walletItem,
          ...priceData,
          fiat_amount: (parseFloat(walletItem.amount.replace(',','')) * priceData.usd_price * exchangeRate).toLocaleString('en-US', { style: 'currency', currency: preferredCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        };
      })
      .filter((item): item is CombinedData => item !== undefined) // Ensure valid type
      : [];

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
  );
}
