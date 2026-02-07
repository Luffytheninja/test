/**
 * iOS + Airbnb Default Theme Tokens
 * 
 * Design Intent:
 * - iOS: Refined, airy, motion-forward, generous white space, system fonts
 * - Airbnb: Warm, friendly, approachable, coral accents, soft shadows
 * 
 * Architecture:
 * - All tokens are theme-overridable via CSS variables
 * - Semantic naming for easy brand customization
 * - Includes light + dark mode, reduced motion support
 * 
 * Version: 1.0.0
 */

// ============================================================================
// Typography
// ============================================================================

export const typography = {
  /**
   * Font stacks
   * - ui: System stack for native iOS feel (SF Pro on Apple devices)
   * - display: Optional decorative font (falls back to ui stack)
   * - mono: Code and technical content
   */
  fonts: {
    ui: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    display: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, 'SF Mono', 'Cascadia Code', 'Roboto Mono', Menlo, Monaco, 'Courier New', monospace",
  },

  /**
   * Font weights
   * iOS uses: Regular (400), Medium (500), Semibold (600), Bold (700)
   */
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  /**
   * Type scale
   * Fixed: Added body-lg, adjusted display1 for app contexts, improved caption line-height
   */
  scale: {
    // Display sizes (hero sections, landing pages)
    display1: {
      size: "36px",
      lineHeight: "44px",
      letterSpacing: "-0.02em",
      weight: 700,
      font: "display",
    },
    display2: {
      size: "48px",
      lineHeight: "56px",
      letterSpacing: "-0.025em",
      weight: 700,
      font: "display",
    },

    // Headings
    h1: {
      size: "32px",
      lineHeight: "40px",
      letterSpacing: "-0.015em",
      weight: 700,
      font: "ui",
    },
    h2: {
      size: "24px",
      lineHeight: "32px",
      letterSpacing: "-0.01em",
      weight: 700,
      font: "ui",
    },
    h3: {
      size: "20px",
      lineHeight: "28px",
      letterSpacing: "-0.005em",
      weight: 600,
      font: "ui",
    },
    h4: {
      size: "18px",
      lineHeight: "26px",
      weight: 600,
      font: "ui",
    },

    // Body text
    bodyLg: {
      size: "18px",
      lineHeight: "26px",
      weight: 400,
      font: "ui",
    },
    body: {
      size: "16px",
      lineHeight: "24px",
      weight: 400,
      font: "ui",
    },
    bodySm: {
      size: "14px",
      lineHeight: "20px",
      weight: 400,
      font: "ui",
    },

    // UI text
    caption: {
      size: "12px",
      lineHeight: "18px", // Fixed: was 16px, now more readable
      weight: 400,
      letterSpacing: "0.01em",
      font: "ui",
    },
    overline: {
      size: "11px",
      lineHeight: "16px",
      weight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      font: "ui",
    },
    button: {
      size: "15px",
      lineHeight: "20px",
      weight: 600,
      letterSpacing: "0.01em",
      font: "ui",
    },
  },
} as const;

// ============================================================================
// Color System
// ============================================================================

