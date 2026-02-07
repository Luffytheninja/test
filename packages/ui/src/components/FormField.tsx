import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface FormFieldProps {
    label?: string;
    description?: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
    required?: boolean;
}

function FormField({
    label,
    description,
    error,
    children,
    className,
    required,
}: FormFieldProps) {
    return (
        <div className={cn('space-y-2 w-full', className)}>
            {label && (
                <label className="block text-overline font-semibold text-navy/70 mb-1 pl-1">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {children}
            </div>

            <AnimatePresence mode="wait">
                {error ? (
                    <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-caption font-medium text-error pl-1 mt-1.5"
                    >
                        {error}
                    </motion.p>
                ) : description ? (
                    <p className="text-caption text-navy/40 pl-1 mt-1.5 leading-relaxed">
                        {description}
                    </p>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export { FormField };
