# RouteSathi (रूट साथी)
> **“Plan with confidence. Adapt when travel changes.”**

An adaptive travel-readiness platform designed for unpredictable ground realities. Built for college groups, roadtrippers, and exploratory travelers exploring India's diverse destinations—starting with **Manali, Himachal Pradesh** as the pilot corridor.

---

## 🏔️ Core Innovation

> **“AI can suggest an itinerary. RouteSathi tells travelers whether that itinerary is actually ready for the real world, identifies disruptions affecting the plan, and provides an instant practical alternative.”**

RouteSathi is **not** a generic AI chatbot, an online travel agency (OTA), or a replacement for Google Maps. It transforms static, fragile travel schedules into resilient, contingency-backed journeys evaluated by a transparent **Travel Readiness Score (0–100)** and connected to **verified local providers**.

---

## 🎯 The Problem

Modern travelers juggle disconnected applications:
- **ChatGPT**: Generates dream itineraries without awareness of high-altitude weather holds, permit queues, or seasonal road closures.
- **Google Maps**: Calculates highway driving times but cannot forecast mountain wind holds, paragliding safety pauses, or landslide bypasses.
- **Booking Apps**: Confirms hotel beds in isolation from daily route conditions.
- **Social Media (Instagram/WhatsApp)**: Displays picturesque reels without crowd congestion warnings or safety advisories.
- **Random Phone Calls / Rumors**: Leads to panic, surge prices, or stranded groups when ground conditions abruptly change.

### The Gap
> *“A trip planned online can still fail on the ground.”*

---

## 💡 The Solution

RouteSathi provides an end-to-end adaptive loop:
1. **AI-Assisted Itinerary**: Tailored to traveler group dynamics, real mountain travel times, and realistic budgets.
2. **Travel Readiness Score (0–100)**: A transparent, rule-based index evaluating route safety, stay certainty, provider trust, destination alerts, and trip completeness.
3. **Verified Local Provider Trust Scores**: 5-point transparent vetting for homestays, licensed taxi unions, and certified mountain culture guides.
4. **Time-Stamped Destination Alerts**: Verified ground advisories from local operators and moderators.
5. **Smart Disruption-to-Alternative Planning**: When a disruption occurs, the platform doesn't just display a warning—it computes a practical, weather-sheltered alternative and lets the traveler adapt their entire day's schedule in **1 click**.

---

## 🎬 Main User Demo Story (Atharv's 3-Day Manali Trip)

### Traveler Persona
- **User**: Atharv, a college student planning a 3-day Manali trip with 3 college friends (4 travelers total).
- **Budget**: ₹6,000 per person (₹24,000 group total).
- **Interests**: Adventure, Sightseeing, Local Food.
- **Transport**: Self-drive / Taxi.

### Step-by-Step Hackathon Demo Walkthrough
1. **Trip Generation (`/plan` → `/trip/demo-trip`)**:
   - Initial Itinerary:
     - **Day 1**: Central Mall Road, Hadimba Devi Temple, Old Manali Local Food Trail.
     - **Day 2**: Solang Valley Outdoor Activities (Ropeway/Paragliding), Valley-View Café, Optional Guide.
     - **Day 3**: Naggar Castle Heritage, Khadi Traditional Craft Guild, Farewell Riverside Café.
   - **Initial State**:
     - Travel Readiness Score: **86/100**
     - Status: **“Ready to Go”**
     - Breakdown: Route: 92 | Stay: 100 | Provider Trust: 88 | Destination Updates: 82 | Completeness: 76
2. **Simulate Travel Disruption (`/trip/demo-trip/readiness` or Demo Bar)**:
   - Click **“Simulate Travel Disruption”**.
   - A moderator-verified weather alert hits Solang Valley (45 km/h gusts & high-altitude drizzle affecting outdoor ropeways).
   - **Disrupted State**:
     - Travel Readiness Score drops to **62/100**
     - Status changes to **“Needs Attention”**
     - Day 2 Solang Valley activity is marked **“Needs Review”** with prominent caution callouts.
     - The app clearly explains *why* the plan is affected.
3. **Alternate Plan Experience (`/trip/demo-trip/alternate-plan`)**:
   - Traveler clicks **“View Recommended Alternate Plan”**.
   - Displays a side-by-side comparison between the disrupted outdoor plan and the recommended weather-sheltered cultural circuit:
     - **Naggar Castle Heritage Walk** (Kath-Kuni stone & timber)
     - **Nicholas Roerich Art Gallery & Museum** (Covered indoor exhibits)
     - **Local Artisan Woodcraft & Shawl Guild**
     - **Heritage Woodstove Bakery & Café**
     - **Verified Local Guide**: *Kullu Culture Walks* (Trust Score 93/100)
     - Estimated Cost: ₹900–₹1,300 per person (well within budget!)
     - Travel Time: 45 minutes along NH-3 left bank bypass
     - Tags: *Weather-Friendly, Culture, Local Experience, Group-Friendly*
