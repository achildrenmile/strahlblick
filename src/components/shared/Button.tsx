import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    className = '',
    children,
    ...props
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium rounded-md
      transition-colors duration-150
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantStyles = {
      primary: `
        bg-blue-600 hover:bg-blue-700
        text-white
        focus:ring-blue-500
        dark:bg-blue-500 dark:hover:bg-blue-600
      `,
      secondary: `
        bg-gray-200 hover:bg-gray-300
        text-gray-900
        focus:ring-gray-500
        dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100
      `,
      outline: `
        border border-gray-300 dark:border-gray-600
        bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
        text-gray-700 dark:text-gray-300
        focus:ring-gray-500
      `,
      ghost: `
        bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
        text-gray-700 dark:text-gray-300
        focus:ring-gray-500
      `,
      danger: `
        bg-red-600 hover:bg-red-700
        text-white
        focus:ring-red-500
        dark:bg-red-500 dark:hover:bg-red-600
      `,
    };

    const sizeStyles = {
      sm: 'px-2.5 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2',
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
