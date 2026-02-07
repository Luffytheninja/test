import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    {
        variants: {
            variant: {
                default: 'bg-surface-bg text-navy border-border-default',
                destructive:
                    'border-error/50 text-error dark:border-error [&>svg]:text-error bg-error-subtle',
                success:
                    'border-success/50 text-success dark:border-success [&>svg]:text-success bg-success-subtle',
                warning:
                    'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning bg-warning-subtle',
                info:
                    'border-info/50 text-info dark:border-info [&>svg]:text-info bg-info-subtle',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
    title?: string;
    onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant, title, children, onClose, ...props }, ref) => {
        const icons = {
            default: <Info className="h-4 w-4" />,
            destructive: <XCircle className="h-4 w-4" />,
            success: <CheckCircle className="h-4 w-4" />,
            warning: <AlertCircle className="h-4 w-4" />,
            info: <Info className="h-4 w-4" />,
        };

        return (
            <div
                ref={ref}
                role="alert"
                className={cn(alertVariants({ variant }), className)}
                {...props}
            >
                {icons[variant || 'default']}
                {title && <h5 className="mb-1 font-semibold leading-none tracking-tight">{title}</h5>}
                <div className="text-sm [&_p]:leading-relaxed">{children}</div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                )}
            </div>
        );
    }
);
Alert.displayName = 'Alert';

export { Alert };
