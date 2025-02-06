import { ButtonHTMLAttributes, forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', children, className, disabled, ...props }, ref) => {

    let variantStyle = '';
    let disabledStyle = '';
    if (variant === 'primary') {
      variantStyle = 'bg-pink-primary text-white hover:bg-pink-primary/90';
      disabledStyle = 'border-white/10 text-black-primary bg-white/10 hover:bg-white/10';
    } else if (variant === 'secondary') {
      variantStyle = 'bg-black-primary text-pink-primary hover:bg-pink-primary/10';
      disabledStyle = 'border-white/10 text-white/10'
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${className} px-5 py-3 min-h-14 text-xl font-semibold rounded-lg border-2 w-full text-left flex justify-between items-center ${disabled ? `${disabledStyle} cursor-default` : `${variantStyle} border-pink-primary cursor-pointer`}`}
        {...props}
      >
        {children}
      </button>
    )
  }
);

Button.displayName = "Button";

export default Button;