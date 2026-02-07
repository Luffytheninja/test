# @antigravity/ui

A world-class UI component library for the Antigravity ecosystem, built with React, Tailwind CSS, and Framer Motion.

## Design Philosophy

This library follows the **Antigravity Design System** principles:
- **Warm Tech**: Precision blended with humanity. Soft corners (`rounded-warm`), spring animations, and intentional micro-interactions.
- **Clarity Over Cleverness**: Functionality first. Every component is designed to be obvious and trust-inducing.
- **Progressive Disclosure**: Hierarchical information architecture through Atoms, Molecules, and Organisms.

## Component Architecture

The library is organized following Atomic Design principles:

### Atoms (The Basics)
- **Button**: Highly semantic actions with spring-based motion.
- **Input**: Accessible data entry with focus ring animations.
- **Card**: Warm, rounded surfaces for content grouping.
- **Badge**: Tiny labels for status and categorization.
- **Avatar**: User identity representation with fallbacks.
- **Divider**: Subtle hierarchy separators.
- **Skeleton**: Smooth loading placeholders.

### Molecules (Composed UI)
- **FormField**: Labels, inputs, and error states in one package.
- **Alert**: Inline feedback with semantic iconography.
- **Modal**: Accessible dialogs with glassmorphism overlays (Radix-powered).
- **Toast**: Contextual notifications (Radix-powered).

### Organisms (Layout & Patterns)
- **Navbar**: Responsive global navigation with mobile sidebar.
- **Footer**: High-IA structural footer for branding and links.
- **DataTable**: Powerful, sortable, and searchable data views (TanStack-powered).

## Usage

### Installation

```bash
pnpm add @antigravity/ui @antigravity/tokens
```

### Basic Example

```tsx
import { Button, Card, FormField, Input } from '@antigravity/ui';

export default function LoginForm() {
  return (
    <Card radius="warm" padding="lg">
      <FormField label="Email" description="Use your professional email">
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <Button className="mt-6" fullWidth>
        Sign In
      </Button>
    </Card>
  );
}
```

## Theme Support

All components use CSS variables from `@antigravity/tokens`. To change the theme, apply the `data-theme="dark"` attribute to any parent element.

```tsx
<div data-theme="dark">
  <Button>Dark Mode Action</Button>
</div>
```

## Accessibility

- **Radix UI Primitives**: Used for complex interactions (Modals, Toasts) to ensure ARIA compliance.
- **Touch Targets**: Standardized to minimum 44px (iOS HIG).
- **Focus Rings**: High-contrast rings for keyboard navigation.
- **Reduced Motion**: All animations respect system preferences via Framer Motion.
