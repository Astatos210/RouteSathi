import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { ReadinessGauge } from '../components/readiness/ReadinessGauge';
import { ItineraryTimeline } from '../components/itinerary/ItineraryTimeline';
import { BudgetSummary } from '../components/itinerary/BudgetSummary';
import { ChecklistCard } from '../components/readiness/ChecklistCard';
import {
  Compass,
  Share2,
  Edit3,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ItineraryPage: React.FC = () => {
  const {
    preferences,
    itinerary,
    readiness,
    isDisruptionActive,
    isAlternateApplied,
    selectedProviderIds,
    providers,
    alerts,
    showToast,
  } = useTrip();

  const navigate = useNavigate();

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Trip itinerary link copied to clipboard!', 'success');
  };

  const selectedProviders = providers.filter((p) =>
    selectedProviderIds.includes(p.id)
  );

  const activeAlert = alerts.find((a) => a.id === 'solang-weather-alert');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <Link to="/" className="hover:text-slate-800">
              Home
            </Link>
            <span>/</span>
            <Link to="/plan" className="hover:text-slate-800">
              Trips
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Atharv’s Manali Adventure</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight">
              Atharv’s Manali Adventure
            </h1>
            <StatusBadge status={readiness.status} type="trip" />
            {isAlternateApplied && (
              <span className="text-xs font-bold text-teal-800 bg-teal-100 border border-teal-300 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Adapted Plan Active
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {preferences.duration} Days • {preferences.groupSize} Travelers • ₹
            {preferences.budgetPerPerson.toLocaleString()} per person • Transport: {preferences.transport}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link to="/plan">
            <Button variant="outline" size="sm" icon={<Edit3 className="w-3.5 h-3.5" />}>
              Edit Trip
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            icon={<Share2 className="w-3.5 h-3.5" />}
          >
            Share Trip
          </Button>
          <Link to="/trip/demo-trip/readiness">
            <Button
              variant="secondary"
              size="sm"
              icon={<ShieldCheck className="w-4 h-4" />}
            >
              View Readiness ({readiness.overall})
            </Button>
          </Link>
        </div>
      </div>

      {/* Prominent Readiness Dashboard Banner */}
      <div
        className={`rounded-3xl border p-6 transition-all duration-300 ${
          isDisruptionActive && !isAlternateApplied
            ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30'
            : isAlternateApplied
            ? 'bg-teal-50/50 border-teal-300'
            : 'bg-white border-slate-200/90 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <ReadinessGauge score={readiness.overall} status={readiness.status} size="md" />

          {/* Quick Pillars Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full lg:w-auto text-center border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Route</span>
              <span className="text-sm font-bold text-slate-800">
                {readiness.routeStatus >= 80 ? 'Good' : 'Caution'} ({readiness.routeStatus})
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Stay</span>
              <span className="text-sm font-bold text-emerald-700">Confirmed (100)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Provider Trust</span>
              <span className="text-sm font-bold text-slate-800">High ({readiness.providerTrust})</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${
              isDisruptionActive && !isAlternateApplied
                ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <span className="text-[10px] uppercase font-bold block">Alerts</span>
              <span className="text-sm font-bold">
                {isDisruptionActive && !isAlternateApplied ? '1 Active' : 'No Impact'} ({readiness.destinationUpdates})
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Completeness</span>
              <span className="text-sm font-bold text-slate-800">Good ({readiness.tripCompleteness})</span>
            </div>
          </div>
        </div>

        {/* Disruption Alert Callout if active */}
        {isDisruptionActive && !isAlternateApplied && (
          <div className="mt-5 p-4 rounded-2xl bg-amber-100 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">
                  Weather Alert Active: Solang Valley Outdoor Plan Affected
                </h4>
                <p className="text-xs text-amber-800">
                  Ropeways and high-altitude paragliding are temporarily suspended on Day 2 due to gusty winds.
                </p>
              </div>
            </div>
            <Link to="/trip/demo-trip/alternate-plan" className="shrink-0">
              <Button size="sm" variant="danger" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                View Recommended Alternative
              </Button>
            </Link>
          </div>
        )}

        {/* Adapted Plan Banner if applied */}
        {isAlternateApplied && (
          <div className="mt-5 p-4 rounded-2xl bg-teal-100 border border-teal-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#0E7490] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-teal-950 text-sm">
                  Adapted Plan Active: Naggar Castle & Artisan Trail
                </h4>
                <p className="text-xs text-teal-800">
                  Day 2 schedule successfully transitioned to weather-sheltered cultural experiences with verified guide Kullu Culture Walks.
                </p>
              </div>
            </div>
            <Link to="/trip/demo-trip/readiness" className="shrink-0">
              <Button size="sm" variant="teal">
                Verify Score Breakdown
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Main Layout: Left Itinerary Timeline + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Itinerary Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Day-Wise Itinerary</h2>
                <p className="text-xs text-slate-500">
                  Timed activities, locations, and real-time status
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {itinerary.reduce((acc, d) => acc + d.items.length, 0)} Total Stops
              </span>
            </div>

            <ItineraryTimeline itinerary={itinerary} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Check Readiness CTA Card */}
          <div className="bg-gradient-to-br from-[#0B1F33] to-[#163a5c] text-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Trip Readiness Portal
            </div>
            <h3 className="font-bold text-lg text-white">Is Your Trip Ready?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inspect all 5 transparent scoring factors, review your travel checklist, or simulate weather alerts for hackathon testing.
            </p>
            <Link to="/trip/demo-trip/readiness" className="block pt-1">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center bg-[#0E7490] hover:bg-[#0c627b]"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Check Travel Readiness
              </Button>
            </Link>
          </div>

          {/* Budget Summary Card */}
          <BudgetSummary />

          {/* Selected Trusted Providers */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 text-base">Selected Providers</h4>
                <p className="text-xs text-slate-500">
                  {selectedProviders.length} verified local operators
                </p>
              </div>
              <Link to="/explore" className="text-xs font-bold text-[#0E7490] hover:underline">
                Explore More
              </Link>
            </div>

            <div className="space-y-2.5 pt-1">
              {selectedProviders.map((provider) => (
                <Link
                  key={provider.id}
                  to={`/provider/${provider.id}`}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={provider.coverImage}
                      alt={provider.name}
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{provider.name}</h5>
                      <span className="text-[11px] text-slate-500">{provider.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#0E7490] block">
                      {provider.trustScore}/100
                    </span>
                    <span className="text-[10px] text-slate-400">Trust</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Travel Essentials Checklist */}
          <ChecklistCard />
        </div>
      </div>
    </div>
  );
};
