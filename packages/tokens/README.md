# @antigravity/tokens

**iOS + Airbnb Inspired Design Tokens**

A comprehensive design token library combining the precision of iOS with the warmth of Airbnb. Includes typography, colors (light/dark), spacing, shadows, motion, and internationalization support.

---

## Installation

```bash
pnpm add @antigravity/tokens
```

---

## Usage

### Import Tokens

```typescript
import { iosAirbnbTheme } from '@antigravity/tokens';
import '@antigravity/tokens/theme.css'; // CSS variables

// Access tokens
const primaryColor = iosAirbnbTheme.colors.brand.primary; // #FF5A5F
const spacing = iosAirbnbTheme.spacing[4]; // 16px
```

### Theme Utilities

```typescript
import {theme } from'@antigravity/tokens/utils';

// Initialize theme (auto-detects system preference)
theme.initialize();

// Toggle dark mode
theme.toggle(); // 'dark' | 'light'

// Apply custom brand color
theme.applyOverrides({
  colors: {
    brand: {
      primary: '#FF0000',
    },
  },
});
```

### Internationalization

```typescript
import { useI18nTokens, formatCurrency } from '@antigravity/tokens/i18n';

// Format currency (Nigeria-first)
formatCurrency(25000); // "₦25,000"
formatCurrency(250, { currency: 'USD' }); // "$250.00"

// RTL support (React)
const { direction, formatDate } = useI18nTokens('ar');
console.log(direction); // 'rtl'
console.log(formatDate(new Date())); // "٦ فبراير ٢٠٢٦"
```

---

## Design Principles

This token system embodies four core principles:

1. **Warm Tech** - Blend precision with humanity (iOS + Airbnb warmth)
2. **Clarity Over Cleverness** - Function first, delight second
3. **Progressive Disclosure** - Reveal complexity gradually
4. **Local-First** - Nigeria-first, world-aware

[Read full design principles →](../../docs/design-system/DESIGN_PRINCIPLES.md)

---

## Token Reference

### Typography

```typescript
// Font families
iosAirbnbTheme.typography.fonts.ui    // System font stack
iosAirbnbTheme.typography.fonts.display  // Display font
iosAirbnbTheme.typography.fonts.mono   // Monospace

// Type scale
iosAirbnbTheme.typography.scale.display1  // 36px/44px
iosAirbnbTheme.typography.scale.h1       // 32px/40px
iosAirbnbTheme.typography.scale.body     // 16px/24px
iosAirbnbTheme.typography.scale.caption  // 12px/18px
```

### Colors

```typescript
// Brand (Airbnb coral-inspired)
iosAirbnbTheme.colors.brand.primary        // #FF5A5F
iosAirbnbTheme.colors.brand.primaryLight   // #FF7276 (dark mode)

// Semantic
iosAirbnbTheme.colors.semantic.success     // #16A34A
iosAirbnbTheme.colors.semantic.error       // #EF4444

// Surfaces (auto-switch in dark mode via CSS vars)
iosAirbnbTheme.colors.surfaces.bg          // #FFFFFF (light) / #0B1220 (dark)
```

### Spacing

```typescript
iosAirbnbTheme.spacing[0.5]  // 2px
iosAirbnbTheme.spacing[4]    // 16px
iosAirbnbTheme.spacing[6]    // 24px
iosAirbnbTheme.spacing[12]   // 48px
```

### Shadows

```typescript
iosAirbnbTheme.shadows.sm        // Subtle elevation
iosAirbnbTheme.shadows.md        // Standard cards
iosAirbnbTheme.shadows.lg        // Modals
iosAirbnbTheme.shadows.glowCta   // Primary CTA glow
```

### Motion

```typescript
// Durations
iosAirbnbTheme.durations.fast    // 150ms
iosAirbnbTheme.durations.base    // 220ms (default)

// Framer Motion variants
iosAirbnbTheme.motionVariants.fadeUp    // Cards, toasts
iosAirbnbTheme.motionVariants.scale     // Dropdowns, tooltips
iosAirbnbTheme.motionVariants.sheet     // Bottom sheets

// Respects prefers-reduced-motion automatically
```

---

## CSS Variables

All tokens are available as CSS custom properties:

```css
/* Typography */
font-family: var(--font-ui);
font-weight: var(--font-weight-semibold);

/* Colors */
background: var(--color-surface-bg);
color: var(--color-brand-primary);

/* Spacing */
margin: var(--spacing-4);
padding: var(--spacing-6);

/* Shadows */
box-shadow: var(--shadow-md);

/* Transitions */
transition: var(--transition-base);
```

### Dark Mode

Toggle dark mode via `data-theme` attribute:

```html
<html data-theme="dark">
  <!-- All CSS vars automatically switch to dark values -->
</html>
```

Or use the utility:

```typescript
import { setThemeMode } from '@antigravity/tokens/utils';

setThemeMode('dark');  // Force dark mode
setThemeMode('light'); // Force light mode
setThemeMode('auto');  // Follow system preference
```

---

## Tailwind Integration

The token system integrates seamlessly with Tailwind CSS. The root `tailwind.config.ts` maps all tokens to Tailwind utilities:

```tsx
<div className="bg-surface-bg text-primary rounded-warm shadow-glow-cta">
  <h1 className="font-display text-h1 text-neutral-900">Hello</h1>
  <p className="text-body text-neutral-600 mt-4">world</p>
</div>
```

Custom utilities available:
- `.glass-light` - Frosted glass effect
- `.focus-ring` - Accessible focus indicator
- `.active-scale` - iOS-style press feedback

---

## Accessibility

All tokens follow WCAG AA standards:

- **Touch Targets**: Minimum 44×44px (Apple HIG)
- **Contrast**: All text passes WCAG AA on backgrounds
- **Focus Rings**: 3px offset for visibility
- **Reduced Motion**: Automatically respects user preference

```typescript
// Accessibility tokens
iosAirbnbTheme.a11y.minTouchTarget        // 44px
iosAirbnbTheme.a11y.focusRingWidth        // 3px
```

---

## Content Guidelines

When using these tokens, follow our content principles:

- **Voice**: Professional but approachable
- **Tone**: Adjust based on context (success = celebratory, error = helpful)
- **Terminology**: "Book" not "Reserve", "Sign In" not "Login"

[Read full content guidelines →](../../docs/design-system/CONTENT_GUIDELINES.md)

---

## Related Documentation

- [Design Principles](../../docs/design-system/DESIGN_PRINCIPLES.md) - Philosophy
- [Content Guidelines](../../docs/design-system/CONTENT_GUIDELINES.md) - Voice & tone
- [Governance](../../docs/design-system/GOVERNANCE.md) - How we maintain the system
- [UI Components](../ui/README.md) - Built with these tokens

---

## License

Private - Antigravity Ecosystem

---

## Changelog

### v1.0.0 (Feb 6, 2026)
- Initial release with iOS + Airbnb token system
- Full light/dark mode support
- i18n utilities (RTL, locale formatters)
- Tailwind integration
- Accessibility tokens (WCAG AA compliant)
