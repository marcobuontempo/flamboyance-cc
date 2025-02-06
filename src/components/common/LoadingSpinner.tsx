import { MoonLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="min-w-full min-h-full flex-1 flex justify-center items-center relative self-center justify-self-center">
      <MoonLoader
        color="#EE006B"
        speedMultiplier={0.3}
        size={50}
        aria-label="loading spinner"
      />
      <div className="absolute flex justify-center items-center">
        <img
          src="/images/logo_alt.svg"
          height={25}
          width={25}
          className="w-1/2 h-1/2"
        />
      </div>
    </div>
  );
}