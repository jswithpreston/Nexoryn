# Nexoryn
<< HEAD The official website for Nexoryn — a systems engineering company building intelligent software, cybersecurity solutions, custom operating systems, developer infrastructure, and digital growth platforms.
=======

**Systems Engineering for the Future.**

Nexoryn designs, builds, secures, and scales intelligent digital systems — from custom operating systems and high-frequency trading infrastructure to enterprise web platforms and cybersecurity tooling.

Live site: [nexoryn.com](https://nexoryn.com)

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** Formspree
- **Fonts:** Outfit (display), Inter (body) via `next/font`

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home (server — metadata + JSON-LD)
│   ├── home-client.tsx       # Home client component
│   ├── services/
│   ├── projects/
│   ├── labs/
│   ├── contact/
│   ├── sitemap.ts            # Auto-generated sitemap.xml
│   └── robots.ts             # Auto-generated robots.txt
└── components/ui/
    ├── nav.tsx               # Header + mobile drawer
    ├── footer.tsx            # Full footer
    ├── animated-background.tsx  # Canvas grid + ambient glows
    ├── architecture-viz.tsx  # Hero node network
    ├── cursor.tsx            # Custom cursor + particle trail
    ├── magnetic-button.tsx   # Magnetic hover effect
    └── page-transition.tsx   # Route fade transitions
```

---

## Features

- **Motion system** — canvas-based animated grid, data sweep scan lines, cursor-reactive ambient lighting, autonomous node physics (Labs page), scroll-driven parallax
- **Custom cursor** — particle trail, contextual states (default / hover / text input), hover pulse ring
- **Architecture visualization** — fixed node network with live data pulses animating along connections
- **Animated numbers** — metrics count up from zero on scroll-into-view
- **Page transitions** — smooth fade + translate on every route change
- **Mobile nav** — animated slide-in drawer with active route indicator
- **Active nav state** — animated underline indicator slides between links
- **Contact form** — live Formspree submission with launch animation + success state, mailto fallback
- **SEO** — per-page metadata, Open Graph, canonical URLs, JSON-LD structured data, sitemap, robots.txt
- **Accessibility** — `prefers-reduced-motion` respected across all canvas and Framer Motion animations
- **Performance** — canvas loops pause on hidden tab (`visibilitychange`), no hydration mismatches

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — hero viz, metrics, ecosystem cards, philosophy |
| `/services` | Six engineering domains with animated domain cards |
| `/projects` | Case studies: Elevate OS, TradeGuard, Nexoryn Secure |
| `/labs` | Innovation Lab — autonomous node canvas, research projects |
| `/contact` | Guided form with progressive illumination + Formspree |

---

## Environment

No environment variables required for local development. The contact form posts to Formspree — to use your own endpoint, update the URL in `src/app/contact/contact-client.tsx`.

---

## Deployment

Deploy to [Vercel](https://vercel.com) in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Update `metadataBase` in `src/app/layout.tsx` and canonical URLs in each page's metadata to match your production domain before deploying.

---

## License

Private. All rights reserved © Nexoryn.
>>>>>>> 3190b71 (Initial commit — Nexoryn website)
