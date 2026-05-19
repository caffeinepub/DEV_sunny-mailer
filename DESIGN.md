# Design Brief

## Overview
Sunny yellow mail form. Warm, minimal, optimistic. Single centered card. Focused interaction: address, title, content, send. Yellow accent sparingly on button and focus states for maximum impact. Cream background, white card, deep charcoal text.

## Tone & Differentiation
Optimistic minimalism. Yellow is the only accent — used sparingly for the submit button and focus rings to signal primary action. Every other element supports clarity: generous spacing, readable typography, soft shadows. Feels like a digital postcard app, not a generic form.

## Color Palette

| Token | Light Value | Purpose |
|-------|-------------|---------|
| background | L 0.98 C 0.01 H 88 | Warm cream, off-white |
| foreground | L 0.2 C 0 H 0 | Deep charcoal text |
| card | L 1.0 C 0 H 0 | Pure white elevated surface |
| accent (yellow) | L 0.82 C 0.15 H 88 | Sunny yellow — button, focus, active states |
| border | L 0.94 C 0.01 H 88 | Subtle grey structure |
| muted | L 0.92 C 0.01 H 88 | Soft grey for secondary elements |

## Typography
- **Display**: Figtree (geometric, friendly, distinctive)
- **Body**: DM Sans (clean, readable, neutral)
- **Mono**: Geist Mono (technical context, code)
- **Scale**: 14px body, 16px form labels, 18px button, 24px headings

## Elevation & Depth
- **Card**: `shadow-card` (0 4px 12px, subtle depth)
- **Elevated** (hover): `shadow-elevated` (0 10px 25px, increased lift)
- No skeuomorphism; depth via shadow and layering only.

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Hero form card | card (white) | border (light grey) | Centered, max-width 500px, shadow-card, 2rem padding |
| Input fields | input (off-white) | border (light grey) | Rounded-lg, 0.5rem padding, focus ring accent |
| Submit button | accent (yellow) | none | Rounded-lg, full width on mobile, px-6 py-3, hover:opacity-90 |

## Spacing & Rhythm
- Form container: 2rem padding inside card
- Form fields: 1.5rem gap vertical, 1rem padding inside each input
- Button: 1.5rem margin-top from last field, py-3, full width on mobile
- Page margins: 2rem on mobile, centered on desktop

## Component Patterns
1. **Form Group**: Label + Input stacked. Label: `form-label` (12px medium, charcoal). Input: `form-input` (14px, borders, focus rings).
2. **Button**: `.btn-yellow` — accent background, white text, px-6 py-3, hover:opacity-90, active:scale-95.
3. **Feedback**: Success message green (semantic), error message red. Positioned below button or as inline validation.

## Motion
- **Transitions**: All interactive elements use `transition-smooth` (0.3s cubic-bezier).
- **Button hover**: opacity-90 fade
- **Button active**: scale-95 press effect
- **Focus rings**: 2px solid accent color with 2px offset
- **No decorative animations**; motion serves clarity only.

## Constraints
- **No dark mode** — light theme optimized for warmth and approachability.
- **Responsive**: Mobile-first, full-width form on small screens, constrained to 500px max-width on desktop.
- **Accessibility**: WCAG AA contrast (4.5:1 text, 3:1 UI), visible focus indicators, semantic HTML labels.
- **Naming convention**: Avoid generic color names. Use semantic tokens (accent, foreground, muted).

## Signature Detail
The sunny yellow accent button is the sole point of visual interest — everything else recedes. When hovered or focused, the button fades subtly or scales down slightly, never bouncing or morphing. The focus ring matches the button color, creating a cohesive accent accent system. This restraint makes the yellow feel intentional and premium, not loud.
