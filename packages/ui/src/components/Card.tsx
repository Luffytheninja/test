import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { iosAirbnbTheme } from '@antigravity/tokens';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Card Variants
 * - Default: Airbnb style, warm white with soft shadow
 * - Glass: Premium iOS FROSTED effect
 * - Outline: Clean and minimal
 */
const cardVariants = cva('relative overflow-hidden transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-surface-bg border border-border-default shadow-md',
      glass: 'glass-light shadow-lg',
      outline: 'bg-transparent border-2 border-border-strong shadow-none',
      subtle: 'bg-surface-subtle border border-border-muted shadow-sm',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4 md:p-5',
      md: 'p-6 md:p-8',
      lg: 'p-8 md:p-12',
    },
    radius: {
      default: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      warm: 'rounded-warm', // iOS + Airbnb signature
    }
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    radius: 'warm',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      radius,
      asChild = false,
      headerSlot,
      footerSlot,
      hoverable = false,
      children,
      onDrag, // Omit to avoid motion collision
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onDragOver,
      onDrop,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : motion.div;

    const springTransition: any = {
      type: 'spring',
      stiffness: iosAirbnbTheme.easings.gentleSpring.stiffness,
      damping: iosAirbnbTheme.easings.gentleSpring.damping,
    };

    return (
      <Comp
        ref={ref as any}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        whileHover={hoverable ? { y: -4, boxShadow: iosAirbnbTheme.shadows.lg } : undefined}
        transition={springTransition}
        className={cn(cardVariants({ variant, padding, radius, className }))}
        {...props}
      >
        {headerSlot && (
          <div className="mb-4 border-b border-border-muted px-6 py-4 -mx-6 -mt-6 bg-surface-bg/50 backdrop-blur-sm">
            {headerSlot}
          </div>
        )}

        <div className="relative z-10 w-full">{children}</div>

        {footerSlot && (
          <div className="mt-6 pt-6 border-t border-border-muted bg-surface-bg/50 backdrop-blur-sm -mx-6 -mb-6 px-6 py-4">
            {footerSlot}
          </div>
        )}
      </Comp>
    );
  },
);

Card.displayName = 'Card';

export { Card, cardVariants };
