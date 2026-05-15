import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const baseStyles = 'rounded-xl p-6 transition-all duration-200';
    const variantStyles = {
      default: 'bg-white border border-gray-200 shadow-md hover:shadow-lg',
      elevated: 'bg-white shadow-lg hover:shadow-xl',
      outlined: 'bg-transparent border-2 border-blue-200 hover:border-blue-400',
    };

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;