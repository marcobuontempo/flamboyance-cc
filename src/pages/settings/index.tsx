import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import MainWrapper from '../../components/MainWrapper';
import { defaultUserSessionValues, UserSessionContext } from '../../contexts/UserSessionContext';
import { LocalStorageSettings } from '../../types';
import { setLocalStorageSettings } from '../../utils/helpers';

type Props = {}

export default function SettingsPage({ }: Props) {
  const sessionContext = useContext(UserSessionContext);

  const [currency, setCurrency] = useState(sessionContext?.currency || defaultUserSessionValues.currency);

  useEffect(() => {
    if (sessionContext) {
      setCurrency(sessionContext.currency)
    }
  }, [sessionContext])

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  }

  const handleSaveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirm('Save Settings? This will refresh your webpage.')) {
      const settings: LocalStorageSettings = {
        currency,
      }
      setLocalStorageSettings(settings);

      sessionContext?.setUserSession({
        ...sessionContext,
        currency,
      });

      location.reload();  // simple way to ensure settings are reloaded into session (such as exchange rate fetch, on website load)
    }
  }

  const handleClearLocalData = () => {
    if (confirm('Clear all local data?')) {
      localStorage.clear();
      location.reload();
    }
  }

  return (
    <MainWrapper>
      <h2 className='text-2xl uppercase text-center p-2 font-bold'>Settings</h2>
      <form className='h-full flex flex-col text-center' onSubmit={handleSaveSettings}>
        <fieldset className='w-full p-3'>
          <label className='block text-lg font-bold text-purple-800' htmlFor='currency'>Currency</label>
          <select id='currency' onChange={handleCurrencyChange} value={currency}>
            <option value='USD'>US Dollar (USD)</option>
            <option value='EUR'>Euro (EUR)</option>
            <option value='JPY'>Japanese Yen (JPY)</option>
            <option value='GBP'>Pound Sterling (GBP)</option>
            <option value='AUD'>Australian Dollar (AUD)</option>
            <option value='CAD'>Canadian Dollar (CAD)</option>
            <option value='CHF'>Swiss Franc (CHF)</option>
            <option value='CNH'>Chinese Renminbi (CNH)</option>
            <option value='HKD'>Hong Kong Dollar (HKD)</option>
            <option value='NZD'>New Zealand Dollar (NZD)</option>
          </select>
        </fieldset>

        <div className='flex flex-col justify-center gap-2 pt-5'>
          <button className='neobrutalist-border-1 font-bold px-2 py-1 bg-cyan-300 hover:bg-purple-50' type='submit'>Save Settings</button>
          <button className='neobrutalist-border-1 font-bold px-2 py-1 bg-red-500 hover:bg-red-700' id='clear-wallets' type='button' onClick={handleClearLocalData}>Clear Local Data</button>
        </div>
      </form>
    </MainWrapper>
  )
}