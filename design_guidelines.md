# ExperTax Design Guidelines

## Design Approach
**Reference-Based with Premium Professional Enhancement**
Drawing inspiration from: Stripe's confidence, Linear's typography precision, and high-end law/consulting firms. Creating a tax firm that feels established, bold, and distinctively premium—NOT a template.

## Typography System

**Primary Font**: Inter or Manrope (Google Fonts)
- Hero Headlines: 4xl-6xl, font-weight 700-800, tight tracking (-0.02em)
- Section Headers: 3xl-4xl, font-weight 700
- Body: base-lg, font-weight 400-500, relaxed leading (1.7)
- Accents: Uppercase labels at xs-sm, font-weight 600, wide tracking (0.1em)

**Key Principle**: Use oversized, confident headlines. Tax firms can be bold. "Expert Tax Solutions" at 72px beats generic 36px every time.

## Layout System

**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 24, 32
- Section padding: py-24 (desktop), py-16 (mobile)
- Component gaps: gap-8 to gap-12
- Container: max-w-7xl with px-6

**Grid Strategy**:
- Hero: Full-width with max-w-5xl content
- Services: 3-column grid (lg:grid-cols-3, md:grid-cols-2)
- Trust Signals: 4-column stat display
- Team: 2-column asymmetric layout

## Core Components

**Navigation**
- Sticky header with subtle backdrop blur
- Logo left, menu right with CTA button
- Clean spacing (py-6), single-line layout

**Hero Section** (Full viewport height - 90vh)
- Large hero image with gradient overlay (dark gradient bottom to transparent top)
- Oversized headline + supporting subtext
- Dual CTA buttons with blurred backgrounds (primary + ghost secondary)
- Trust indicator below CTAs: "Serving 500+ businesses since 2010"

**Service Cards**
- Clean white cards with hover lift (subtle shadow increase)
- Icon top-left (48x48), bold title, concise description
- "Learn more" link bottom-right
- Generous padding (p-8)

**Statistics Section**
- Dark background section for contrast break
- 4-column grid: Large number (4xl) + label below
- Centered layout with breathing room

**CTA Sections**
- Full-width background treatment (image or gradient)
- Centered content with max-w-3xl
- Strong headline + supporting text + primary button
- Include supporting element: "Free consultation • No obligations"

**Footer**
- 4-column layout: About, Services, Resources, Contact
- Newsletter signup integrated
- Trust badges: Professional affiliations, certifications
- Social links, legal links bottom

## Images

**Required Images** (8 total):

1. **Hero Image**: Modern office environment or professional handshake, high-quality, 1920x1080, positioned with dark gradient overlay for text contrast
2. **Services Icons**: 6 custom icons representing tax services (individual, business, planning, etc.) - use Heroicons for consistency
3. **Team Photo**: Professional team photo, authentic setting, 1200x800
4. **Office Image**: Clean, modern office space for secondary CTA section, 1920x600
5. **Trust Logos**: Client company logos or certification badges (scattered placement)

**Image Treatment**: All photos should feel authentic, not stock-photo-generic. Prefer candid professional moments over posed studio shots.

## Unique Elements

**Distinctive Features**:
- Asymmetric section layouts (not everything centered)
- Bold color blocks for section breaks
- Oversized numerical stats with subtle animations
- Testimonial cards with large quotation marks as design element
- Staggered card heights in service grid for visual interest

**Animation Budget**: Minimal and purposeful
- Fade-in on scroll for sections
- Gentle hover lift on cards
- No distracting continuous animations

## Page Structure (7 Sections)

1. Hero with image overlay
2. Services grid (3 columns)
3. Why Choose Us (2-column: text + image)
4. Statistics bar (dark section)
5. Testimonials (2-column masonry)
6. Team introduction
7. Final CTA + Footer

**Critical**: Each section is fully designed, purposeful, and contributes to conversion. No filler content.