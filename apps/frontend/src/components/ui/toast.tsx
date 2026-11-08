'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  description?: string;
  action?: React.ReactNode;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, description, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(toastVariants({ variant, className }), 'flex flex-col')}
      {...props}
    >
      {children}
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      {action && <div className="ml-auto">{action}</div>}
    </div>
  )
);
Toast.displayName = 'Toast';

export { Toast, toastVariants };

// Simple toast context
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const ToastViewport: React.FC<{ className?: string }> = ({ className }) => {
  const [toasts, setToasts] = React.useState<string[]>([]);

  return (
    <div
      className={cn(
        'fixed bottom-0 z-50 flex flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:inline-flex sm:w-auto sm:max-w-xs sm:rounded-lg',
        className
      )}
    >
      {toasts.map((toast) => (
        <div key={toast} className="mb-2 rounded-md bg-background p-4 shadow-lg">
          {toast}
        </div>
      ))}
    </div>
  );
};

export { ToastProvider, ToastViewport };