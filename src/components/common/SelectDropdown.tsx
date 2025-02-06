import { forwardRef, SelectHTMLAttributes } from "react";
import ArrowIcon from "@assets/icons/arrow.svg?react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {

}

const SelectDropdown = forwardRef<HTMLSelectElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className="relative">
        <ArrowIcon className="absolute right-0 top-0 bottom-0 m-auto mr-3 rotate-180 pointer-events-none" />
        <select
          ref={ref}
          className={`h-14 bg-white/10 pl-5 pr-8 rounded-lg w-full border-2 border-white/10 font-medium text-xl cursor-pointer appearance-none ${className}`}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  }
);

SelectDropdown.displayName = "SelectDropdown";

export default SelectDropdown;