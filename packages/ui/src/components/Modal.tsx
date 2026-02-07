import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Modal = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;

const ModalOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        asChild
        className={cn(
            'fixed inset-0 z-overlay bg-black/40 backdrop-blur-sm transition-all duration-300',
            className
        )}
        {...props}
    >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        />
    </DialogPrimitive.Overlay>
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const ModalContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <ModalPortal>
        <ModalOverlay />
        <DialogPrimitive.Content
            ref={ref}
            asChild
            className={cn(
                'fixed left-[50%] top-[50%] z-modal w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-default bg-surface-bg p-6 shadow-xl transition-all duration-300 rounded-warm',
                className
            )}
            {...props}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
                style={{ left: '50%', top: '50%' }}
            >
                {children}
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            </motion.div>
        </DialogPrimitive.Content>
    </ModalPortal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col space-y-1.5 text-center sm:text-left',
            className
        )}
        {...props}
    />
);
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            className
        )}
        {...props}
    />
);
ModalFooter.displayName = 'ModalFooter';

const ModalTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            'text-lg font-semibold leading-none tracking-tight text-navy',
            className
        )}
        {...props}
    />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn('text-sm text-neutral-500', className)}
        {...props}
    />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Modal,
    ModalPortal,
    ModalOverlay,
    ModalTrigger,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalTitle,
    ModalDescription,
};