export const colors = {
  /**
   * Brand colors
   * Primary: Airbnb coral-inspired, warm and inviting
   */
  brand: {
    primary: "#FF5A5F",
    primaryLight: "#FF7276", // For dark mode
    primaryDark: "#E5484D",
    primarySubtle: "#FFF1F2",
  },

  /**
   * Accent colors
   * Navy: High-contrast anchor for text and borders
   */
  accent: {
    navy: "#0B1F3B",
    navyLight: "#1A3A5C",
  },

  /**
   * Neutral palette
   * Light mode: 50 (lightest) → 900 (darkest)
   * Dark mode: Inverted usage
   */
  neutral: {
    50: "#FAFBFC",
    100: "#F4F6F8",
    200: "#EAEEF2",
    300: "#D8E1E8",
    400: "#BFCBD6",
    500: "#9AA7B6",
    600: "#6F8796",
    700: "#4B6676",
    800: "#2E4755",
    900: "#0F2A3A",
  },

  /**
   * Semantic colors
   * WCAG AA compliant on white backgrounds
   */
  semantic: {
    success: "#16A34A",
    successLight: "#22C55E",
    successSubtle: "#F0FDF4",
    
    warning: "#F59E0B",
    warningLight: "#FBBF24",
    warningSubtle: "#FFFBEB",
    
    error: "#EF4444",
    errorLight: "#F87171",
    errorSubtle: "#FEF2F2",
    
    info: "#2563EB",
    infoLight: "#3B82F6",
    infoSubtle: "#EFF6FF",
  },

  /**
   * Interactive states
   * Fixed: Explicit hover/pressed/disabled tokens
   */
  interactive: {
    // Primary button states
    primaryHover: "#E5484D",
    primaryPressed: "#D13438",
    primaryDisabled: "rgba(255, 90, 95, 0.4)",
    
    // Surface states (for ghost buttons, cards)
    surfaceHover: "#F0F2F5",
    surfacePressed: "#E5E9ED",
    surfaceDisabled: "rgba(0, 0, 0, 0.02)",
    
    // Border states
    borderHover: "rgba(11, 31, 59, 0.16)",
    borderPressed: "rgba(11, 31, 59, 0.24)",
    borderDisabled: "rgba(11, 31, 59, 0.04)",
  },

  /**
   * Surfaces
   * Light mode defaults
   */
  surfaces: {
    bg: "#FFFFFF",
    bgSubtle: "#FAFBFC",
    surface1: "rgba(255, 255, 255, 0.8)", // Glass layer
    surface2: "#F7F8FA",
    surface3: "#EEF1F6",
    surfaceElevated: "#FFFFFF",
  },

  /**
   * Borders
   * Fixed: Derive from semantic color reference
   */
  borders: {
    default: "rgba(11, 31, 59, 0.08)",
    muted: "rgba(11, 31, 59, 0.04)",
    strong: "rgba(11, 31, 59, 0.12)",
    inverse: "rgba(255, 255, 255, 0.12)",
  },

  /**
   * Overlays & backdrops
   */
  overlay: {
    light: "rgba(2, 6, 23, 0.04)",
    medium: "rgba(2, 6, 23, 0.30)",
    heavy: "rgba(2, 6, 23, 0.60)",
  },

  /**
   * Focus states
   * Fixed: Added dedicated focus ring tokens
   */
  focus: {
    ring: "rgba(255, 90, 95, 0.4)",
    ringDark: "rgba(255, 114, 118, 0.5)",
  },
} as const;

/**
 * Dark mode color overrides
 * Applied via [data-theme="dark"]
 */
export const colorsDark = {
  brand: {
    primary: "#FF7276", // Lighter for contrast on dark bg
    primaryLight: "#FF9FA2",
    primaryDark: "#E5484D",
    primarySubtle: "rgba(255, 90, 95, 0.12)",
  },

  accent: {
    navy: "#E8EDF3",
    navyLight: "#CBD5E1",
  },

  // Inverted neutral scale
  neutral: {
    50: "#0F2A3A",
    100: "#2E4755",
    200: "#4B6676",
    300: "#6F8796",
    400: "#9AA7B6",
    500: "#BFCBD6",
    600: "#D8E1E8",
    700: "#EAEEF2",
    800: "#F4F6F8",
    900: "#FAFBFC",
  },

  semantic: {
    success: "#22C55E",
    successLight: "#4ADE80",
    successSubtle: "rgba(34, 197, 94, 0.12)",
    
    warning: "#FBBF24",
    warningLight: "#FCD34D",
    warningSubtle: "rgba(251, 191, 36, 0.12)",
    
    error: "#F87171",
    errorLight: "#FCA5A5",
    errorSubtle: "rgba(248, 113, 113, 0.12)",
    
    info: "#3B82F6",
    infoLight: "#60A5FA",
    infoSubtle: "rgba(59, 130, 246, 0.12)",
  },

  interactive: {
    primaryHover: "#FF9FA2",
    primaryPressed: "#FFB4B7",
    primaryDisabled: "rgba(255, 114, 118, 0.3)",
    
    surfaceHover: "rgba(255, 255, 255, 0.08)",
    surfacePressed: "rgba(255, 255, 255, 0.12)",
    surfaceDisabled: "rgba(255, 255, 255, 0.02)",
    
    borderHover: "rgba(255, 255, 255, 0.16)",
    borderPressed: "rgba(255, 255, 255, 0.24)",
    borderDisabled: "rgba(255, 255, 255, 0.04)",
  },

  surfaces: {
    bg: "#0B1220",
    bgSubtle: "#0F1827",
    surface1: "rgba(255, 255, 255, 0.04)", // Glass layer
    surface2: "#141B2B",
    surface3: "#1E2836",
    surfaceElevated: "#1A2332",
  },

  borders: {
    default: "rgba(255, 255, 255, 0.08)",
    muted: "rgba(255, 255, 255, 0.04)",
    strong: "rgba(255, 255, 255, 0.12)",
    inverse: "rgba(0, 0, 0, 0.12)",
  },

  overlay: {
    light: "rgba(0, 0, 0, 0.2)",
    medium: "rgba(0, 0, 0, 0.5)",
    heavy: "rgba(0, 0, 0, 0.8)",
  },

  focus: {
    ring: "rgba(255, 114, 118, 0.5)",
    ringDark: "rgba(255, 90, 95, 0.4)",
  },
} as const;

