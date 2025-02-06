import { FlamingoPool, FlamingoToken } from "@/custom-types/flamingo-data";
import placeholderImage from '@assets/icons/unknown-placeholder.svg';

type Props = {
  amount: string;
  token: FlamingoToken | FlamingoPool;
  hideImage?: boolean;
}

export default function TokenAmountCell({ amount, token, hideImage = false }: Props) {
  const tokenSymbol = token?.symbol || 'unknown';
  const tokenImage = !hideImage && (token as FlamingoToken)?.image;

  return (
    <div className="flex flex-nowrap items-center">
      {!hideImage && (
        <img
          className="max-w-8 w-8 mr-3 object-contain"
          src={tokenImage || placeholderImage}
          alt={`${tokenSymbol} token symbol`}
          width={32}
          height={32}
        />
      )}
      {amount && <span className="mr-2 font-medium">{amount}</span>}
      {token && <span>({token.symbol})</span>}
    </div>
  );
}