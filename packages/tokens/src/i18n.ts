/**
 * i18n-aware Design Tokens
 *
 * Provides locale-specific spacing and RTL support for global applications
 */

/**
 * RTL-aware spacing adjustments
 * In RTL languages (Arabic, Hebrew), certain spacing conventions differ
 */
export const rtlSpacing = {
    /**
     * Inline spacing (start/end) - automatically mirrors in RTL
     * Use these instead of left/right for directional spacing
     */
    inlineStart: {
        sm: 'var(--spacing-2)',  // 8px
        md: 'var(--spacing-4)',  // 16px
        lg: 'var(--spacing-6)',  // 24px
    },
    inlineEnd: {
        sm: 'var(--spacing-2)',
        md: 'var(--spacing-4)',
        lg: 'var(--spacing-6)',
    },

    /**
     * Block spacing (top/bottom) - same in all locales
     */
    block: {
        sm: 'var(--spacing-2)',
        md: 'var(--spacing-4)',
        lg: 'var(--spacing-6)',
    },
} as const;

/**
 * RTL detection utility
 */
export function isRTL(locale: string): boolean {
    const rtlLocales = ['ar', 'he', 'fa', 'ur']; // Arabic, Hebrew, Farsi, Urdu
    const language = locale.split('-')[0];
    return rtlLocales.includes(language);
}

/**
 * Locale-aware formatters
 */

export interface FormatOptions {
    locale?: string;
    currency?: string;
}

/**
 * Format currency based on locale
 */
export function formatCurrency(
    amount: number,
    options: FormatOptions = {}
): string {
    const { locale = 'en-NG', currency = 'NGN' } = options;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: currency === 'NGN' ? 0 : 2,
    }).format(amount);
}

/**
 * Format date based on locale
 */
export function formatDate(
    date: Date,
    options: { locale?: string; format?: 'short' | 'medium' | 'long' } = {}
): string {
    const { locale = 'en-NG', format = 'medium' } = options;

    let formatOptions: Intl.DateTimeFormatOptions;

    switch (format) {
        case 'short':
            formatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
            break;
        case 'long':
            formatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            break;
        case 'medium':
        default:
            formatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
            break;
    }

    return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}

/**
 * Format number based on locale
 */
export function formatNumber(
    value: number,
    options: { locale?: string; decimals?: number } = {}
): string {
    const { locale = 'en-NG', decimals = 0 } = options;

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

/**
 * Get CSS direction value based on locale
 */
export function getDirection(locale: string): 'ltr' | 'rtl' {
    return isRTL(locale) ? 'rtl' : 'ltr';
}

/**
 * React hook for i18n tokens (optional, for React projects)
 */
export function useI18nTokens(locale: string = 'en-NG') {
    const direction = getDirection(locale);
    const isRightToLeft = isRTL(locale);

    return {
        direction,
        isRTL: isRightToLeft,
        spacing: rtlSpacing,
        formatCurrency: (amount: number, currency?: string) =>
            formatCurrency(amount, { locale, currency }),
        formatDate: (date: Date, format?: 'short' | 'medium' | 'long') =>
            formatDate(date, { locale, format }),
        formatNumber: (value: number, decimals?: number) =>
            formatNumber(value, { locale, decimals }),
    };
}
