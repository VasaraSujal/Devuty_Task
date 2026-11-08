'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: number }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative w-full overflow-hidden rounded-full border bg-secondary',
      className
    )}
    {...props}
  >
    <div
      className="flex h-full w-full flex-col justify-center overflow-hidden text-sm font-medium transition-colors text-foreground"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    >
      <div className="h-full w-full bg-primary text-primary-foreground transition-shadow duration-300" />
    </div>
  </div>
));
Progress.displayName = 'Progress';

export { Progress };