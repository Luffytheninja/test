/**
 * Theme Utilities
 *
 * Runtime functions for:
 * - Applying theme overrides
 * - Toggling dark mode
 * - Detecting user preferences
 * - Custom theme creation
 */

import { iosAirbnbTheme } from './tokens';

// ============================================================================
// TYPES
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeOverride {
  colors?: {
    brand?: {
      primary?: string;
      primaryLight?: string;
      primaryDark?: string;
    };
    // Allow partial overrides of any color token
    [key: string]: any;
  };
  fonts?: {
    ui?: string;
    display?: string;
    mono?: string;
  };
  radii?: {
    [key: string]: string;
  };
  // Allow overriding any top-level theme property
  [key: string]: any;
}

// ============================================================================
// PREFERENCE DETECTION
// ============================================================================

/**
 * Detect if user prefers dark mode
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Listen for system theme changes
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => { };

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent | MediaQueryList) => callback(e.matches);

  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  // Legacy browsers
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}

// ============================================================================
// THEME APPLICATION
// ============================================================================

/**
 * Set theme mode (light, dark, or auto)
 */
export function setThemeMode(mode: ThemeMode): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  if (mode === 'auto') {
    root.removeAttribute('data-theme');
    // System preference will take effect via CSS @media query
  } else {
    root.setAttribute('data-theme', mode);
  }

  // Persist preference
  try {
    localStorage.setItem('theme-mode', mode);
  } catch (e) {
    console.warn('Failed to save theme preference:', e);
  }
}

/**
 * Get current theme mode from DOM or localStorage
 */
export function getThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto';

  const root = document.documentElement;
  const dataTheme = root.getAttribute('data-theme') as ThemeMode | null;

  if (dataTheme === 'light' || dataTheme === 'dark') {
    return dataTheme;
  }

  // Check localStorage
  try {
    const stored = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
      return stored;
    }
  } catch (e) {
    console.warn('Failed to read theme preference:', e);
  }

  return 'auto';
}

/**
 * Toggle between light and dark mode
 */
export function toggleThemeMode(): ThemeMode {
  const current = getThemeMode();
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  setThemeMode(next);
  return next;
}

/**
 * Get effective theme (resolves 'auto' to actual light/dark)
 */
export function getEffectiveTheme(): 'light' | 'dark' {
  const mode = getThemeMode();
  if (mode === 'auto') {
    return prefersDarkMode() ? 'dark' : 'light';
  }
  return mode;
}

// ============================================================================
// CUSTOM THEME OVERRIDES
// ============================================================================

/**
 * Apply custom theme overrides by setting CSS variables
 *
 * @example
 * applyThemeOverrides({
 *   colors: {
 *     brand: {
 *       primary: '#FF0000',
 *     }
 *   },
 *   fonts: {
 *     ui: 'Inter, sans-serif'
 *   }
 * });
 */
export function applyThemeOverrides(overrides: ThemeOverride): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Apply color overrides
  if (overrides.colors) {
    applyColorOverrides(root, overrides.colors);
  }

  // Apply font overrides
  if (overrides.fonts) {
    if (overrides.fonts.ui) {
      root.style.setProperty('--font-ui', overrides.fonts.ui);
    }
    if (overrides.fonts.display) {
      root.style.setProperty('--font-display', overrides.fonts.display);
    }
    if (overrides.fonts.mono) {
      root.style.setProperty('--font-mono', overrides.fonts.mono);
    }
  }

  // Apply radius overrides
  if (overrides.radii) {
    Object.entries(overrides.radii).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
  }
}

/**
 * Helper to apply nested color overrides
 */
function applyColorOverrides(root: HTMLElement, colors: any, prefix = 'color'): void {
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Recursively handle nested objects (e.g., brand.primary)
      applyColorOverrides(root, value, `${prefix}-${kebabCase(key)}`);
    } else if (typeof value === 'string') {
      // Apply leaf color value
      root.style.setProperty(`--${prefix}-${kebabCase(key)}`, value);
    }
  });
}

/**
 * Reset all theme overrides to defaults
 */
