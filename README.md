# RouteSathi (रूट साथी)

> **Plan with confidence. Adapt when travel changes.**

An adaptive travel-readiness platform for unpredictable ground realities. Built for college groups, roadtrippers, and exploratory travelers exploring India's diverse destinations—starting with **Manali, Himachal Pradesh** as the pilot corridor.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [State Management](#state-management)
- [Design System](#design-system)
- [Demo Mode](#demo-mode)
- [Deployment](#deployment)
- [Limitations](#limitations)
- [Future Roadmap](#future-roadmap)

---

## Overview

RouteSathi is **not** a generic AI chatbot, an online travel agency (OTA), or a replacement for Google Maps. It transforms static, fragile travel schedules into resilient, contingency-backed journeys evaluated by a transparent **Travel Readiness Score (0–100)** and connected to **verified local providers**.

The platform provides an end-to-end adaptive loop:

1. **AI-Assisted Itinerary** — Tailored to group dynamics, real mountain travel times, and realistic budgets.
2. **Travel Readiness Score (0–100)** — A transparent, rule-based index evaluating route safety, stay certainty, provider trust, destination alerts, and trip completeness.
3. **Verified Local Provider Trust Scores** — 5-point transparent vetting for homestays, licensed taxi unions, and certified mountain culture guides.
4. **Time-Stamped Destination Alerts** — Verified ground advisories from local operators and moderators.
5. **Smart Disruption-to-Alternative Planning** — When a disruption occurs, the platform computes a practical, weather-sheltered alternative and lets travelers adapt their entire day's schedule in **1 click**.

---

## Tech Stack

### Core Dependencies

| Category | Technology | Version |
| :--- | :--- | :---: |
| **Framework** | React | 19.2.8 |
| **Renderer** | React DOM | 19.2.8 |
| **Build Tool** | Vite | 8.3.0 |
| **Language** | TypeScript | ~6.0.2 |
| **Bundler Plugin** | @vitejs/plugin-react | 6.1.1 |
| **CSS Framework** | Tailwind CSS | 4.3.3 |
| **Vite-Tailwind Plugin** | @tailwindcss/vite | 4.3.3 |
| **Routing** | React Router DOM | 7.18.4 |
| **Icons** | Lucide React | 1.51.0 |
| **Confetti** | canvas-confetti | 1.9.4 |
| **Class Utilities** | clsx | 2.1.1 |
| **Class Merge** | tailwind-merge | 3.7.0 |

### Dev Dependencies

| Category | Technology | Version |
| :--- | :--- | :---: |
| **TypeScript** | typescript | ~6.0.2 |
| **Type Definitions** | @types/react, @types/react-dom | 19.2.x |
| **Node Types** | @types/node | ^24.13.3 |
| **Confetti Types** | @types/canvas-confetti | ^1.9.0 |
| **Linter** | oxlint | ^1.81.0 |

### Configuration Files

| File | Purpose |
| :--- | :--- |
| `package.json` | Project manifest, dependencies, and npm scripts |
| `vite.config.ts` | Vite build configuration with React and Tailwind plugins |
| `tsconfig.json` | Root TypeScript config (project references) |
| `tsconfig.app.json` | App TypeScript config (ES2023, DOM, React JSX) |
| `tsconfig.node.json` | Node config for Vite config file (strict mode) |
| `.oxlintrc.json` | Oxlint configuration (react, typescript, oxc plugins) |
| `vercel.json` | Vercel deployment config (SPA rewrites) |
| `index.html` | HTML entry point with Google Fonts & SVG favicon |
| `public/_redirects` | SPA fallback for static hosts (Netlify-style) |

---

## Key Features

### Travel Readiness Score
A transparent, auditable formula based on 5 weighted pillars (20% each):

$$\text{Readiness Score} = 0.20 \times S_{\text{route}} + 0.20 \times S_{\text{stay}} + 0.20 \times S_{\text{trust}} + 0.20 \times S_{\text{updates}} + 0.20 \times S_{\text{completeness}}$$

| State | Route | Stay | Trust | Updates | Completeness | Overall | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Initial Baseline** | 92 | 100 | 88 | 82 | 76 | **86** | Ready to Go |
| **Solang Weather Disruption** | 75 | 100 | 88 | 45 | 76 | **62** | Needs Attention |
| **After Alternate Applied** | 88 | 100 | 91 | 82 | 84 | **84** | Ready to Go |

### Verified Local Provider Trust Score
Every local operator profile features a transparent checklist: identity verification, recent activity, consistent feedback, community moderation, and local base establishment.

### Smart Disruption-to-Alternative Planning
When outdoor activities in Solang Valley get disrupted by sudden weather changes, RouteSathi automatically drafts a weather-friendly alternative (like the Naggar Castle cultural tour) and lets you swap it in 1 click.

### Interactive Features
- **Interactive SVG corridor map** of the Beas Valley
- **Animated gauge meters** for readiness visualization
- **Canvas confetti** celebrations on plan adaptation
- **Auto-dismiss toast notifications**
- **Modal dialogs** for provider inquiries
- **Interactive travel checklist**

---

## Project Architecture

RouteSathi is a **single-page application (SPA)** with a component-based architecture. State is managed centrally via React Context with automatic `localStorage` persistence. All data is currently mock/seeded (no backend API).

```
React 19 (SPA)
│
├─ Vite 8 (Build Tool)
│   └─ @vitejs/plugin-react (Fast Refresh + JSX transform)
│
├─ Tailwind CSS 4 (Styling)
│   └─ Custom Design System (CSS variables for colors)
│
├─ React Router 7 (Client-side routing)
│   └─ BrowserRouter for SPA navigation
│
├─ React Context API (Global state)
│   └─ localStorage persistence layer
│
└─ Mock Data Layer (Seeded data, no backend)
    ├─ data/mockProviders.ts    (5 local operators)
    ├─ data/mockAlerts.ts       (Travel advisories)
    ├─ data/mockItinerary.ts    (3-day itinerary + alternate)
    └─ data/mockChecklist.ts    (Travel essentials checklist)
```

---

## Folder Structure

```
RouteSathi/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── _redirects              # SPA fallback for static hosting
├── src/
│   ├── assets/                  # Static images (hero, React/Vite logos)
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── common/              # Shared UI components
│   │   │   ├── Button.tsx       # Multi-variant button system
│   │   │   ├── Navbar.tsx       # Brand header, pilot tag, links, demo toggle
│   │   │   ├── Footer.tsx       # Disclaimers, hackathon notes & links
│   │   │   ├── Modal.tsx        # Accessible modal dialog
│   │   │   ├── Toast.tsx        # Auto-dismiss notification container
│   │   │   ├── StatusBadge.tsx  # Badges for Trip, Item, Verification, Severity
│   │   │   ├── LoadingState.tsx # Animated compass loader
│   │   │   ├── EmptyState.tsx   # Reusable zero-state component
│   │   │   └── DemoControlPanel.tsx # Floating hackathon judge demo bar
│   │   ├── readiness/           # Travel readiness components
│   │   │   ├── ReadinessGauge.tsx       # Circular SVG gauge
│   │   │   ├── ReadinessFactorCard.tsx  # 5-factor breakdown cards
│   │   │   ├── TrustScoreCard.tsx       # Provider trust breakdown
│   │   │   └── ChecklistCard.tsx        # Interactive checklist component
│   │   ├── itinerary/           # Itinerary display components
│   │   │   ├── ItineraryTimeline.tsx    # Day tabs & activity stream
│   │   │   ├── ItineraryItem.tsx        # Activity cards with banners
│   │   │   └── BudgetSummary.tsx        # Budget tracker
│   │   ├── providers/           # Local provider components
│   │   │   └── ProviderCard.tsx         # Provider cards with trust scores
│   │   └── alerts/              # Travel advisory components
│   │       ├── AlertCard.tsx            # Time-stamped travel advisories
│   │       └── InteractiveMap.tsx       # SVG map of the Beas Valley
│   ├── context/
│   │   └── TripContext.tsx      # Central state, localStorage persistence
│   ├── data/                    # Mock/seeded data
│   │   ├── mockProviders.ts     # 5 local operators
│   │   ├── mockAlerts.ts        # Weather & route advisories
│   │   ├── mockItinerary.ts     # Day 1-3 + Day 2 alternate
│   │   └── mockChecklist.ts     # Travel essentials checklist
│   ├── pages/                   # Route pages (9 routes)
│   │   ├── LandingPage.tsx         # Hero, problem, solution, pilot
│   │   ├── PlanTripPage.tsx        # Multi-step trip planner
│   │   ├── ItineraryPage.tsx       # Central itinerary dashboard
│   │   ├── ReadinessDashboardPage.tsx # Readiness score & simulator
│   │   ├── AlternatePlanPage.tsx   # Side-by-side plan comparison
│   │   ├── AlertsPage.tsx          # Alert list & corridor map
│   │   ├── ExplorePage.tsx         # Provider marketplace
│   │   ├── ProviderDetailPage.tsx  # Partner profile & inquiry
│   │   └── PartnerDashboardPage.tsx # Partner portal
│   ├── types/
│   │   └── index.ts             # Core TypeScript interfaces
│   ├── App.tsx                  # Router & layout shell
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Tailwind directives & custom styles
│   └── App.css                  # Legacy styles (unused by current pages)
├── index.html                   # HTML entry with fonts & metadata
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # Root TS config (project references)
├── tsconfig.app.json            # App TS config
├── tsconfig.node.json           # Node TS config (strict)
├── vite.config.ts               # Vite configuration
├── .oxlintrc.json               # Oxlint rules
├── .gitignore
└── vercel.json                  # Vercel SPA deployment config
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher (tested on v24.14.1)
- **npm** v9 or higher

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

---

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check with `tsc -b` then build with Vite |
| `npm run lint` | Run oxlint for code quality checks |
| `npm run preview` | Serve the production build locally |

---

## Routing

RouteSathi uses **React Router v7** for client-side navigation. The application is configured as a single-page application (SPA) with `BrowserRouter`.

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | LandingPage | Hero, problem statement, solution pillars, pilot market |
| `/plan` | PlanTripPage | 3-step trip planner (basics → preferences → review & generate) |
| `/trip/demo-trip` | ItineraryPage | Central itinerary dashboard with budget & provider sidebar |
| `/trip/demo-trip/readiness` | ReadinessDashboardPage | Travel Readiness Score gauge, factor cards, disruption simulator |
| `/trip/demo-trip/alternate-plan` | AlternatePlanPage | Side-by-side plan comparison with 1-click adaptation |
| `/alerts` | AlertsPage | Category tabs, search, and interactive corridor map |
| `/explore` | ExplorePage | Local provider marketplace with filters |
| `/provider/:id` | ProviderDetailPage | Partner profile, trust checklist, inquiry modal |
| `/partner` | PartnerDashboardPage | Partner portal for availability & local updates |
| `*` | LandingPage | Catch-all fallback route |

---

## State Management

The application uses **React Context API** for global state management, implemented in [`src/context/TripContext.tsx`](src/context/TripContext.tsx).

### Context Features

- **Automatic `localStorage` persistence** — State is automatically saved and restored using the key `routesathi_trip_data_v2`
- **Demo controller actions** — `triggerDisruption()`, `applyAlternatePlan()`, `revertToOriginalPlan()`, `resetDemo()`
- **Toast notifications** — Auto-dismiss after 4.5 seconds
- **Provider interactions** — Toggle providers in trip, save favorites
- **Checklist management** — Toggle travel essentials checklist items

### Key Types

All core types are defined in [`src/types/index.ts`](src/types/index.ts):

- `TripPreferences` — Destination, duration, group, budget, interests, transport, resilience toggles
- `DayItinerary` / `ItineraryItemType` — Day-wise trip items with status and cost
- `ReadinessFactors` — 5-factor scoring with overall score and trip status
- `Provider` — Local operator info with trust score and verification details
- `TravelAlert` — Time-stamped travel advisories with severity and impact
- `ChecklistItem` — Travel essentials checklist
- `TripStatus` — `'Ready to Go' | 'Needs Attention' | 'Action Required'`

---

## Design System

### Color Palette

| Color | Hex | Usage |
| :--- | :---: | :--- |
| Deep Navy | `#0B1F33` | Primary text, headers, dark accents |
| Mountain Teal | `#0E7490` | Primary brand color, links, CTA borders |
| Forest Green | `#15803D` | Success states, confirmed items |
| Amber | `#D97706` | Warnings, caution states |
| Red | `#DC2626` | Critical alerts, errors |
| Background | `#F8FAFC` | Page background (Light Slate) |
| Text Secondary | `#475569` | Secondary/muted text |

Colors are defined both as CSS variables in `index.css` and used directly as Tailwind utility classes throughout components.

### Typography

- **Body Font**: Plus Jakarta Sans (Google Fonts) — weights 400, 500, 600, 700, 800
- **Monospace Font**: JetBrains Mono (Google Fonts) — weights 400, 600, 700

### Custom Components

- **Button** — Multi-variant system (primary, secondary, outline) with icon support
- **StatusBadge** — Type-aware badges (trip, item, verification, severity)
- **ReadinessGauge** — Animated circular SVG gauge with score visualization
- **InteractiveMap** — SVG corridor map of the Beas Valley with clickable alert markers
- **Toast** — Stack-based auto-dismiss notification system
- **Modal** — Accessible dialog with focus trap

---

## Demo Mode

The application includes a **demo mode** (enabled by default) that allows judges and users to experience the full adaptive planning workflow:

1. **Start** at the Landing Page with a baseline readiness score of **86/100** ("Ready to Go")
2. **Trigger Disruption** — Click the demo controller or navigate to the Readiness page and simulate a Solang Valley weather alert
3. **Observe Impact** — Score drops to **62/100** ("Needs Attention"), Day 2 activities are flagged
4. **Apply Alternate Plan** — Navigate to the alternate plan page and click "Apply Alternate Plan"
5. **Celebrate** — Canvas confetti triggers, score restores to **84/100**, itinerary adapts seamlessly

The demo state can be **reset** at any time using the "Reset Demo" button in the demo control panel.

---

## Deployment

### Vercel (Recommended)

The project includes a [`vercel.json`](vercel.json) configuration that rewrites all routes to `index.html`, making it ready for one-click deployment on Vercel:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Other Static Hosts

The [`public/_redirects`](public/_redirects) file provides SPA fallback routing for Netlify and similar static hosting providers:

```
/*    /index.html   200
```

---

## Limitations

- **Pilot Prototype**: The current MVP utilizes seeded (mock) data for the Manali-Kullu Valley pilot corridor.
- **Simulated Advisories**: Travel and weather alerts are simulated for demonstration and do not reflect statutory government advisories.
- **Prototype Partner Verification**: Provider Trust Scores demonstrate platform workflows and do not constitute legal certification.
- **Decision Support**: RouteSathi is designed to assist travelers in making informed, proactive decisions but cannot guarantee travel safety or eliminate environmental hazards.
- **No Backend**: All data is currently mock data; a production version would require API integration with weather, transport, and booking services.

---

## Future Roadmap

- **Pan-India Expansion**: Goa coastal circuits, Western Ghats road trips, Ladakh high-altitude routes, and Char Dham pilgrimage corridors.
- **Offline Mesh Sync**: Peer-to-peer Bluetooth/mesh sync between travelers when cellular networks drop in mountain valleys.
- **Taxi Union Digital Gateways**: Verified dispatch integrations with local driver unions for fair-tariff emergency reroutes.
- **Multi-lingual Voice Interface**: Audio prompts in Hindi, Pahari, Punjabi, and English for local drivers and homestay hosts.
- **Real API Integrations**: Weather services, transport department APIs, and live permit/availability data feeds.
- **Mobile App**: Progressive Web App (PWA) support and native mobile applications.

---

*RouteSathi • Built with React, Vite, TypeScript, and Tailwind CSS — with passion for resilient travel across India.*


