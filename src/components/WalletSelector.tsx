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
    <form className='flex flex-col'>
      <fieldset>
        <label>Input NEO N3 Wallet Address</label>
        <input type='text' placeholder='N...' value={newWalletAddress} onChange={(e) => setNewWalletAddress(e.target.value)} />
        <button onClick={handleSubmitNewWallet}>Add Wallet</button>
      </fieldset>

      {
        wallets &&
        <fieldset>
          <label>OR: Select existing wallet...</label>
          <select onChange={(e) => setSelectedWallet(e.target.value)}>
            {wallets.map(address => {
              return <option key={address} value={address}>{address}</option>
            })}
          </select>
          <button onClick={handleSelectExistingWallet}>Select Wallet</button>
        </fieldset>
      }
    </form>
  )
}