import * as React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Bell } from 'lucide-react';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface NavbarProps {
    logo?: React.ReactNode;
    user?: {
        name: string;
        email: string;
        avatar?: string;
    };
    notifications?: number;
    navItems?: Array<{ label: string; href: string }>;
    onLogout?: () => void;
    className?: string;
}

function Navbar({
    logo,
    user,
    notifications = 0,
    navItems = [],
    onLogout,
    className,
}: NavbarProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav
            className={cn(
                'sticky top-0 z-sticky w-full border-b border-border-muted bg-surface-bg/80 backdrop-blur-md px-6 py-3',
                className
            )}
        >
            <div className="mx-auto flex max-w-container-xl items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex-shrink-0 cursor-pointer">
                        {logo || <div className="text-2xl font-bold text-primary tracking-tighter">ANTIGRAVITY</div>}
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-navy/70 hover:text-primary transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            {notifications > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                                >
                                    {notifications}
                                </Badge>
                            )}
                        </Button>

                        {user ? (
                            <div className="flex items-center gap-3 pl-4 border-l border-border-muted ml-2">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-navy">{user.name}</span>
                                    <span className="text-xs text-navy/40">{user.email}</span>
                                </div>
                                <Avatar src={user.avatar} alt={user.name} />
                            </div>
                        ) : (
                            <Button size="sm">Sign In</Button>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-border-muted mt-3"
            >
                <div className="flex flex-col gap-4 py-6">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-lg font-semibold text-navy hover:text-primary transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="pt-4 border-t border-border-muted flex flex-col gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Avatar src={user.avatar} alt={user.name} size="lg" />
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-navy">{user.name}</span>
                                    <span className="text-sm text-navy/40">{user.email}</span>
                                </div>
                            </div>
                        ) : (
                            <Button fullWidth>Sign In</Button>
                        )}
                        <Button variant="outline" fullWidth onClick={onLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </motion.div>
        </nav>
    );
}

export { Navbar };