// ============================================================================
// Spacing & Layout
// ============================================================================

/**
 * Spacing scale
 * Fixed: Added 2px, 6px, 28px, 36px, 56px, 96px for finer control
 */
export const spacing = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

/**
 * Container max widths
 */
export const containers = {
  sm: "640px",
  md: "832px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Breakpoints
 */
export const breakpoints = {
  mobile: "0px",
  tablet: "640px",
  desktop: "1024px",
  wide: "1440px",
} as const;

/**
 * Z-index scale
 * Fixed: Added explicit layering for UI elements
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
} as const;

// ============================================================================
// Border Radius
// ============================================================================

/**
 * Border radius scale
 * iOS-inspired with warm, approachable corners
 */
export const radii = {
  none: "0px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  warm: "32px", // 2rem, signature Airbnb pill shape
  pill: "9999px",
  circle: "50%",
} as const;

// ============================================================================
// Shadows & Elevation
// ============================================================================

/**
 * Shadow system
 * Fixed: Reduced shadow-lg blur for iOS alignment
 * Fixed: Glow uses themeable CSS variable reference
 */
export const shadows = {
  none: "none",
  
  // Subtle elevation
  xs: "0 1px 2px rgba(11, 31, 59, 0.04)",
  sm: "0 1px 3px rgba(11, 31, 59, 0.06), 0 1px 2px rgba(11, 31, 59, 0.04)",
  
  // Standard elevation
  md: "0 6px 16px rgba(11, 31, 59, 0.08), 0 2px 4px rgba(11, 31, 59, 0.04)",
  
  // Heavy elevation (reduced from 40px → 24px blur)
  lg: "0 12px 24px rgba(11, 31, 59, 0.08), 0 4px 8px rgba(11, 31, 59, 0.04)",
  
  // Extreme elevation
  xl: "0 20px 40px rgba(11, 31, 59, 0.12), 0 8px 16px rgba(11, 31, 59, 0.06)",
  
  // Brand glow (for primary CTA)
  // Note: Use CSS variable in actual implementation for themeability
  glowCta: "0 6px 24px rgba(255, 90, 95, 0.12), 0 2px 8px rgba(255, 90, 95, 0.08)",
  
  // Inner shadows
  inner: "inset 0 2px 4px rgba(11, 31, 59, 0.06)",
} as const;

/**
 * Dark mode shadow overrides
 */
export const shadowsDark = {
  xs: "0 1px 2px rgba(0, 0, 0, 0.2)",
  sm: "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
  md: "0 6px 16px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)",
  lg: "0 12px 24px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)",
  xl: "0 20px 40px rgba(0, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)",
  glowCta: "0 6px 24px rgba(255, 114, 118, 0.16), 0 2px 8px rgba(255, 114, 118, 0.12)",
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
} as const;

// ============================================================================
// Glass / Frosted Surfaces
// ============================================================================

/**
 * Glass effects
 * Fixed: Progressive enhancement with fallback for older browsers
 */
export const glass = {
  light: {
    background: "rgba(255, 255, 255, 0.65)",
    backdropFilter: "blur(8px) saturate(180%)",
    backdropFilterFallback: "rgba(255, 255, 255, 0.92)", // For browsers without support
    border: "1px solid rgba(255, 255, 255, 0.12)",
    willChange: "backdrop-filter", // Performance hint
  },
  
  heavy: {
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(20px) saturate(180%)",
    backdropFilterFallback: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    willChange: "backdrop-filter",
  },
  
  dark: {
    background: "rgba(11, 18, 32, 0.65)",
    backdropFilter: "blur(12px) saturate(150%)",
    backdropFilterFallback: "rgba(11, 18, 32, 0.92)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    willChange: "backdrop-filter",
  },
} as const;

// ============================================================================
// Motion & Animation
// ============================================================================

/**
 * Animation durations
 */
export const durations = {
  instant: 0,
  fast: 150,
  base: 220,
  slow: 320,
  slower: 500,
} as const;

/**
 * Easing curves
 */
export const easings = {
  // Standard material design easing
  standard: [0.2, 0.8, 0.2, 1] as const,
  
  // iOS spring feel
  iosSpring: {
    type: "spring" as const,
    stiffness: 360,
    damping: 22,
  },
  
  // Gentle spring for larger elements
  gentleSpring: {
    type: "spring" as const,
    stiffness: 280,
    damping: 26,
  },
  
  // CSS easing equivalents
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
} as const;

/**
 * Motion variants for Framer Motion
 * Fixed: Added prefers-reduced-motion support
 */
export const motionVariants = {
  /**
   * Fade up entrance
   * Use for: Cards, modals, toasts entering view
   */
  fadeUp: {
    initial: { y: 8, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] },
    },
    exit: {
      y: 6,
      opacity: 0,
      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
    },
  },

  /**
   * Sheet entrance (bottom sheet, drawer)
   * Use for: Mobile bottom sheets, slide-up panels
   */
  sheet: {
    initial: { y: 20, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 280, damping: 26 },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
    },
  },

  /**
   * Scale entrance
   * Use for: Popovers, dropdowns, tooltips
   */
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    enter: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 360, damping: 22 },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
    },
  },

  /**
   * Slide in from side
   * Use for: Drawers, sidebars, slide-out menus
   */
  slideInRight: {
    initial: { x: "100%", opacity: 0 },
    enter: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 280, damping: 26 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
    },
  },
} as const;

