import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-white shadow hover:opacity-90',
                secondary: 'border-transparent bg-surface-2 text-navy hover:bg-neutral-200',
                destructive: 'border-transparent bg-error text-white shadow hover:opacity-90',
                outline: 'text-navy border border-border-default',
                success: 'border-transparent bg-success text-white shadow hover:opacity-90',
                warning: 'border-transparent bg-warning text-white shadow hover:opacity-90',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
