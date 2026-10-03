import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  IndianRupee,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  MapPin,
  Compass,
  Building,
  Camera,
  Coffee,
  UserCheck,
} from 'lucide-react';

export const AlternatePlanPage: React.FC = () => {
  const { applyAlternatePlan, revertToOriginalPlan, isAlternateApplied } = useTrip();
  const navigate = useNavigate();

  const handleApply = () => {
    applyAlternatePlan();

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0E7490', '#15803D', '#38BDF8', '#F59E0B'],
      });
    } catch (e) {
      // Non-blocking if canvas isn't supported
    }

    navigate('/trip/demo-trip');
  };

  const handleKeepOriginal = () => {
    revertToOriginalPlan();
    navigate('/trip/demo-trip');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner & Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0E7490] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Smart Disruption-to-Alternative Planner
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F33] tracking-tight">
          “Your Day 2 can still be a great day.”
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Due to a moderator-verified weather update affecting your Solang Valley outdoor activity, RouteSathi has prepared a practical, weather-friendly alternative.
        </p>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Original Plan Card (Disrupted) */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 shadow-sm flex flex-col justify-between space-y-5 relative">
          <div className="absolute top-4 right-4">
            <StatusBadge status="Needs Review" type="item" />
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                Original Scheduled Plan
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Solang Valley Mountain Adventure
              </h2>
              <p className="text-xs text-slate-500">
                Outdoor alpine valley activities • High wind exposure
              </p>
            </div>

            {/* Alert Context Notice */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Weather Alert in Effect
              </div>
              <p className="leading-relaxed">
                45 km/h gusts and intermittent high-altitude drizzle. Solang ropeway operations and paragliding are temporarily on hold.
              </p>
            </div>

            {/* Itemized Original stops */}
            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3 opacity-75">
                <Compass className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-slate-800 block">
                    Solang Valley Outdoor Activity (Paragliding / Cable Car)
                  </span>
                  <span className="text-slate-500">Duration: 4 Hours • Cost: ~₹1,500</span>
                  <span className="text-[11px] text-amber-700 font-semibold block mt-0.5">
                    ⚠️ Affected by wind and rain hold
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3 opacity-75">
                <Coffee className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-slate-800 block">
                    Outdoor Valley-View Café Stop
                  </span>
                  <span className="text-slate-500">Duration: 1.5 Hours • Cost: ~₹400</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Outdoor lawn seating damp/uncomfortable
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3 opacity-75">
                <UserCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-slate-800 block">
                    Optional Solang Ridge Local Guide
                  </span>
                  <span className="text-slate-500">Duration: 2 Hours • Cost: ~₹300</span>
                </div>
              </div>
            </div>

            {/* Original Summary */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Estimated Cost: <strong>₹1,800–₹2,200 / person</strong></span>
              <span>Travel Time: <strong>30 mins</strong></span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full text-slate-600 hover:text-slate-900 border-slate-300"
            onClick={handleKeepOriginal}
          >
            Keep Original Plan (Take Risk)
          </Button>
        </div>

        {/* Recommended Alternate Plan Card (Resilient) */}
        <div className="bg-gradient-to-br from-white to-teal-50/40 rounded-3xl border-2 border-[#0E7490] p-6 shadow-md flex flex-col justify-between space-y-5 relative ring-4 ring-teal-500/10">
          <div className="absolute top-4 right-4">
            <span className="text-xs font-bold text-white bg-[#0E7490] px-3 py-1 rounded-full shadow-xs inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Recommended Alternative
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E7490] block">
                Weather-Sheltered Heritage Circuit
              </span>
              <h2 className="text-xl font-bold text-[#0B1F33] mt-1">
                Naggar Castle & Roerich Cultural Trail
              </h2>
              <p className="text-xs text-slate-500">
                Indoor stone courtyards, art galleries, artisan studios & heated cafés
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {['Weather-Friendly', 'Culture', 'Local Experience', 'Group-Friendly'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-[#0E7490] bg-teal-100/70 border border-teal-200 px-2.5 py-0.5 rounded-md"
                  >
                    ✓ {tag}
                  </span>
                )
              )}
            </div>

            {/* Itemized Recommended stops */}
            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-xl bg-white border border-teal-200/80 shadow-xs text-xs flex items-start gap-3">
                <Building className="w-4 h-4 text-[#0E7490] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block">
                    Naggar Castle (Kath-Kuni Architecture)
                  </span>
                  <span className="text-slate-500">15th-century stone & wood palace • Indoor balconies</span>
                </div>
                <span className="font-mono font-bold text-slate-700">₹150</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-teal-200/80 shadow-xs text-xs flex items-start gap-3">
                <Camera className="w-4 h-4 text-[#0E7490] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block">
                    Nicholas Roerich Art Gallery
                  </span>
                  <span className="text-slate-500">Covered mountain landscape museum & studio</span>
                </div>
                <span className="font-mono font-bold text-slate-700">₹100</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-teal-200/80 shadow-xs text-xs flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#0E7490] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block">
                    Local Artisan Woodcraft & Shawl Workshop
                  </span>
                  <span className="text-slate-500">Hands-on spinning & Kath-Kuni wood carving</span>
                </div>
                <span className="font-mono font-bold text-slate-700">₹200</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-teal-200/80 shadow-xs text-xs flex items-start gap-3">
                <Coffee className="w-4 h-4 text-[#0E7490] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block">
                    Woodstove Bakery & Heritage Café Stop
                  </span>
                  <span className="text-slate-500">Warm hearth seating with apple pie & herbal tea</span>
                </div>
                <span className="font-mono font-bold text-slate-700">₹350</span>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-teal-950 block">
                    Verified Guide: Kullu Culture Walks
                  </span>
                  <span className="text-teal-800">
                    Host: Meenakshi Sen • 93 Trust Score • Group accompaniment
                  </span>
                </div>
                <span className="font-mono font-bold text-teal-900">₹300</span>
              </div>
            </div>

            {/* Alternate Summary */}
            <div className="pt-3 border-t border-teal-200 flex items-center justify-between text-xs text-teal-900">
              <span>Estimated Cost: <strong>₹900–₹1,300 / person</strong></span>
              <span>Travel Time: <strong>45 mins (Smooth Highway)</strong></span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="w-full justify-center bg-[#0E7490] hover:bg-[#0c627b] text-white font-bold shadow-md"
            icon={<Sparkles className="w-4 h-4" />}
            onClick={handleApply}
          >
            Apply Alternate Plan (Restores Readiness to 84)
          </Button>
        </div>
      </div>

      {/* Rationale Section: "Why this works for your trip" */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Why this works for your trip
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">
              ✓ Matches Group Interests
            </span>
            <p>
              Directly fulfills the group’s requested Sightseeing, Culture, and Local Food preferences.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">
              ✓ Works Within ₹6,000 Budget
            </span>
            <p>
              Costing only ₹900–₹1,300/person, it saves ~₹800 per traveler compared to Solang paragliding.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">
              ✓ Trusted Local Provider
            </span>
            <p>
              Employs Kullu Culture Walks (Trust Score 93/100, verified permits, instant response).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">
              ✓ Weather-Sheltered Venues
            </span>
            <p>
              Castles, museums, and artisan workshops are protected from mountain winds and rain.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 sm:col-span-2">
            <span className="font-bold text-slate-900 block">
              ✓ Fits Day 2 Schedule
            </span>
            <p>
              Seamless 45-minute drive from Old Manali along NH-3 left bank; returns in time for evening café stops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
