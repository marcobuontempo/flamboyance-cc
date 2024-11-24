import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./useReduxHooks";
import { selectPreferredCurrency } from "@/redux/features/preferences/preferencesSlice";
import apiClient from "@services/api-client";

const useExchangeRate = () => {
  let currentPreferredCurrency = useAppSelector(selectPreferredCurrency);

  const { data } = useQuery({
    queryKey: ['exchange-rate', currentPreferredCurrency],
    queryFn: () => apiClient.getFlamingoLivedataFiatexchangerate(`USD_${currentPreferredCurrency}`),
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

  // Set the values depending whether the fetch was successful. If unsuccessful, use USD with 1 as exchange rate
 let exchangeRate;
 let preferredCurrency;

 if (data) {
  exchangeRate = data;
  preferredCurrency = currentPreferredCurrency;
 } else {
  exchangeRate = 1;
  preferredCurrency = 'USD';
 }

  return {
    preferredCurrency,
    exchangeRate,
  }
};

export default useExchangeRate;