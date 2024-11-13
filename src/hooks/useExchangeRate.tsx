import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./useReduxHooks";
import { selectPreferredCurrency } from "@/redux/features/preferences/preferencesSlice";
import apiClient from "@services/api-client";

const useExchangeRate = () => {
  const preferredCurrency = useAppSelector(selectPreferredCurrency);

  return useQuery({
    queryKey: ["exchange-rate", preferredCurrency],
    queryFn: () => apiClient.getFlamingoLivedataFiatexchangerate(`USD_${preferredCurrency}`),
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
};

export default useExchangeRate;