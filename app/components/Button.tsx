import React, { forwardRef } from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
      variants: {
        variant: {
          default: 'bg-primary text-white hover:bg-primary/90',
          outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'underline-offset-4 hover:underline text-primary',
        },
        size: {
          default: 'h-10 px-4 py-2 text-sm',
          sm: 'h-9 px-3 text-sm',
          lg: 'h-11 px-8 text-base',
          icon: 'h-10 w-10',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  );

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {}

  const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
      return (
        <button
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      );
    }
  );
  
  Button.displayName = 'Button';
  
  export { Button, buttonVariants };