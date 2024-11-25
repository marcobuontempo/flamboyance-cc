import Button from "@components/common/Button";
import SelectDropdown from "@components/common/SelectDropdown"
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks"
import { resetPreferences, selectPreferredCurrency, setPreferredCurrency } from "@/redux/features/preferences/preferencesSlice";
import MainWrapper from "@components/common/MainWrapper"
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import SaveIcon from "@assets/icons/save.svg?react"
import TrashIcon from "@assets/icons/trash.svg?react"

const currencyOptions = {
  'USD': 'US Dollar $',
  'EUR': 'Euro €',
  'GBP': 'Great Britain Pound £',
  'AUD': 'Australian Dollar $',
  'CNY': 'Chinese Yuan ¥',
  'HKD': 'Hong Kong Dollar $',
  'KRW': 'Korean Won ₩',
  'JPY': 'Japanese Yen ¥',
}

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const currentPreferredCurrency = useAppSelector(selectPreferredCurrency);

  const [currencyOption, setCurrencyOption] = useState(currentPreferredCurrency);

  const handleCurrencySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPreferredCurrency(currencyOption));
  }

  const handleClearData = (e: MouseEvent<HTMLButtonElement>) => {
    if (confirm('Confirm deletion of data and settings?')) {
      dispatch(resetPreferences());
    } else {
      e.preventDefault();
    }
  }

  return (
    <MainWrapper title='Settings'>
      <form
        className="w-full rounded-2xl p-8 mb-6 border text-white/80"
        onSubmit={handleCurrencySubmit}
      >
        <h2 className="font-bold text-2xl pb-4">Set Currency:</h2>
        <SelectDropdown
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrencyOption(e.target.value)}
          value={currencyOption}>
          {
            Object.entries(currencyOptions).map(([currencySymbol, currencyName]) => (
              <option className="bg-black-primary/90" key={currencySymbol} value={currencySymbol}>{currencyName} ({currencySymbol})</option>
            ))
          }
        </SelectDropdown>
        <Button
          variant="primary"
          className="mt-4"
          disabled={currencyOption === currentPreferredCurrency}
        >
          <span>Save Settings</span>
          <SaveIcon />
        </Button>
      </form>

      <form className="w-full rounded-2xl p-8 border text-white/80">
        <h2 className="font-bold text-2xl pb-4">Local Data:</h2>
        <p className="text-lg">
          Clearing local browser data on Flamboyance will remove all saved information, including your wallet(s) and selected currency. This action resets your browsing experience by deleting stored site data, ensuring your privacy but also requiring you to re-enter any previously saved details.
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={handleClearData}
        >
          <span>Clear Local Data</span>
          <TrashIcon />
        </Button>
      </form>
    </MainWrapper >
  )
}