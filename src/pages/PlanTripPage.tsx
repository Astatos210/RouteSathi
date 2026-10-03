import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { TripPreferences } from '../types';
import { Button } from '../components/common/Button';
import { LoadingState } from '../components/common/LoadingState';
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  IndianRupee,
  Car,
  CloudSun,
} from 'lucide-react';

export const PlanTripPage: React.FC = () => {
  const navigate = useNavigate();
  const { preferences, setPreferences, showToast } = useTrip();

  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form State initialized with defaults
  const [formData, setFormData] = useState<TripPreferences>({
    ...preferences,
    destination: 'Manali',
  });

  const availableInterests = [
    'Adventure',
    'Sightseeing',
    'Nature',
    'Local Food',
    'Culture',
    'Relaxation',
    'Photography',
  ];

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGenerate = () => {
    setIsLoading(true);
    setPreferences(formData);

    // Simulate AI generation with 1.8s timeout
    setTimeout(() => {
      setIsLoading(false);
      showToast('Personalized Manali itinerary & readiness score generated!', 'success');
      navigate('/trip/demo-trip');
    }, 1800);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <LoadingState
          message="Building your Manali itinerary…"
          subMessage="Analyzing trail weather, verifying local homestays & taxi unions, and assembling backup contingency routes"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0E7490] inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Adaptive Trip Planner
        </span>
        <h1 className="text-3xl font-black text-[#0B1F33] tracking-tight mt-1">
          Plan Your Manali Journey
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Tailor your 3-day itinerary with verified local partners and automated disruption preparedness.
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
        {[
          { num: 1, label: 'Trip Basics' },
          { num: 2, label: 'Preferences' },
          { num: 3, label: 'Review & Build' },
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step === s.num
                    ? 'bg-[#0B1F33] text-white shadow-sm'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span
                className={`text-[11px] font-medium ${
                  step === s.num ? 'text-slate-900 font-bold' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < 2 && (
              <div
                className={`flex-1 h-0.5 mx-3 -mt-4 transition-colors ${
                  step > idx + 1 ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Multi-Step Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* STEP 1: TRIP BASICS */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 1: Trip Basics</h2>
              <p className="text-xs text-slate-500">
                Where, when, and who is traveling with you to the mountains?
              </p>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Destination
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-[#0E7490] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.destination}
                  readOnly
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-[#0E7490] border border-teal-200">
                  Pilot Location
                </span>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Trip Duration
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[2, 3, 4].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setFormData({ ...formData, duration: days })}
                    className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.duration === days
                        ? 'border-[#0B1F33] bg-[#0B1F33] text-white shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block text-base font-bold">{days} Days</span>
                    <span className="text-[11px] opacity-75">
                      {days === 3 ? 'Standard (Recommended)' : `${days - 1} Nights`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Group Type & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Group Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Solo', 'Friends', 'Family'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, groupType: type })}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        formData.groupType === type
                          ? 'border-[#0E7490] bg-teal-50 text-[#0E7490]'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Number of Travelers
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.groupSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        groupSize: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
                  />
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    (e.g., Atharv + 3 friends)
                  </span>
                </div>
              </div>
            </div>

            {/* Date Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Tentative Start Date
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PREFERENCES */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2: Preferences & Style</h2>
              <p className="text-xs text-slate-500">
                Configure your budget, activity interests, transport, and resilience toggles.
              </p>
            </div>

            {/* Budget selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Budget Tier (Per Person)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { tier: 'Budget', cost: 4000, desc: 'Hostels & Local Busses' },
                  { tier: 'Moderate', cost: 6000, desc: 'Homestays & Taxis (Recommended)' },
                  { tier: 'Premium', cost: 10000, desc: 'Resorts & Chauffeur' },
                ].map((b) => (
                  <button
                    key={b.tier}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        budgetCategory: b.tier as any,
                        budgetPerPerson: b.cost,
                      })
                    }
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.budgetCategory === b.tier
                        ? 'border-[#0B1F33] bg-[#0B1F33] text-white shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block text-sm font-bold">{b.tier}</span>
                    <span className="block text-xs font-semibold text-emerald-300">
                      ₹{b.cost.toLocaleString()}
                    </span>
                    <span className="block text-[10px] opacity-75 mt-0.5">{b.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Interests & Experiences
              </label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => {
                  const isSelected = formData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0E7490] text-white border border-[#0E7490] shadow-xs'
                          : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {interest} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transport Preference */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Transport Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Self-drive', 'Taxi', 'Bus'] as const).map((trans) => (
                  <button
                    key={trans}
                    type="button"
                    onClick={() => setFormData({ ...formData, transport: trans })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.transport === trans
                        ? 'border-[#0E7490] bg-teal-50 text-[#0E7490]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>{trans}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RouteSathi Resilience Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Resilience & Safeguards
              </label>

              {/* Toggle 1 */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.prioritizeVerified}
                  onChange={(e) =>
                    setFormData({ ...formData, prioritizeVerified: e.target.checked })
                  }
                  className="mt-0.5 h-4 w-4 text-[#0E7490] rounded border-slate-300 focus:ring-[#0E7490]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Prioritize verified local services
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Matches with providers having Trust Score ≥ 85 (e.g. PineNest, Kullu Culture Walks).
                  </span>
                </div>
              </label>

              {/* Toggle 2 */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.weatherBackup}
                  onChange={(e) =>
                    setFormData({ ...formData, weatherBackup: e.target.checked })
                  }
                  className="mt-0.5 h-4 w-4 text-[#0E7490] rounded border-slate-300 focus:ring-[#0E7490]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Show weather-friendly backup options
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Pre-computes contingency plans if mountain activities encounter weather advisories.
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & GENERATE */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 3: Review & Generate</h2>
              <p className="text-xs text-slate-500">
                Verify your trip parameters before compiling the Travel Readiness Baseline.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                  Trip Destination & Duration
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {formData.destination} • {formData.duration} Days
                </p>
                <p className="text-slate-600">Start Date: {formData.startDate}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                  Travelers & Group Type
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {formData.groupSize} Travelers ({formData.groupType})
                </p>
                <p className="text-slate-600">Transport: {formData.transport}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                  Budget Target
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  ₹{formData.budgetPerPerson.toLocaleString()} / person
                </p>
                <p className="text-slate-600">
                  Total Group: ₹{(formData.budgetPerPerson * formData.groupSize).toLocaleString()}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                  Selected Interests
                </span>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {formData.interests.map((i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-teal-50 text-[#0E7490] font-semibold text-[10px] border border-teal-200"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Safeguards Summary */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Adaptive Safeguards Active:</strong> Verified providers prioritized with auto-contingency ready for Solang Valley.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form Nav Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
          {step > 1 ? (
            <Button
              variant="outline"
              size="md"
              onClick={handleBack}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              onClick={handleGenerate}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="bg-[#0E7490] hover:bg-[#0c627b] shadow-md font-bold"
            >
              Generate My Travel Plan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
