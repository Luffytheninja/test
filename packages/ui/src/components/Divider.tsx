import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
}

function Divider({
    orientation = 'horizontal',
    decorative = true,
    className,
    ...props
}: DividerProps) {
    return (
        <div
            role={decorative ? 'none' : 'separator'}
            aria-orientation={decorative ? undefined : orientation}
            className={cn(
                'shrink-0 bg-border-muted',
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
                className
            )}
            {...props}
        />
    );
}

export { Divider };
