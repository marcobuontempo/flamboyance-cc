import apiClient from "../../../services/api-client";
import { useQueries } from "@tanstack/react-query";
import { LatestResponse, LiveDataPrice, WalletWallet } from "../../../types";
import { tokenHashToData } from "../../../utils/helpers";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useOutletContext } from "react-router-dom";
import { WalletContextType } from "..";

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

export default function Overview({ }: Props) {
  const [address] = useOutletContext<WalletContextType>();

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
    return <div>Loading...</div>;
  }

  if (walletQuery.isError || pricesQuery.isError) {
    return <div>Error loading data</div>;
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
        value: amountAdjusted * price,
        colour: tokenData.colour,
      });

      return acc;
    }, [])
    : [];


  const stats = {
    walletAddress: walletQuery.data?.address,
    walletAge: (walletQuery.data?.created_at_time) ? (currentTime - walletQuery.data?.created_at_time) : 'unopened account',
    walletLastSeen: (walletQuery.data?.last_seen_time) ? (currentTime - walletQuery.data?.last_seen_time) : 'unopened account',
    gasBurned: walletQuery.data?.stats?.gas_burned || 0,
    gasClaimed: walletQuery.data?.stats?.gas_claimed || 0,
    totalTransactions: walletQuery?.data?.stats?.transactions || 0,
    totalTrades: walletQuery.data?.stats?.total_trades || 0,
  };

  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div>
        <p>Address: <span>{stats.walletAddress}</span></p>
        <p>Wallet Age: <span>{stats.walletAge}</span></p>
        <p>Last Seen: <span>{stats.walletLastSeen}</span></p>
      </div>

      <div className='flex min-h-64'>
        <table className='m-2 table'>
          <thead>
            <tr className='bg-blue-300'>
              <th className='p-1 border border-solid border-black' colSpan={2}>Token</th>
              <th className='p-1 border border-solid border-black'>Amount</th>
              <th className='p-1 border border-solid border-black'>Value (USD)</th>
            </tr>
          </thead>
          <tbody>
            {
              balances.map(balance => {
                return (
                  <tr key={balance.hash}>
                    <td className='border border-solid border-black p-2'><img src={balance.image} width={50} height={50} className='object-contain max-w-fit p-2' /></td>
                    <td className='border border-solid border-black p-2'>{balance.symbol}</td>
                    <td className='border border-solid border-black text-right p-2'>{balance.wholeAmount.toFixed(8)}</td>
                    <td className='border border-solid border-black text-right p-2'>{balance.value.toFixed(8)}</td>
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
        >
          <PieChart>
            <Pie
              data={balances}
              dataKey='value'
              nameKey='symbol'
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              label
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

      <div>
        <p>Gas Burned: <span>{stats.gasBurned}</span></p>
        <p>Gas Claimed: <span>{stats.gasClaimed}</span></p>
        <p>Total Trades: <span>{stats.totalTrades}</span></p>
        <p>Total Transactions: <span>{stats.totalTransactions}</span></p>
      </div>
    </div>
  )
}