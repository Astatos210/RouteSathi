import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Route,
  CloudSun,
  Users,
  Layers,
  MapPin,
  Calendar,
  IndianRupee,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { ReadinessGauge } from '../components/readiness/ReadinessGauge';
import { useTrip } from '../context/TripContext';

export const LandingPage: React.FC = () => {
  const { readiness, isDisruptionActive } = useTrip();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Subtle background mountain blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-50/50 via-slate-50/30 to-transparent -z-10 pointer-events-none rounded-b-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-[#0E7490] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Adaptive Travel Readiness MVP • Manali Pilot
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1F33] tracking-tight leading-[1.12]">
                Travel plans change. <br className="hidden sm:inline" />
                <span className="text-[#0E7490]">Your confidence shouldn’t.</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                RouteSathi helps travelers plan smarter, choose trusted local services, monitor trip readiness, and adapt when destination conditions change.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/plan" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full sm:w-auto text-base shadow-md"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    Plan My Trip
                  </Button>
                </Link>

                <Link to="/trip/demo-trip" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base"
                  >
                    See Demo Trip
                  </Button>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Rule-Based Readiness</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Local Operators</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4 text-emerald-600" />
                  <span>Weather-Adaptive Backups</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Polished Travel-Readiness Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 ring-1 ring-slate-900/5">
                {/* Header of Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0E7490]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Atharv’s Manali Adventure</h4>
                      <p className="text-[11px] text-slate-500">3 Days • 4 Friends • ₹6,000 / person</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0E7490] border border-teal-200">
                    Live Demo
                  </span>
                </div>

                {/* Score visualization */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                  <ReadinessGauge score={readiness.overall} status={readiness.status} size="sm" />
                </div>

                {/* Itinerary Preview */}
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Trip Schedule Preview</span>
                    <span className="text-[10px] text-slate-400">3 Sectors</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                        D1
                      </span>
                      <span className="font-medium text-slate-800">Mall Road & Hadimba Temple</span>
                    </div>
                    <StatusBadge status="Confirmed" type="item" size="sm" />
                  </div>

                  <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                    isDisruptionActive
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                        D2
                      </span>
                      <span className="font-medium">Solang Valley Outdoor Adventure</span>
                    </div>
                    <StatusBadge
                      status={isDisruptionActive ? 'Needs Review' : 'Suggested'}
                      type="item"
                      size="sm"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                        D3
                      </span>
                      <span className="font-medium text-slate-800">Naggar Castle & Heritage Walk</span>
                    </div>
                    <StatusBadge status="Suggested" type="item" size="sm" />
                  </div>
                </div>

                {/* Route & Alert visual element */}
                <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-900 font-medium">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Active Safety & Weather Sentinel</span>
                  </div>
                  <Link
                    to="/trip/demo-trip/readiness"
                    className="text-[#0E7490] hover:underline font-bold text-[11px] inline-flex items-center gap-1"
                  >
                    View Score Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
              The Reality of Ground Travel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              “A trip planned online can still fail on the ground.”
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Travelers currently juggle fragmented, disconnected tools that have no awareness of ground reality:
            </p>
          </div>

          {/* Disconnected apps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-8">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 block mb-1">ChatGPT</span>
              <p className="text-xs text-slate-200">Itinerary ideas without ground weather or closure reality</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 block mb-1">Google Maps</span>
              <p className="text-xs text-slate-200">Directions without hill pass permits or local landslide updates</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 block mb-1">Booking Apps</span>
              <p className="text-xs text-slate-200">Rooms confirmed, but isolated from daily route readiness</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 block mb-1">Social Media</span>
              <p className="text-xs text-slate-200">Scenic reels without crowd or seasonal safety notices</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 block mb-1">Random Calls</span>
              <p className="text-xs text-slate-200">Unreliable rumors and last-minute hotel/taxi panic</p>
            </div>
          </div>

          {/* The RouteSathi difference statement */}
          <div className="mt-8 p-5 rounded-2xl bg-[#0B1F33] border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base">
                RouteSathi Bridges the Planning-to-Execution Gap
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl">
                Instead of leaving you stranded when mountain winds blow or roads close, RouteSathi calculates a Travel Readiness Score and delivers verified, instant backup plans.
              </p>
            </div>
            <Link to="/plan" className="shrink-0">
              <Button size="sm" variant="secondary" className="text-xs whitespace-nowrap">
                Try Planner Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How RouteSathi Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0E7490]">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-[#0B1F33]">
            Adaptive Travel in 3 Simple Steps
          </h2>
          <p className="text-sm text-slate-600">
            From group preferences to resilient execution, RouteSathi stays by your side throughout the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B1F33] text-white font-bold flex items-center justify-center text-sm shadow-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Plan Your Trip</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your destination, duration, budget, and group interests. RouteSathi generates a realistic, budget-conscious day-wise itinerary linked to trusted local providers.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#0E7490] flex items-center gap-1">
              <span>Personalized for friends & groups</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E7490] text-white font-bold flex items-center justify-center text-sm shadow-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Check Travel Readiness</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our transparent scoring model verifies 5 factors: Route status, stay readiness, provider trust, destination updates, and trip completeness. You know your score before departure.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <span>Clear breakdown, no AI black box</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Adapt When Travel Changes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a verified disruption hits (such as bad weather in Solang Valley), RouteSathi alerts you and provides an instant practical alternative with verified local partners.
            </p>
            <div className="pt-2 text-xs font-semibold text-amber-700 flex items-center gap-1">
              <span>Instant 1-click schedule adaptation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0E7490]">
            Core Platform Pillars
          </span>
          <h2 className="text-3xl font-bold text-[#0B1F33]">
            What Makes RouteSathi Different
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0E7490]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">AI-Assisted Itinerary</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated day-wise schedules that reflect true mountain travel times, elevation curves, and budget limits rather than impossible generic AI checklists.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Travel Readiness Score</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A transparent 0–100 index rating route safety, booking certainty, destination updates, and provider credentials so you travel with genuine peace of mind.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Trusted Local Providers</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect directly with verified local homestays, hill-certified taxi drivers, and culture guides evaluated through transparent multi-factor Trust Scores.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <CloudSun className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Verified Destination Updates</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Time-stamped, moderator-verified local alerts for road slips, ropeway wind holds, or temple festival crowds. No unvetted WhatsApp rumors.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 sm:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <Route className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Smart Disruption-to-Alternative Planning</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The flagship innovation: When outdoor activities in Solang Valley get disrupted by sudden weather changes, RouteSathi automatically drafts a weather-friendly alternative (like the Naggar Castle cultural tour) and lets you swap it in 1 click.
            </p>
          </div>
        </div>
      </section>

      {/* Pilot Market Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-100 via-white to-teal-50/40 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7490] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" /> Pilot Market
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1F33]">
              Starting with Manali. Built to scale across India.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Himachal Pradesh’s high-altitude terrain is ideal for testing adaptive travel. Once perfected here, RouteSathi will expand across road trips, Western Ghats hill stations, coastal circuits, and spiritual pilgrimage corridors.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-medium">
                • Road Trips & Bikers
              </span>
              <span className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-medium">
                • Hill Stations
              </span>
              <span className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-medium">
                • Pilgrimage Routes
              </span>
              <span className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-medium">
                • Heritage & Rural Tourism
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link to="/plan" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full justify-center">
                Start Planning
              </Button>
            </Link>
            <Link to="/trip/demo-trip" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full justify-center">
                Launch Demo Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
