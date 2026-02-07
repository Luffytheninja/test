import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface FooterProps {
    logo?: React.ReactNode;
    sections?: Array<{
        title: string;
        links: Array<{ label: string; href: string }>;
    }>;
    legalItems?: Array<{ label: string; href: string }>;
    copyright?: string;
    className?: string;
}

function Footer({
    logo,
    sections = [],
    legalItems = [],
    copyright = `© ${new Date().getFullYear()} Antigravity. All rights reserved.`,
    className,
}: FooterProps) {
    return (
        <footer className={cn('bg-surface-bg border-t border-border-muted px-6 py-12 md:py-20', className)}>
            <div className="mx-auto max-w-container-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    <div className="col-span-2 lg:col-span-2">
                        {logo || <div className="text-2xl font-bold text-primary tracking-tighter mb-6">ANTIGRAVITY</div>}
                        <p className="text-navy/60 max-w-xs leading-relaxed">
                            Advancing human potential through intelligent, efficient, and beautifully designed technology.
                        </p>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-navy">{section.title}</h4>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-navy/60 hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-8 border-t border-border-muted flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-navy/40 font-medium">{copyright}</p>

                    <div className="flex items-center gap-6">
                        {legalItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-xs text-navy/40 hover:text-navy transition-colors font-medium"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { Footer };
