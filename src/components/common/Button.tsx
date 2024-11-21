import { ButtonHTMLAttributes, forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', children, className, ...props }, ref) => {

    const primaryStyle = 'bg-pink-primary text-white hover:bg-black-primary hover:bg-pink-primary/90';
    const secondaryStyle = 'bg-black-primary text-pink-primary hover:bg-pink-primary/10';
    
    let variantStyle = '';
    if (variant === 'primary') {
      variantStyle = primaryStyle;
    } else if (variant === 'secondary') {
      variantStyle = secondaryStyle;
    }

    return (
      <button
        ref={ref}
        className={`px-5 py-3 min-h-14 text-xl font-semibold rounded-2xl border-2 border-pink-primary ${variantStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
);

Button.displayName = "Button";

export default Button;