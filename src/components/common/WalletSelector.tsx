import { useAppDispatch, useAppSelector } from "@hooks/useReduxHooks";
import { addSavedWalletAddress, selectSavedWalletAddresses, setCurrentWalletAddress } from "@redux/features/preferences/preferencesSlice";
import { ChangeEvent, FormEvent, useState } from "react"
import PlusIcon from '@assets/icons/plus.svg?react'
import LoginIcon from '@assets/icons/login.svg?react'
import Button from "@components/common/Button";
import { isValidNeoN3Address } from "@utils/helpers";
import HorizontalRule from "./HorizontalRule";
import SelectDropdown from "./SelectDropdown";
import InputField from "./InputField";

type Props = {}

export default function WalletSelector({ }: Props) {
  const dispatch = useAppDispatch();
  const savedWalletAddresses = useAppSelector(selectSavedWalletAddresses);

  const [existingAddress, setExistingAddress] = useState<string | undefined>(savedWalletAddresses[0]);
  const [newAddress, setNewAddress] = useState("");

  const selectExistingWallet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (existingAddress) {
      dispatch(setCurrentWalletAddress(existingAddress));
      setNewAddress("");
      setExistingAddress(undefined);
    }
  }

  const addNewWallet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await isValidNeoN3Address(newAddress)) {
      dispatch(addSavedWalletAddress(newAddress));
      dispatch(setCurrentWalletAddress(newAddress));
      setNewAddress("");
      setExistingAddress(undefined);
    }
  }

  return (
    <div className="flex flex-col gap-6 text-white/80">
      {
        savedWalletAddresses.length > 0 &&
        <>
          <form
            className="p-8 rounded-2xl border-2 border-solid border-white"
            onSubmit={selectExistingWallet}
          >
            <h2 className="text-2xl font-bold pb-4">Select Neo N3 Wallet Address:</h2>
            <SelectDropdown
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setExistingAddress(e.target.value)}
              value={existingAddress}
            >
              {savedWalletAddresses.map((address) => (
                <option className="bg-black-primary/90" key={address} value={address}>{address}</option>
              ))}
            </SelectDropdown>
            <Button
              className="mt-4"
              variant="secondary"
            >
              <span>Select Wallet</span>
              <LoginIcon />
            </Button>
          </form>

          <div className="flex justify-center items-center">
            <HorizontalRule className="w-1/3" />
            <span className="px-3">OR</span>
            <HorizontalRule className="w-1/3" />
          </div>
        </>
      }
      <form
        className="p-8 rounded-2xl border-2 border-solid border-white"
        onSubmit={addNewWallet}
      >
        <h2 className="text-2xl font-bold pb-4">Add Neo N3 Wallet Address:</h2>
        <p className="pb-4">Add your NEO N3 wallet address to effortlessly track all your Flamingo Finance activities. Dive into the DeFi world and maximise your investments with Flamboyance today!</p>
        <InputField
          type='text'
          placeholder="N..."
          onInput={(e: ChangeEvent<HTMLInputElement>) => setNewAddress(e.target.value)}
          value={newAddress}
        />
        <Button
          className="mt-4"
          variant="primary"
        >
          <span>Add New Wallet</span>
          <PlusIcon />
        </Button>
      </form>


    </div>
  )
}