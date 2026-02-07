/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-brand-primary)',
                    light: 'var(--color-brand-primary-light)',
                    dark: 'var(--color-brand-primary-dark)',
                    subtle: 'var(--color-brand-primary-subtle)',
                },
                neutral: {
                    50: 'var(--color-neutral-50)',
                    100: 'var(--color-neutral-100)',
                    200: 'var(--color-neutral-200)',
                    300: 'var(--color-neutral-300)',
                    400: 'var(--color-neutral-400)',
                    500: 'var(--color-neutral-500)',
                    600: 'var(--color-neutral-600)',
                    700: 'var(--color-neutral-700)',
                    800: 'var(--color-neutral-800)',
                    900: 'var(--color-neutral-900)',
                },
                surface: {
                    bg: 'var(--color-surface-bg)',
                    subtle: 'var(--color-surface-bg-subtle)',
                    1: 'var(--color-surface-1)',
                    2: 'var(--color-surface-2)',
                    3: 'var(--color-surface-3)',
                    elevated: 'var(--color-surface-elevated)',
                },
                border: {
                    default: 'var(--color-border-default)',
                    muted: 'var(--color-border-muted)',
                    strong: 'var(--color-border-strong)',
                    inverse: 'var(--color-border-inverse)',
                },
            },
            spacing: {
                'warm-lg': 'var(--spacing-32)',
                'warm-xl': 'var(--spacing-48)',
                'warm-2xl': 'var(--spacing-64)',
            },
            borderRadius: {
                'warm': 'var(--radius-warm)',
                'circle': 'var(--radius-circle)',
            },
            boxShadow: {
                'glow-cta': 'var(--shadow-glow-cta)',
                'ios': '0 10px 30px -10px rgba(0,0,0,0.3)',
            },
            fontFamily: {
                ui: 'var(--font-ui)',
                display: 'var(--font-display)',
                mono: 'var(--font-mono)',
            },
            animation: {
                'spring-in': 'spring-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
                'fade-in': 'fade-in 0.4s ease-out both',
            },
            keyframes: {
                'spring-in': {
                    '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
                    '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.glass-light': {
                    background: 'var(--glass-light-bg)',
                    backdropFilter: 'var(--glass-light-blur)',
                    WebkitBackdropFilter: 'var(--glass-light-blur)',
                    border: 'var(--glass-light-border)',
                },
                '.glass-heavy': {
                    background: 'var(--glass-heavy-bg)',
                    backdropFilter: 'var(--glass-heavy-blur)',
                    WebkitBackdropFilter: 'var(--glass-heavy-blur)',
                    border: 'var(--glass-heavy-border)',
                },
                '.focus-ring': {
                    outline: '2px solid var(--color-brand-primary)',
                    outlineOffset: '2px',
                },
                '.active-scale': {
                    transition: 'transform 0.1s ease-out',
                    '&:active': {
                        transform: 'scale(0.97)',
                    },
                },
            });
        },
    ],
}

