# Tawf Islamic Foundation - Design Guidelines

## Overview
The Tawf Islamic Foundation website embodies ethical Web3 finance through a sophisticated, trust-building design system that balances traditional Islamic aesthetics with modern digital interfaces.

---

## Color Palette

### Primary Colors
- **Tawf Green** (`#0F3D30`) - Primary brand color, represents trust and Islamic heritage
- **Tawf Green Light** (`#1A5242`) - Hover states and secondary elements
- **Tawf Gold** (`#C5A869`) - Accent color, represents value and authenticity
- **Tawf Sand** (`#F9F6F0`) - Background color, warm and inviting
- **Tawf Ink** (`#1A1A1A`) - Primary text color
- **Tawf Muted** (`#6B7280`) - Secondary text color

### Usage Guidelines
- **Green**: Use for primary CTAs, headings, navigation, and trust elements
- **Gold**: Use for accents, highlights, decorative elements, and emphasis
- **Sand**: Primary background color for warmth and readability
- **Ink**: Body text and dark UI elements
- **White**: Cards, elevated surfaces, and contrast elements

---

## Typography

### Font Families
- **Serif**: `Cormorant Garamond` - Used for all headings (h1-h6)
- **Sans-serif**: `Inter` - Used for body text, UI elements, and navigation

### Type Scale
```
Hero Text:        56px (desktop) / 56px (mobile)
H1:              60px (desktop) / 48px (mobile)
H2:              40px (desktop) / 36px (mobile)
H3:              28px (desktop) / 24px (mobile)
Body XL:         20px
Body Large:      18px
Body:            16px (default)
Small:           14px
```

### Typography Principles
- Headings use serif font for elegance and authority
- Body text uses sans-serif for readability
- Line height: 1.5-1.7 for body text
- Letter spacing: Wide tracking (0.2em) for uppercase labels
- Font weights: Light (300), Regular (400), Medium (500), Semibold (600)

---

## Spacing System

### Section Spacing
- **Desktop**: `96px` (6rem) vertical padding
- **Mobile**: `64px` (4rem) vertical padding
- **Container Padding**: `24px` (1.5rem) horizontal

### Component Spacing
- **Gap between cards**: `24px` (1.5rem)
- **Internal card padding**: `32px-40px` (2-2.5rem)
- **Button padding**: `16px 32px` (vertical/horizontal)
- **Icon spacing**: `12-16px` from text

---

## Border Radius

### Radius Scale
- **Cards**: `16px` (1rem) - `rounded-2xl`
- **Boxes**: `24px` (1.5rem) - `rounded-2xl`
- **Buttons**: `9999px` (full) - `rounded-full`
- **Images**: Custom oval mask for hero images

---

## Components

### Navigation Bar
- **Height**: `80px` (5rem)
- **Position**: Fixed, with backdrop blur
- **Background**: `tawf-sand/90` with blur effect
- **Border**: Bottom border with `tawf-green/10`
- **Logo**: Serif font, 24px, medium weight
- **Links**: Uppercase, wide tracking (0.2em), 14px
- **Hover**: Color transition to `tawf-green`

### Buttons

#### Primary Button
```
Background: tawf-green
Text: tawf-sand
Padding: 16px 32px
Border Radius: Full (pill shape)
Font: Uppercase, wide tracking
Hover: tawf-green-light
```

#### Secondary Button
```
Background: Transparent
Border: 1px solid tawf-green
Text: tawf-green
Padding: 10px 24px
Border Radius: Full
Hover: Fill with tawf-green, text becomes tawf-sand
```

### Cards

#### Standard Card
```
Background: tawf-sand/30 or white
Border: 1px solid tawf-green/10
Border Radius: 16px
Padding: 32px
Shadow: Subtle or none
```

#### Feature Card
```
Icon Container: 56px circle, white background
Icon: 32px, tawf-gold color
Title: Serif, 20px, tawf-green
Description: Sans-serif, 16px, tawf-muted
Label: Uppercase, 12px, wide tracking, tawf-gold
```

### Footer
- **Background**: `tawf-ink` (dark)
- **Text**: White with 60% opacity
- **Padding**: `64px` vertical
- **Grid**: 4 columns on desktop, 1 on mobile
- **Links**: Hover to `tawf-gold`
- **Border**: Top border with white/10

---

## Layout Patterns

### Hero Section
- **Grid**: 2 columns (text + image) on desktop
- **Text Column**: Max-width 2xl (672px)
- **Image**: Oval mask, 600px height
- **Background**: Decorative circles with low opacity
- **Alignment**: Center vertically

### Content Sections
- **Max Width**: `1280px` (7xl)
- **Padding**: Consistent horizontal padding
- **Alternating Backgrounds**: White, Sand, Ink
- **Grid Layouts**: 2-4 columns for feature cards

### Text Content
- **Max Width**: `768px` (3xl) for optimal readability
- **Alignment**: Center for hero/intro, left for body
- **Spacing**: 16px between paragraphs

---

## Animation & Motion

### Principles
- **Duration**: 0.6-1s for page elements
- **Easing**: `easeOut` for natural feel
- **Stagger**: 0.1s delay between sequential items
- **Scroll Animations**: `whileInView` with `once: true`