4. **Instant 1-Click Schedule Adaptation**:
   - Traveler clicks **“Apply Alternate Plan”**.
   - Day 2 itinerary is swapped seamlessly.
   - Travel Readiness Score restores to **84/100**.
   - Status updates back to **“Ready to Go”**.
   - **“Adapted Plan”** badges appear on the itinerary.
   - Success toast appears: *“Your itinerary has been updated. You are ready to go.”*

---

## 📊 Travel Readiness Score Logic

Unlike opaque AI black-boxes, RouteSathi calculates readiness using an open, auditable formula based on 5 weighted pillars (20% each):

$$\text{Readiness Score} = 0.20 \times S_{\text{route}} + 0.20 \times S_{\text{stay}} + 0.20 \times S_{\text{trust}} + 0.20 \times S_{\text{updates}} + 0.20 \times S_{\text{completeness}}$$

| State | Route Status (20%) | Stay & Booking (20%) | Provider Trust (20%) | Destination Updates (20%) | Trip Completeness (20%) | Overall Score | Trip Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Initial Baseline** | 92 | 100 | 88 | 82 | 76 | **86 / 100** | **Ready to Go** |
| **Solang Weather Disruption** | 75 | 100 | 88 | 45 | 76 | **62 / 100** | **Needs Attention** |
| **After Alternate Applied** | 88 | 100 | 91 | 82 | 84 | **84 / 100** | **Ready to Go** |

### Why Each Factor Changes:
- **Route Status**: Penalized from 92 to 75 during Solang wind advisory; recovers to 88 on the sheltered Naggar valley road.
- **Destination Updates**: Drops from 82 to 45 because a Moderate Severity alert directly intersects Day 2's planned activities; restores to 82 once adapted to unaffected venues.
- **Provider Trust**: Elevates from 88 to 91 after assigning *Kullu Culture Walks* (93 Trust Score).
- **Trip Completeness**: Increases from 76 to 84 because a weather backup and verified cultural guide are now actively locked in.

---

## 🛡️ Transparent Local Provider Trust Score (0–100)

Every local operator profile features a transparent checklist:
- ✅ **Identity & business details submitted**: Local registration and taxi union permits verified.
- ✅ **Recently active**: Confirmed operational status within the last 24 hours.
- ✅ **Consistent traveler feedback**: 4.5+ star peer ratings from verified groups.
- ✅ **Good response consistency**: Average inquiry response under 30 minutes.
- ✅ **Community & moderator validation**: Active participant in valley safety guidelines.

---

## 🛠️ Tech Stack

- **Framework**: React 19 with Vite & TypeScript
- **Styling**: Tailwind CSS v4 (Design system with Deep Navy `#0B1F33`, Mountain Teal `#0E7490`, Forest Green `#15803D`, Amber `#D97706`, Red `#DC2626`)
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React
- **State & Persistence**: React Context API with automatic `localStorage` synchronization
- **Interactions**: Interactive illustrated SVG corridor map of Manali, dynamic gauge meters, modal dialogues, toast engine, and canvas confetti celebrations.

---

## 📁 Folder Structure

```
RouteSathi/
├── public/
├── src/
│   ├── types/
│   │   └── index.ts                 # Core TypeScript definitions (Readiness, Itinerary, Providers, Alerts)
│   ├── data/
│   │   ├── mockProviders.ts         # PineNest, Himalayan Trails, Kullu Culture Walks, Mountain Ride, Dham
│   │   ├── mockAlerts.ts            # Solang weather caution, Mall road traffic, Naggar culture, Rohtang
│   │   ├── mockItinerary.ts         # Day 1-3 itineraries & Day 2 Naggar alternative
│   │   └── mockChecklist.ts         # Travel essentials checklist items
│   ├── context/
│   │   └── TripContext.tsx          # Central state, localStorage persistence & demo controller actions
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx           # Brand header, pilot tag, links, demo toggle
│   │   │   ├── Footer.tsx           # Disclaimers, hackathon notes & links
│   │   │   ├── Button.tsx           # Multi-variant button system
│   │   │   ├── StatusBadge.tsx      # Badges for Trip, Item, Verification, Severity
│   │   │   ├── Modal.tsx            # Accessible modal dialog
│   │   │   ├── Toast.tsx            # Auto-dismiss notification container
│   │   │   ├── LoadingState.tsx     # Animated compass loader
│   │   │   ├── EmptyState.tsx       # Reusable zero-state component
│   │   │   └── DemoControlPanel.tsx # Floating Hackathon Judge Demo Bar
│   │   ├── readiness/
│   │   │   ├── ReadinessGauge.tsx   # Circular SVG gauge with animated transitions
│   │   │   ├── ReadinessFactorCard.tsx # Breakdown card for 5 scoring factors
│   │   │   ├── TrustScoreCard.tsx   # Trust breakdown for local partners
│   │   │   └── ChecklistCard.tsx    # Interactive travel essentials checklist
│   │   ├── itinerary/
│   │   │   ├── ItineraryTimeline.tsx# Day tabs & vertical activity stream
│   │   │   ├── ItineraryItem.tsx    # Activity cards with disruption banners
│   │   │   └── BudgetSummary.tsx    # Per-person and group budget tracker
│   │   ├── providers/
│   │   │   └── ProviderCard.tsx     # Local operator cards with trust scores & add-to-trip
│   │   └── alerts/
│   │       ├── AlertCard.tsx        # Structured time-stamped travel advisories
│   │       └── InteractiveMap.tsx   # Interactive SVG map of the Beas Valley corridor
│   ├── pages/
│   │   ├── LandingPage.tsx          # Hero, problem gap, 3-step works, pillars, pilot
│   │   ├── PlanTripPage.tsx         # Multi-step trip generator with loading state
│   │   ├── ItineraryPage.tsx        # Central dashboard with budget & provider sidebar
│   │   ├── ReadinessDashboardPage.tsx # "Is Your Trip Ready?" scoring & disruption simulator
│   │   ├── AlternatePlanPage.tsx    # Side-by-side plan comparison & 1-click apply
│   │   ├── AlertsPage.tsx           # Category tabs, search & corridor map
│   │   ├── ExplorePage.tsx          # Local provider marketplace with filters
│   │   ├── ProviderDetailPage.tsx   # Partner profile, trust checklist & inquiry modal
│   │   └── PartnerDashboardPage.tsx # Partner portal for availability & posting updates
│   ├── App.tsx                      # App router & layout shell
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Tailwind CSS configuration & fonts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Setup & Running Locally

### Prerequisites
- Node.js v18+ (tested on Node v24.14.1)
- npm v9+

### Installation Steps
```bash
# 1. Clone the repository or navigate to workspace
cd RouteSathi

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production preview
npm run build
npm run preview
```

Open `http://localhost:5173` in your browser.