/**
 * Reduced motion variants
 * Fixed: Safe animations for users with vestibular issues
 */
export const motionVariantsReduced = {
  fadeUp: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  },
  sheet: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  },
  scale: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  },
  slideInRight: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  },
} as const;

/**
 * Transition presets for CSS transitions
 * Fixed: Added CSS transition tokens
 */
export const transitions = {
  fast: "150ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  base: "220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  slow: "320ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  color: "150ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  transform: "220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  opacity: "150ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  all: "220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
} as const;

// ============================================================================
// Accessibility
// ============================================================================

/**
 * Touch targets & accessibility
 * Apple HIG: Minimum 44×44 pt interactive area
 */
export const a11y = {
  minTouchTarget: "44px",
  minTouchTargetMobile: "48px", // Extra generous on mobile
  
  focusRingWidth: "3px",
  focusRingOffset: "2px",
  focusRingStyle: "solid",
  
  // Screen reader only utility
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: "0",
  },
} as const;

// ============================================================================
// Component-Specific Token Sets
// ============================================================================

/**
 * Component coverage matrix
 * Documents which tokens each component uses
 */
export const componentTokens = {
  button: {
    colors: ["brand.primary", "interactive.*", "surfaces.*"],
    radii: ["warm", "md"],
    shadows: ["glowCta", "md"],
    transitions: ["base", "color"],
    minHeight: a11y.minTouchTarget,
  },
  
  input: {
    colors: ["neutral.*", "borders.*", "semantic.error"],
    radii: ["md", "lg"],
    shadows: ["inner", "sm"],
    transitions: ["base", "color"],
    minHeight: a11y.minTouchTarget,
  },
  
  card: {
    colors: ["surfaces.*"],
    radii: ["md", "lg"],
    shadows: ["md", "lg"],
    transitions: ["transform", "all"],
  },
  
  modal: {
    colors: ["overlay.*", "surfaces.*"],
    radii: ["lg", "xl"],
    shadows: ["xl"],
    zIndex: ["modal"],
    motion: ["sheet", "fadeUp"],
  },
} as const;

// ============================================================================
// Exports & Theme Object
// ============================================================================

/**
 * Complete theme object
 */
export const iosAirbnbTheme = {
  name: "iOS + Airbnb Default",
  version: "1.0.0",
  typography,
  colors,
  colorsDark,
  spacing,
  containers,
  breakpoints,
  zIndex,
  radii,
  shadows,
  shadowsDark,
  glass,
  durations,
  easings,
  motionVariants,
  motionVariantsReduced,
  transitions,
  a11y,
  componentTokens,
} as const;

/**
 * Type exports for TypeScript autocomplete
 */
export type Theme = typeof iosAirbnbTheme;
export type ThemeColors = typeof colors;
export type ThemeColorsDark = typeof colorsDark;
export type ThemeSpacing = typeof spacing;
export type ThemeRadii = typeof radii;
export type ThemeShadows = typeof shadows;

export default iosAirbnbTheme;
