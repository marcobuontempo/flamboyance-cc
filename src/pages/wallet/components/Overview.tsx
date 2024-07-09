import apiClient from "../../../services/api-client";
import { useQueries } from "@tanstack/react-query";
import { LatestResponse, LiveDataPrice, WalletWallet } from "../../../types";
import { convertFiatCurrency, convertRawAmountToDecimals, tokenHashToData } from "../../../utils/helpers";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useOutletContext } from "react-router-dom";
import { WalletContextType } from "..";
import { useContext } from "react";
import { UserSessionContext } from "../../../contexts/UserSessionContext";
import tokens from "../../../flamingo-data/tokens";
import LoadingSpinner from "../../../components/LoadingSpinner";
import RetryFetch from "../../../components/RetryFetch";

type Props = {}

type BalanceItem = {
  hash: string;
  image: string;
  symbol: string;
  wholeAmount: number;
  value: number;
  colour: string;
}

const fetchWalletData = async (address: string) => {
  return apiClient.getWalletWalletLatest(address);
}

const selectWalletData = (data: LatestResponse<WalletWallet>) => {
  const walletData = data.data[0];
  return walletData;
}

const fetchPricesData = async () => {
  return apiClient.getFlamingoLivedataPricesLatest();
}

const selectPricesData = (data: LiveDataPrice[]) => {
  return data;
}

const gasData = tokens['GAS'];

export default function Overview({ }: Props) {
  const [address] = useOutletContext<WalletContextType>();
  const sessionContext = useContext(UserSessionContext);

  const currentTime = Date.now();

  const [walletQuery, pricesQuery] = useQueries({
    queries: [
      {
        queryKey: ['wallet-overview'],
        queryFn: () => fetchWalletData(address),
        select: selectWalletData,
      },
      {
        queryKey: ['live-data-prices'],
        queryFn: () => fetchPricesData(),
        select: selectPricesData,
      }
    ],
  })

  if (walletQuery.isPending || pricesQuery.isPending) {
    return <LoadingSpinner />;
  }

  if (walletQuery.isError) {
    return <RetryFetch refetch={walletQuery.refetch} />;
  }

  if (pricesQuery.isError) {
    return <RetryFetch refetch={pricesQuery.refetch} />;
  }

  const balances = walletQuery.data?.balances
    ? Object.entries(walletQuery.data.balances).reduce<BalanceItem[]>((acc, [token, amount]) => {
      if (!token.startsWith('0x')) return acc;

      const tokenData = tokenHashToData(token);
      const price = pricesQuery.data.find((entry) => entry.hash === token)?.usd_price || 0;
      if (!tokenData || !price) return acc;

      const amountAdjusted = parseInt(amount) / Math.pow(10, tokenData.decimals);

      acc.push({
        hash: token,
        image: tokenData.image,
        symbol: tokenData.symbol,
        wholeAmount: amountAdjusted,
        value: parseFloat(convertFiatCurrency(amountAdjusted * price, sessionContext?.exchangeRate, 4)),
        colour: tokenData.colour,
      });

      return acc;
    }, [])
    : [];


  const stats = {
    walletAddress: walletQuery.data?.address,
    walletAge: (walletQuery.data?.created_at_time) ? (currentTime - walletQuery.data.created_at_time) : 0,
    walletLastSeen: (walletQuery.data?.last_seen_time) ? (currentTime - walletQuery.data.last_seen_time) : 0,
    gasBurned: walletQuery.data?.stats?.gas_burned || 0,
    gasClaimed: walletQuery.data?.stats?.gas_claimed || 0,
    totalTransactions: walletQuery?.data?.stats?.transactions || 0,
    totalTrades: walletQuery.data?.stats?.total_trades || 0,
  };

  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className='p-2 text-center neobrutalist-border-1 m-2 bg-cyan-100'>
        <p className='break-words'><b>Address:</b> <span>{stats.walletAddress}</span></p>
        <div className='flex w-full justify-center gap-2 text-xs'>
          <p><b>Wallet Age:</b> <span className='font-SpaceMono'>{stats.walletAge === 0 ? 'unopened account' : `${(stats.walletAge / 1000 / 60 / 60 / 24).toFixed(2)} days old`}</span></p>
          <p><b>Last Seen:</b> <span className='font-SpaceMono'>{stats.walletLastSeen === 0 ? 'unopened account' : `${(stats.walletLastSeen / 1000 / 60 / 60 / 24).toFixed(2)} days ago`}</span></p>
        </div>
      </div>

      {
        balances.length > 0 ?
          <div className='flex min-h-64 sm:flex-row flex-col'>
            <table className='m-2 table neobrutalist-border-1'>
              <thead>
                <tr className='bg-cyan-100 border-b-2 border-black border-solid'>
                  <th className='p-1 border border-solid border-black' colSpan={2}>Token</th>
                  <th className='p-1 border border-solid border-black'>Amount</th>
                  <th className='p-1 border border-solid border-black'>Value ({sessionContext?.currency})</th>
                </tr>
              </thead>
              <tbody className='bg-purple-50 font-SpaceMono'>
                {
                  balances.map(balance => {
                    return (
                      <tr key={balance.hash}>
                        <td className='border border-solid border-black p-2'><img src={balance.image} width={50} height={50} className='object-contain max-w-fit p-2' /></td>
                        <td className='border border-solid border-black p-2'>{balance.symbol}</td>
                        <td className='border border-solid border-black text-right p-2'>{balance.wholeAmount.toFixed(4)}</td>
                        <td className='border border-solid border-black text-right p-2'>{balance.value.toFixed(4)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>


            {/* DONUT CHART */}
            <ResponsiveContainer
              height={'100%'}
              width={'100%'}
              minHeight={300}
            >
              <PieChart>
                <Tooltip />
                <Pie
                  data={balances}
                  dataKey='value'
                  nameKey='symbol'
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={100}
                >
                  {
                    balances.map((entry, index) => {
                      return <Cell
                        key={`cell-${index}`}
                        fill={entry.colour}
                        style={{
                          outline: 'none',
                        }}
                      />
                    })
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          :
          <div className='text-center'>No tokens to display.</div>
      }


      <div className='p-2 text-center neobrutalist-border-1 m-2 bg-cyan-100'>
        <div className='flex w-full justify-center gap-5'>
          <p><b>Gas Burned:</b> <span className='font-SpaceMono'>{convertRawAmountToDecimals(stats.gasBurned, gasData.decimals, 4)}</span></p>
          <p><b>Gas Claimed:</b> <span className='font-SpaceMono'>{convertRawAmountToDecimals(stats.gasClaimed, gasData.decimals, 4)}</span></p>
        </div>
        <div className='flex w-full justify-center gap-5'>
          <p><b>Total Trades:</b> <span className='font-SpaceMono'>{stats.totalTrades}</span></p>
          <p><b>Total Transactions:</b> <span className='font-SpaceMono'>{stats.totalTransactions}</span></p>
        </div>
      </div>
    </div>
  )
}