---

## 🕹️ Demo Instructions for Hackathon Judges

1. **Start at Landing Page (`/`)**:
   - Review value proposition and hero readiness preview.
   - Click **“Plan My Trip”** to customize or **“See Demo Trip”** to jump directly to Atharv’s Manali adventure.
2. **Trip Planner (`/plan`)**:
   - Complete Step 1 (Basics: Manali, 3 Days, Friends, 4 Travelers).
   - Complete Step 2 (Preferences: ₹6,000/person, Adventure & Sightseeing, Self-drive, Resilience toggles).
   - Complete Step 3 (Review) and click **“Generate My Travel Plan”**.
   - Notice the loading state transitioning into `/trip/demo-trip`.
3. **Inspect Itinerary & Baseline Score (`/trip/demo-trip`)**:
   - Readiness Score starts at **86/100 (“Ready to Go”)**.
   - Day 2 features Solang Valley Outdoor Activity.
4. **Trigger Disruption**:
   - Click **“Simulate Disruption (62)”** on the floating demo controller or on `/trip/demo-trip/readiness`.
   - Score immediately drops to **62/100 (“Needs Attention”)**.
   - Solang Valley activity updates to **“Needs Review”** with a weather alert warning.
5. **Review & Apply Alternate Plan (`/trip/demo-trip/alternate-plan`)**:
   - Click **“View Recommended Alternate Plan”**.
   - Inspect the side-by-side comparison with Naggar Castle and *Kullu Culture Walks*.
   - Click **“Apply Alternate Plan”**.
   - Confetti triggers, Day 2 is replaced with weather-friendly stops, and the score updates to **84/100 (“Ready to Go”)**.
6. **Explore Other Pages**:
   - `/alerts`: Switch between List View and the **Interactive Corridor Map**.
   - `/explore`: Filter providers by Weather-Friendly, Verified Only, and Category.
   - `/provider/kullu-culture-walks`: Inspect the 5-point trust checklist and test the inquiry modal.
   - `/partner`: Test toggling availability and submitting a local update with status **“Pending Moderator Review”**.
   - Reset anytime using the **“Reset Demo”** button.

---

## ⚠️ Limitations

- **Pilot Prototype**: The current MVP utilizes seeded data for the Manali-Kullu Valley pilot corridor.
- **Simulated Advisories**: Travel and weather alerts are simulated for demonstration and do not reflect statutory government advisories.
- **Prototype Partner Verification**: Provider Trust Scores demonstrate platform workflows and do not constitute legal certification.
- **Decision Support**: RouteSathi is designed to assist travelers in making informed, proactive decisions but cannot guarantee travel safety or eliminate environmental hazards.
- **Future Production Requirements**: Full public deployment will require formal local partner onboarding, active human-in-the-loop data moderation, and integration with meteorological and transport department APIs.

---

## 🔮 Future Scope & Roadmap

- **Pan-India Expansion**: Scaled rollout across Goa coastal circuits, Western Ghats road trips, Ladakh high-altitude routes, and Char Dham pilgrimage corridors.
- **Offline Mesh Sync**: Peer-to-peer Bluetooth/mesh sync between travelers when cellular networks drop in mountain valleys.
- **Taxi Union Digital Gateways**: Verified dispatch integrations with local driver unions for fair-tariff emergency reroutes.
- **Multi-lingual Voice Interface**: Audio prompts in Hindi, Pahari, Punjabi, and English for local drivers and homestay hosts.

---

*RouteSathi • Built with passion for resilient travel across India.*
