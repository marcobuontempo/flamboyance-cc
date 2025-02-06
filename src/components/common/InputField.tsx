import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`h-14 bg-white/10 px-5 rounded-lg w-full border border-white/10 font-medium text-xl ${className}`}
        {...props}
      >
        {children}
      </input>
    )
  }
);

InputField.displayName = "InputField";

export default InputField;