### Common Animations
```javascript
// Fade in from bottom
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Scale in
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 1 }}
```

---

## Iconography

### Icon Library
- **Source**: Lucide React
- **Size**: 20-32px depending on context
- **Color**: `tawf-gold` for feature icons, `tawf-green` for navigation
- **Style**: Outline/stroke style, consistent weight

### Common Icons
- Shield, HeartHandshake, Landmark - Core values
- Coins, Building2, Network - Financial features
- ChevronRight, ArrowRight - Navigation
- Sparkles, TrendingUp - Growth/success

---

## Imagery

### Style Guidelines
- **Photography**: Islamic architecture, geometric patterns
- **Treatment**: Oval masks for hero images
- **Opacity**: 90% for subtle integration
- **Aspect Ratio**: Maintain proportions, no distortion
- **Quality**: High resolution, optimized for web

### Background Patterns
- Concentric circles with low opacity (3%)
- Geometric Islamic patterns
- Gradient overlays for depth

---

## Accessibility

### Text Contrast
- Ensure WCAG AA compliance minimum
- Dark text on light backgrounds
- Light text on dark backgrounds
- Avoid low-contrast combinations

### Interactive Elements
- Minimum touch target: 44x44px
- Clear focus states
- Keyboard navigation support
- Screen reader friendly labels

### Selection
- Custom selection color: `tawf-gold/30` background
- Selection text: `tawf-green`

---

## Responsive Breakpoints

```
Mobile:     < 768px
Tablet:     768px - 1024px
Desktop:    > 1024px
Large:      > 1280px
```

### Mobile Adaptations
- Single column layouts
- Reduced font sizes (see type scale)
- Reduced spacing (4rem vs 6rem)
- Stacked navigation
- Full-width buttons

---

## Content Tone & Voice

### Writing Style
- **Authoritative yet accessible**
- **Direct and honest** - "Not as promises. As on-chain reality."
- **Mission-driven** - Focus on purpose over profit
- **Technical precision** - Use proper Islamic finance terms
- **Community-focused** - "We" language, inclusive

### Key Phrases
- "Baitul Maal, rebuilt for the digital age"
- "Not as promises. As on-chain reality."
- "From profit into purpose"
- "Architecturally mandatory"

---

## Design Principles

### 1. Trust Through Transparency
- Clear information hierarchy
- Visible governance structures
- On-chain verification emphasis

### 2. Heritage Meets Innovation
- Traditional Islamic aesthetics (serif fonts, gold accents)
- Modern Web3 functionality
- Balance between old and new

### 3. Purpose Over Profit
- Mission-first messaging
- Community benefit highlighted
- Ethical finance emphasized

### 4. Clarity & Simplicity
- Clean layouts
- Ample whitespace
- Focused content sections
- No unnecessary decoration

### 5. Warmth & Approachability
- Warm color palette (sand, gold)
- Friendly spacing
- Human-centered language
- Welcoming imagery

---

## Implementation Notes

### CSS Variables
All design tokens are defined in `src/styles/index.css` using CSS custom properties:
```css
--color-tawf-green: #0F3D30;
--spacing-section: 6rem;
--radius-card: 1rem;
--text-hero: 3.5rem;
```

### Tailwind CSS v4
- Uses `@theme` directive for custom tokens
- Utility-first approach
- Custom color classes: `bg-tawf-green`, `text-tawf-gold`
- Responsive modifiers: `md:`, `lg:`

### Component Constants
Consistent spacing and radius values defined as constants:
```javascript
const SECTION_PADDING = "py-24 md:py-24";
const CONTAINER_PADDING = "px-6";
const MAX_WIDTH = "max-w-7xl";
const RADIUS_CARD = "rounded-2xl";
const RADIUS_BUTTON = "rounded-full";
```

---

## File Structure

```
src/
├── styles/
│   └── index.css          # Global styles, theme tokens
├── components/
│   ├── Layout.tsx         # Nav + Footer wrapper
│   ├── Landing.tsx        # Homepage sections
│   └── Manifesto.tsx      # Manifesto page
└── App.tsx                # Router configuration
```

---

## Brand Assets

### Logo Usage
- Font: Cormorant Garamond
- Size: 24px (navigation)
- Color: `tawf-green`
- Weight: Medium (500)
- Tracking: Wide

### Tagline
"The non-profit, public-trust cornerstone of the Tawf ecosystem."

---

## Do's and Don'ts

### Do's ✓
- Use serif fonts for headings
- Maintain consistent spacing
- Use pill-shaped buttons
- Include subtle animations
- Emphasize mission and values
- Use warm, inviting colors
- Provide clear CTAs

### Don'ts ✗
- Don't use bright, saturated colors
- Don't overcrowd layouts
- Don't use multiple font families
- Don't hide important information
- Don't use aggressive sales language
- Don't compromise on accessibility
- Don't ignore mobile experience

---

## Version History
- **v1.0** - Initial design system (March 2026)
- Built with React 19, TypeScript 5.8, Vite 6.2, Tailwind CSS v4

---

*This design system reflects the Tawf Islamic Foundation's commitment to ethical finance, transparency, and community ownership. Every design decision serves the mission of rebuilding Baitul Maal for the digital age.*
