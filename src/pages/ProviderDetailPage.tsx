import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { TrustScoreCard } from '../components/readiness/TrustScoreCard';
import { Modal } from '../components/common/Modal';
import {
  MapPin,
  Clock,
  Languages,
  CheckCircle2,
  ShieldCheck,
  Star,
  Plus,
  Check,
  Send,
  ArrowLeft,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';

export const ProviderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { providers, selectedProviderIds, toggleSelectProvider, showToast } = useTrip();

  const provider = providers.find((p) => p.id === id) || providers[0];
  const isSelected = selectedProviderIds.includes(provider.id);

  // Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [inquiryMessage, setInquiryMessage] = useState<string>(
    'Hi! We are 4 friends visiting Manali for 3 days. Are you available for Day 2?'
  );

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryModalOpen(false);
    showToast(`Inquiry sent to ${provider.name}! Mock response simulated under 15 mins.`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Local Services
      </button>

      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[320px] flex flex-col justify-end p-6 sm:p-8 shadow-xl">
        <img
          src={provider.coverImage}
          alt={provider.name}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/60 to-transparent" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-300 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-700/60">
                {provider.category}
              </span>
              <StatusBadge status={provider.verificationBadge} type="verification" size="sm" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {provider.availability}
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {provider.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {provider.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-700/60 text-xs">
            <div className="flex items-center gap-4 flex-wrap text-slate-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {provider.location}
              </span>
              <span className="flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-teal-400" />
                {provider.languages.join(', ')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                Response: {provider.responseTime || 'Under 30 mins'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white font-mono">
                {provider.priceDisplay}
              </span>
              <Button
                variant={isSelected ? 'teal' : 'primary'}
                size="sm"
                icon={isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                onClick={() => toggleSelectProvider(provider.id)}
              >
                {isSelected ? 'Included in Trip' : 'Add to Trip'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Left Details + Right Trust Score & Inquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Overview, Included Services, Traveler Feedback */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-lg">Partner Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {provider.fullOverview}
            </p>

            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Highlights & Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {provider.amenitiesOrHighlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-slate-700 font-medium"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Included Services */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-lg">What’s Included in Service</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {provider.includedServices.map((service) => (
                <div key={service} className="flex items-center gap-2 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Traveler Feedback */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Traveler Reviews</h3>
              <span className="text-xs font-semibold text-slate-500">
                {provider.sampleFeedback.length} Verified Reviews
              </span>
            </div>

            <div className="space-y-3">
              {provider.sampleFeedback.map((fb, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{fb.author}</span>
                    <span className="text-slate-400">{fb.date}</span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">“{fb.comment}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: "Why RouteSathi trusts this provider" & Action Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold block">Pricing</span>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {provider.priceDisplay}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Button
                variant={isSelected ? 'teal' : 'primary'}
                size="md"
                className="w-full justify-center text-sm font-bold"
                icon={isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                onClick={() => toggleSelectProvider(provider.id)}
              >
                {isSelected ? 'Remove from Trip' : 'Add to Trip'}
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full justify-center text-xs"
                icon={<Send className="w-3.5 h-3.5" />}
                onClick={() => setInquiryModalOpen(true)}
              >
                Send Direct Inquiry
              </Button>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{provider.recentActivity}</span>
            </div>
          </div>

          {/* "Why RouteSathi trusts this provider" Section */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Why RouteSathi Trusts This Provider
              </h3>
            </div>

            <div className="text-xs text-slate-500">
              Verified through our prototype 5-point local provider criteria:
            </div>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Identity & business details submitted:</strong> Operator registration verified locally.
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Recently active:</strong> Confirmed operational status within last 24 hours.
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Recent traveler feedback:</strong> Consistent 4.5+ star peer ratings from verified guests.
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Good response consistency:</strong> Average inquiry response time under 30 minutes.
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Community & moderator validation:</strong> Active in local Kullu tourist safety guidelines.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 italic">
              * Note: Prototype verification workflow. Does not claim government or statutory certification.
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <Modal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        title={`Send Inquiry to ${provider.name}`}
      >
        <form onSubmit={handleSendInquiry} className="space-y-4">
          <div className="text-xs text-slate-600">
            Submit a message directly to <strong>{provider.name}</strong>. In our prototype system, inquiries receive automated mock acknowledgment.
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Your Message</label>
            <textarea
              rows={4}
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setInquiryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Send Inquiry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
