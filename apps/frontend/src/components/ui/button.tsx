'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type ButtonNativeProps = React.ComponentPropsWithRef<'button'>;
type SlotProps = React.ComponentPropsWithoutRef<typeof Slot>;

export interface ButtonProps
  extends Omit<ButtonNativeProps, keyof SlotProps>,
    SlotProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
      outline: 'border border-input bg-background hover:bg-secondary/50 shadow-sm',
      ghost: 'hover:bg-secondary/50 shadow-none',
      accent: 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm hover:shadow-md',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-5 py-3 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-2',
      icon: 'h-10 w-10',
    };

    const childContent = loading ? (
      <>
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {children}
      </>
    ) : (
      children
    );

    return (
      <Comp
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {childContent}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };