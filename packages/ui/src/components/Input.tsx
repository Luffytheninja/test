import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  isLoading?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, description, error, isLoading, leftElement, rightElement, className, ...props },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="w-full space-y-2 group">
        {label && (
          <label className="block text-overline font-semibold text-navy/60 group-focus-within:text-primary transition-colors">
            {label}
          </label>
        )}

        <div className="relative">
          <motion.div
            animate={isFocused ? { scale: 1.005 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
              'flex items-center rounded-md border-2 transition-all px-4 bg-surface-bg',
              isFocused
                ? 'border-primary shadow-sm ring-4 ring-primary/5'
                : 'border-border-default hover:border-border-strong',
              error && 'border-error ring-error/10',
              className,
            )}
          >
            {leftElement && (
              <div className="mr-3 text-navy/40 transition-colors group-focus-within:text-primary">
                {leftElement}
              </div>
            )}

            <input
              ref={ref}
              className={cn(
                'flex-1 bg-transparent py-4 text-body font-medium focus:outline-none placeholder:text-neutral-400',
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />

            {isLoading ? (
              <div className="ml-3 h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            ) : rightElement ? (
              <div className="ml-3 text-navy/40 transition-colors group-focus-within:text-primary">
                {rightElement}
              </div>
            ) : null}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-caption font-semibold text-error pl-1"
            >
              {error}
            </motion.p>
          ) : description ? (
            <p className="text-caption text-navy/40 pl-1">{description}</p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
