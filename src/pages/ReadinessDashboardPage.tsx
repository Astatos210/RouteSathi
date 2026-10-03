import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { ReadinessGauge } from '../components/readiness/ReadinessGauge';
import { ReadinessFactorCard } from '../components/readiness/ReadinessFactorCard';
import { ChecklistCard } from '../components/readiness/ChecklistCard';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { AlertCard } from '../components/alerts/AlertCard';
import {
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Sliders,
  Calendar,
  Layers,
} from 'lucide-react';

export const ReadinessDashboardPage: React.FC = () => {
  const {
    readiness,
    isDisruptionActive,
    isAlternateApplied,
    triggerDisruption,
    applyAlternatePlan,
    revertToOriginalPlan,
    resetDemo,
    alerts,
  } = useTrip();

  const [calcExpanded, setCalcExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  const solangAlert = alerts.find((a) => a.id === 'solang-weather-alert') || alerts[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <Link to="/trip/demo-trip" className="hover:text-slate-800">
              Atharv’s Manali Adventure
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Travel Readiness Dashboard</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight">
              Is Your Trip Ready?
            </h1>
            <StatusBadge status={readiness.status} type="trip" />
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-world resilience inspection for Atharv’s 3-Day Manali Trip
          </p>
        </div>

        {/* Quick Nav back to itinerary */}
        <div className="flex items-center gap-2.5">
          <Link to="/trip/demo-trip">
            <Button variant="outline" size="sm" icon={<Calendar className="w-3.5 h-3.5" />}>
              Back to Itinerary
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Readiness Hero Banner */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
          isDisruptionActive && !isAlternateApplied
            ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30'
            : isAlternateApplied
            ? 'bg-teal-50/50 border-teal-300'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Gauge & Subtitle */}
          <div className="flex-1">
            <ReadinessGauge score={readiness.overall} status={readiness.status} size="lg" />

            <div className="mt-4 pt-4 border-t border-slate-200/80 text-sm font-medium">
              {!isDisruptionActive && !isAlternateApplied && (
                <p className="text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  “Your trip has the essentials in place. Check destination updates before departure.”
                </p>
              )}

              {isDisruptionActive && !isAlternateApplied && (
                <p className="text-amber-900 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  “Your Day 2 outdoor plan may be affected by a verified local weather update.”
                </p>
              )}

              {isAlternateApplied && (
                <p className="text-teal-900 font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />
                  “Your itinerary was adapted successfully using a weather-friendly local alternative.”
                </p>
              )}
            </div>
          </div>

          {/* Hackathon Interactive Simulation Controls */}
          <div className="w-full lg:w-80 bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Demo Control
              </span>
              <span className="text-[11px] font-mono text-slate-400">Prototype</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Test how RouteSathi handles live mountain disruptions in real-time:
            </p>

            {!isDisruptionActive && !isAlternateApplied && (
              <Button
                variant="danger"
                size="md"
                className="w-full justify-center shadow-md font-bold"
                icon={<AlertTriangle className="w-4 h-4" />}
                onClick={() => triggerDisruption()}
              >
                Simulate Travel Disruption
              </Button>
            )}

            {isDisruptionActive && !isAlternateApplied && (
              <div className="space-y-2">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-center font-bold bg-[#0E7490]"
                  icon={<Sparkles className="w-4 h-4" />}
                  onClick={() => navigate('/trip/demo-trip/alternate-plan')}
                >
                  View Recommended Alternate Plan
                </Button>
                <button
                  onClick={() => resetDemo()}
                  className="w-full text-center text-xs text-slate-400 hover:text-white pt-1 underline cursor-pointer"
                >
                  Reset Simulation
                </button>
              </div>
            )}

            {isAlternateApplied && (
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300">
                  ✓ Itinerary adapted with Kullu Culture Walks.
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-slate-200 border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs"
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                  onClick={() => revertToOriginalPlan()}
                >
                  Revert to Disrupted (62)
                </Button>
                <button
                  onClick={() => resetDemo()}
                  className="w-full text-center text-xs text-slate-400 hover:text-white pt-1 underline cursor-pointer"
                >
                  Reset Demo to Baseline (86)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Prominent Active Disruption Banner Card when active */}
        {isDisruptionActive && !isAlternateApplied && (
          <div className="mt-6 pt-6 border-t border-amber-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-100 border border-amber-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-base">
                    Weather Caution: Solang Valley Outdoor Activities
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    A moderator-verified weather alert reports 45 km/h gusts and intermittent rain in Solang Valley. Ropeways and paragliding are temporarily on hold.
                  </p>
                </div>
              </div>
              <Link to="/trip/demo-trip/alternate-plan" className="shrink-0">
                <Button
                  size="md"
                  variant="danger"
                  className="font-bold text-xs shadow-sm"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  View Recommended Alternate Plan
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 5 Transparent Readiness Factor Cards */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Readiness Factor Breakdown</h2>
          <p className="text-xs text-slate-500">
            Transparent rule-based scoring (20% weight per category). No opaque black-box AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReadinessFactorCard
            factorKey="routeStatus"
            title="Route Status"
            score={readiness.routeStatus}
            description={
              readiness.routeStatus < 80
                ? 'High-altitude Solang Valley road experiences localized slowdowns and wind holds.'
                : 'National Highway 3 and Manali-Naggar bypass are open with clear transit speeds.'
            }
            isDisrupted={readiness.routeStatus < 80}
          />

          <ReadinessFactorCard
            factorKey="stayBooking"
            title="Stay & Booking"
            score={readiness.stayBooking}
            description="PineNest Homestay (Old Manali) pre-selected with host inventory confirmed today."
          />

          <ReadinessFactorCard
            factorKey="providerTrust"
            title="Provider Trust"
            score={readiness.providerTrust}
            description="Selected partners hold verified local permits and Trust Scores ≥ 88/100."
          />

          <ReadinessFactorCard
            factorKey="destinationUpdates"
            title="Destination Updates"
            score={readiness.destinationUpdates}
            description={
              readiness.destinationUpdates < 60
                ? 'Active Moderate Weather Alert in Solang Valley impacting Day 2 outdoor activities.'
                : 'All sector advisories within normal parameters for planned tourist corridors.'
            }
            isDisrupted={readiness.destinationUpdates < 60}
          />

          <ReadinessFactorCard
            factorKey="tripCompleteness"
            title="Trip Completeness"
            score={readiness.tripCompleteness}
            description={
              isAlternateApplied
                ? 'All 3 days fully matched with verified weather-resilient activities & backup guide.'
                : 'Essential schedule filled; backup cultural contingency option recommended for Day 2.'
            }
          />
        </div>
      </div>

      {/* Essential Checklist & How It Is Calculated */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checklist */}
        <div className="lg:col-span-6 space-y-4">
          <ChecklistCard />
        </div>

        {/* Transparent Calculation Explainer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <button
              onClick={() => setCalcExpanded(!calcExpanded)}
              className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0E7490]" />
                <h3 className="font-bold text-slate-900 text-base">How is this calculated?</h3>
              </div>
              <span className="text-slate-400 hover:text-slate-600">
                {calcExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            <p className="text-xs text-slate-600 leading-relaxed">
              RouteSathi eliminates the risk of hallucinated travel plans by computing readiness strictly through 5 rule-based verification pillars:
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
              <div>
                <strong className="text-slate-900 block font-semibold">1. Route Status (20%):</strong>
                Assesses real-time corridor viability, road pass permits, and reported traffic bottlenecks between base town and day activity locations.
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">2. Stay & Booking Readiness (20%):</strong>
                Confirms reserved room nights, check-in responsiveness, and distance to starting points.
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">3. Provider Trust Signals (20%):</strong>
                Weighted average of commercial registration, peer feedback consistency, and active response time of chosen guides/drivers.
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">4. Active Destination Updates (20%):</strong>
                Directly penalizes plans when moderator-verified weather cautions or administrative advisories impact scheduled outdoor venues.
              </div>

              <div>
                <strong className="text-slate-900 block font-semibold">5. Trip Completeness & Contingency (20%):</strong>
                Evaluates emergency contact readiness, offline map caches, and whether a weather-friendly alternative has been staged.
              </div>
            </div>

            {calcExpanded && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-600 animate-in fade-in">
                <span className="font-bold text-slate-900 block">Transparent Scoring Matrix:</span>
                <div className="font-mono text-[11px] space-y-1 text-slate-700">
                  <div>• Initial Baseline: (92 + 100 + 88 + 82 + 76) / 5 = 85.6 ≈ 86 (Ready to Go)</div>
                  <div>• Solang Disrupted: (75 + 100 + 88 + 45 + 76) / 5 = 62.0 (Needs Attention)</div>
                  <div>• Adapted Plan: (88 + 100 + 91 + 82 + 84) / 5 = 85.0 ≈ 84 (Ready to Go)</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
