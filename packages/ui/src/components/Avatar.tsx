import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: 'sm' | 'md' | 'lg';
}

function Avatar({ src, alt, fallback, size = 'md', className, ...props }: AvatarProps) {
    const [hasError, setHasError] = React.useState(false);

    const sizeClasses = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-11 w-11 text-sm',
        lg: 'h-14 w-14 text-base',
    };

    return (
        <div
            className={cn(
                'relative flex shrink-0 overflow-hidden rounded-full bg-surface-2 border border-border-default',
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {src && !hasError ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setHasError(true)}
                    className="aspect-square h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center font-semibold text-navy/60 uppercase">
                    {fallback || alt?.charAt(0) || '?'}
                </div>
            )}
        </div>
    );
}

export { Avatar };
