import { ButtonHTMLAttributes, forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', children, className, ...props }, ref) => {

    return (
      <button
        ref={ref}
        className={`${className} btn btn-${variant}`}
        {...props}
      >
        {children}
      </button>
    )
  }
);

Button.displayName = "Button";

export default Button;