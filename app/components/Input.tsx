import React from 'react'
import { cn } from '../lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,value, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-700/50 bg-transparent px-2',
          className,
        )}
        ref={ref}
        {...props}
        value={value}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };