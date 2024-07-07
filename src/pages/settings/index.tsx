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

  const handleClearLocalData = () => {
    localStorage.clear();
    location.reload();
  }

  return (
    <MainWrapper>
      <h2>Settings</h2>
      <form className='h-full flex flex-col text-center' onSubmit={handleSaveSettings}>
        <fieldset className='w-full p-3'>
          <label className='block' htmlFor='currency'>Currency</label>
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

        <div className='flex flex-col justify-center'>
          <button className='block' type='submit'>Save Settings</button>
          <button className='block' id='clear-wallets' type='button' onClick={handleClearLocalData}>Clear Local Data</button>
        </div>
      </form>
    </MainWrapper>
  )
}