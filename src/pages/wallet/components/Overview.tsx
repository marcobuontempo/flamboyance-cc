import { useContext } from "react";
import apiClient from "../../../services/api-client";
import { useQueries } from "@tanstack/react-query";
import { HexString, LatestResponse, LiveDataPrice, WalletWallet } from "../../../types";
import { tokenHashToData } from "../../../utils/helpers";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { WalletContext } from "../../../contexts/WalletContext";

type Props = {}

type BalanceItem = {
  hash: string;
  image: string;
  symbol: string;
  wholeAmount: number;
  value: number;
}

const COLOURS = ["#FF0000", "#FF00FF", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#000000", "#FFFFFF"];

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
  const wallet = useContext(WalletContext);

  if (!wallet?.current) return null;

  const currentTime = Date.now();

  const [walletQuery, pricesQuery] = useQueries({
    queries: [
      {
        queryKey: ['wallet-overview'],
        queryFn: () => fetchWalletData(wallet.current!),
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

      const tokenInfo = tokenHashToData(token as HexString);
      const price = pricesQuery.data.find((entry) => entry.hash === token)?.usd_price || 0;
      if (!tokenInfo || !price) return acc;

      const amountAdjusted = parseInt(amount) / Math.pow(10, tokenInfo.decimals);

      acc.push({
        hash: token,
        image: 'IMG',
        symbol: tokenInfo.symbol,
        wholeAmount: amountAdjusted,
        value: amountAdjusted * price,
      });

      return acc;
    }, [])
    : [];


  const stats = {
    walletAddress: walletQuery.data?.address || wallet.current!,
    walletAge: (walletQuery.data?.created_at_time) ? (currentTime - walletQuery.data?.created_at_time) : 'unopened account',
    walletLastSeen: (walletQuery.data?.last_seen_time) ? (currentTime - walletQuery.data?.last_seen_time) : 'unopened account',
    gasBurned: walletQuery.data?.stats?.gas_burned || 0,
    gasClaimed: walletQuery.data?.stats?.gas_claimed || 0,
    totalTransactions: walletQuery?.data?.stats?.transactions || 0,
    totalTrades: walletQuery.data?.stats?.total_trades || 0,
  };

  return (
    <div className='w-full h-full flex flex-col'>
      <div>
        <p>Address: <span>{stats.walletAddress}</span></p>
        <p>Wallet Age: <span>{stats.walletAge}</span></p>
        <p>Last Seen: <span>{stats.walletLastSeen}</span></p>
      </div>

      <div className='flex min-h-64'>
        <table className='m-2 table border border-solid border-black'>
          <thead>
            <tr className='bg-blue-300'>
              <th></th>
              <th className='p-1 border border-solid border-black'>Token</th>
              <th className='p-1 border border-solid border-black'>Amount</th>
              <th className='p-1 border border-solid border-black'>Value (USD)</th>
            </tr>
          </thead>
          <tbody>
            {
              balances.map(balance => {
                return (
                  <tr key={balance.hash}>
                    <td className='border border-solid border-black'><img src={balance.image} /></td>
                    <td className='border border-solid border-black'>{balance.symbol}</td>
                    <td className='border border-solid border-black'>{balance.wholeAmount}</td>
                    <td className='border border-solid border-black'>{balance.value}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {/* DONUT CHART */}
        <ResponsiveContainer
          className='min-h-full'
        >
          <PieChart
            width={250}
            height={250}
          >
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
                    fill={COLOURS[index % COLOURS.length]}
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