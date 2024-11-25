import { ButtonHTMLAttributes, forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const DEFAULT_FILTER_STYLE = 'px-4 py-2 text-pink-primary border-2 border-pink-primary rounded-lg font-semibold hover:bg-pink-primary/10';
const ACTIVE_FILTER_STYLE = `${DEFAULT_FILTER_STYLE} bg-pink-primary/20 hover:bg-pink-primary/20`;

const FilterButton = forwardRef<HTMLButtonElement, Props>(
  ({ active, children, className, disabled, ...props }, ref) => {

    return (
      <button
        ref={ref}
        className={`${className} ${active ? ACTIVE_FILTER_STYLE : DEFAULT_FILTER_STYLE}`}
        {...props}
      >
        {children}
      </button>
    )
  }
);

FilterButton.displayName = "FilterButton";

export default FilterButton;