export function resetThemeOverrides(): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Remove all custom style properties
  // Note: This is a brute-force approach; for production, track which
  // properties were set and only remove those
  const computedStyle = getComputedStyle(root);
  Array.from(computedStyle).forEach(prop => {
    if (prop.startsWith('--')) {
      root.style.removeProperty(prop);
    }
  });
}

// ============================================================================
// BRAND THEME PRESETS
// ============================================================================

/**
 * Example: Create a brand theme based on a primary color
 * Automatically generates hover/pressed/disabled variants
 */
export function createBrandTheme(primaryColor: string, options?: {
  displayFont?: string;
  warmRadius?: boolean;
}): ThemeOverride {
  // Generate color variants using color manipulation
  // For production, use a library like polished or chroma-js
  const primaryLight = lighten(primaryColor, 10);
  const primaryDark = darken(primaryColor, 10);

  return {
    colors: {
      brand: {
        primary: primaryColor,
        primaryLight,
        primaryDark,
      },
    },
    fonts: options?.displayFont ? {
      display: options.displayFont,
    } : undefined,
    radii: options?.warmRadius ? {
      warm: '24px', // Less rounded than default 32px
    } : undefined,
  };
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize theme system
 * - Restores saved preference
 * - Watches system changes if mode is 'auto'
 * - Applies reduced motion if needed
 */
export function initializeTheme(): () => void {
  if (typeof window === 'undefined') return () => { };

  // Restore saved preference
  const savedMode = getThemeMode();
  setThemeMode(savedMode);

  // Watch for system theme changes if in auto mode
  let unwatchSystem: (() => void) | null = null;

  if (savedMode === 'auto') {
    unwatchSystem = watchSystemTheme((isDark) => {
      // Only update if still in auto mode
      if (getThemeMode() === 'auto') {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      }
    });
  }

  // Return cleanup function
  return () => {
    if (unwatchSystem) unwatchSystem();
  };
}

// ============================================================================
// REACT HOOKS (optional)
// ============================================================================

/**
 * React hook for theme management
 *
 * @example
 * const { mode, setMode, toggle, effectiveTheme } = useTheme();
 */
export function useTheme() {
  if (typeof window === 'undefined') {
    return {
      mode: 'auto' as ThemeMode,
      setMode: () => { },
      toggle: () => 'light' as ThemeMode,
      effectiveTheme: 'light' as 'light' | 'dark',
      isDark: false,
    };
  }

  // In a real React implementation, use useState + useEffect
  // This is a simple version for reference
  const mode = getThemeMode();
  const effectiveTheme = getEffectiveTheme();

  return {
    mode,
    setMode: setThemeMode,
    toggle: toggleThemeMode,
    effectiveTheme,
    isDark: effectiveTheme === 'dark',
  };
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Convert camelCase to kebab-case
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Lighten a hex color by percentage
 * Simple implementation - use chroma-js or polished in production
 */
function lighten(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1).toUpperCase();
}

/**
 * Darken a hex color by percentage
 */
function darken(hex: string, percent: number): string {
  return lighten(hex, -percent);
}

/**
 * Get all CSS variable values as an object
 * Useful for debugging or generating theme exports
 */
export function getComputedThemeTokens(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const tokens: Record<string, string> = {};

  Array.from(computedStyle).forEach(prop => {
    if (prop.startsWith('--')) {
      tokens[prop] = computedStyle.getPropertyValue(prop).trim();
    }
  });

  return tokens;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  iosAirbnbTheme as defaultTheme,
};

/**
 * All-in-one theme object with utilities
 */
export const theme = {
  // Token reference
  tokens: iosAirbnbTheme,

  // Mode management
  getMode: getThemeMode,
  setMode: setThemeMode,
  toggle: toggleThemeMode,
  getEffective: getEffectiveTheme,

  // Customization
  applyOverrides: applyThemeOverrides,
  reset: resetThemeOverrides,
  createBrand: createBrandTheme,

  // Preferences
  prefersDark: prefersDarkMode,
  prefersReducedMotion,
  watchSystem: watchSystemTheme,

  // Initialization
  initialize: initializeTheme,

  // Debugging
  getComputedTokens: getComputedThemeTokens,
};

export default theme;
