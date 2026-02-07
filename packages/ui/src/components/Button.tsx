import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { iosAirbnbTheme } from '@antigravity/tokens';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Button Variants
 * Designed with the "Warm Tech" principle:
 * - Primary: Airbnb-inspired coral with soft shadows
 * - Secondary: Clean iOS-style neutral
 * - Glass: Premium frosted effect
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-warm text-button font-semibold transition-all focus-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white shadow-glow-cta hover:bg-primary-light active:bg-primary-dark',
        secondary: 'bg-surface-2 text-navy hover:bg-surface-3 active:bg-neutral-200 border border-border-default',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary/5 active:bg-primary/10',
        ghost: 'text-navy hover:bg-surface-hover active:bg-surface-pressed',
        glass: 'glass-light text-navy hover:glass-heavy active:bg-white/30',
        danger: 'bg-error text-white shadow-sm hover:bg-error-light active:bg-red-700',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-12 w-12 rounded-circle',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = (asChild ? Slot : motion.button) as any;

    // iOS-inspired spring transition
    const springTransition = {
      type: 'spring',
      stiffness: iosAirbnbTheme.easings.iosSpring.stiffness,
      damping: iosAirbnbTheme.easings.iosSpring.damping,
    } as const;

    return (
      <Comp
        ref={ref as any}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        transition={springTransition}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center"
            >
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              className="flex items-center gap-2"
            >
              {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
              <span>{children}</span>
              {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
            </motion.div>
          )
          }
        </AnimatePresence>
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
