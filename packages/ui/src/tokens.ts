/**
 * @antigravity/ui Design Tokens
 *
 * Following the "Designing for Infinity" principle.
 * These tokens represent the "Vehicle of Intent".
 */

export const tokens = {
  colors: {
    // Reference Tokens (Raw)
    navy: {
      900: '#0F2940',
      800: '#1A334D',
      700: '#1E4A6D',
    },
    coral: {
      500: '#D45D4C',
      400: '#E8887B',
    },
    glass: {
      white: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
    },
  },

  // System Tokens (Semantic - "AI Vibe")
  semantic: {
    trust: 'var(--color-navy-900)',
    hope: 'var(--color-coral-500)',
    surface: 'var(--color-glass-white)',
    border: 'var(--color-glass-border)',
  },

  // Animation Intensities (Fluent inspiration)
  motion: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};
