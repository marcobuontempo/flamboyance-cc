import { MouseEvent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { addWalletToLocalStorage, getLocalStorageWallets, isValidNeoN3Address } from "../utils/helpers";

type Props = {}

export default function WalletSelector({ }: Props) {
  const [wallets, setWallets] = useState<string[] | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const storedWallets = getLocalStorageWallets();
    if (storedWallets.length > 0) {
      setWallets(storedWallets);
      setSelectedWallet(storedWallets[0]);
    }
  }, [])

  const handleSubmitNewWallet = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validAddress = await isValidNeoN3Address(newWalletAddress);
    if (validAddress) {
      addWalletToLocalStorage(newWalletAddress);
      searchParams.set('address', newWalletAddress);
      setSearchParams(searchParams);
    }
  }

  const handleSelectExistingWallet = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedWallet) {
      searchParams.set('address', selectedWallet);
      setSearchParams(searchParams);
    }
  }

  return (
    <form className='flex flex-col justify-center items-center neobrutalist-border-1 bg-purple-200'>
      <fieldset className='flex flex-col justify-center items-center gap-2 p-5 w-full'>
        <label className='font-semibold'>Input NEO N3 Wallet Address:</label>
        <input className='sm:w-96 w-full px-2' type='text' placeholder='N...' value={newWalletAddress} onChange={(e) => setNewWalletAddress(e.target.value)} />
        <button className='neobrutalist-border-1 px-2 py-1 bg-purple-50 hover:bg-cyan-400 font-LexendMega' onClick={handleSubmitNewWallet}>Add Wallet</button>
      </fieldset>

      {
        wallets &&
        <>
          <p className='font-bold'>
            OR
          </p>
          <fieldset className='flex flex-col justify-center items-center gap-2 p-5 w-full'>
            <label className='font-semibold'>Select existing wallet:</label>
            <select className='sm:w-96 w-full' onChange={(e) => setSelectedWallet(e.target.value)}>
              {wallets.map(address => {
                return <option key={address} value={address}>{address}</option>
              })}
            </select>
            <button className='neobrutalist-border-1 px-2 py-1 bg-purple-50 hover:bg-cyan-400 font-LexendMega' onClick={handleSelectExistingWallet}>Select Wallet</button>
          </fieldset>
        </>
      }
    </form>
  )
}