import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import {
  ShieldCheck,
  Building,
  Clock,
  Send,
  Plus,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  Users,
} from 'lucide-react';
import { AlertCategory } from '../types';

export const PartnerDashboardPage: React.FC = () => {
  const { providers, addPartnerAlert, updateProviderAvailability, showToast } = useTrip();

  // Active Partner Mock Profile: PineNest Homestay (or toggleable)
  const [partnerId, setPartnerId] = useState<string>('pinenest-homestay');
  const partner = providers.find((p) => p.id === partnerId) || providers[0];

  const [availability, setAvailability] = useState<typeof partner.availability>(partner.availability);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  // Post Local Update Form State
  const [alertCategory, setAlertCategory] = useState<AlertCategory>('Activities');
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertLocation, setAlertLocation] = useState<string>(partner.location);
  const [alertDescription, setAlertDescription] = useState<string>('');
  const [alertExpiry, setAlertExpiry] = useState<string>('Today, 8:00 PM');

  const handleAvailabilityToggle = () => {
    const nextAvailability =
      availability === 'Available Today' ? 'Limited Slots' : 'Available Today';
    setAvailability(nextAvailability);
    updateProviderAvailability(partner.id, nextAvailability);
  };

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle || !alertDescription) return;

    addPartnerAlert({
      title: alertTitle,
      category: alertCategory as any,
      location: alertLocation,
      impact: alertDescription,
      validUntil: alertExpiry,
      source: partner.name,
    });

    setIsUpdateModalOpen(false);
    setAlertTitle('');
    setAlertDescription('');
  };

  const mockInquiries = [
    {
      id: 'inq-1',
      sender: 'Atharv & Group (4 Guests)',
      date: '10 mins ago',
      message: 'Hello! Checking if 2 double rooms are available for Day 1 and Day 2 of our 3-day trip?',
      status: 'New',
    },
    {
      id: 'inq-2',
      sender: 'Rahul K. (Family of 3)',
      date: '2 hours ago',
      message: 'Can you arrange local taxi pick-up from Mall Road bus stand upon arrival?',
      status: 'Responded',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0E7490] uppercase tracking-wider mb-1">
            <Building className="w-3.5 h-3.5" /> Partner Operations Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight">
            Local Partner Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your local readiness profile, respond to inquiries, and publish ground condition alerts.
          </p>
        </div>

        {/* Partner Switcher (for demo showcase) */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Switch Partner:</span>
          <select
            value={partnerId}
            onChange={(e) => {
              setPartnerId(e.target.value);
              const found = providers.find((p) => p.id === e.target.value);
              if (found) setAvailability(found.availability);
            }}
            className="bg-white border border-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
          >
            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={partner.coverImage}
              alt={partner.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{partner.name}</h2>
                <StatusBadge status={partner.verificationBadge} type="verification" size="sm" />
              </div>
              <p className="text-xs text-slate-500">
                {partner.category} • {partner.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAvailabilityToggle}
              className="text-xs"
            >
              Toggle: <strong>{availability}</strong>
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setIsUpdateModalOpen(true)}
              className="text-xs"
            >
              Post Local Update
            </Button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              RouteSathi Trust Score
            </span>
            <div className="text-2xl font-black text-[#0E7490] font-mono">
              {partner.trustScore}/100
            </div>
            <p className="text-[11px] text-slate-500">
              Verified local credentials & rapid response time.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Profile Completeness
            </span>
            <div className="text-2xl font-black text-emerald-700 font-mono">
              92%
            </div>
            <p className="text-[11px] text-slate-500">
              Contact info, photos, and tariffs all up to date.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Live Readiness Sync
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono">
              Active
            </div>
            <p className="text-[11px] text-slate-500">
              Linked to Atharv’s Manali traveler itinerary.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0E7490]" />
            <h3 className="font-bold text-slate-900 text-base">Recent Traveler Inquiries</h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {mockInquiries.length} Inquiries
          </span>
        </div>

        <div className="space-y-3">
          {mockInquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{inq.sender}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      inq.status === 'New'
                        ? 'bg-teal-100 text-teal-800 border border-teal-200'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
                <span className="text-slate-400 text-[11px]">{inq.date}</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                “{inq.message}”
              </p>
              <div className="pt-1 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs py-1 px-3"
                  onClick={() => showToast(`Replied to ${inq.sender}!`, 'success')}
                >
                  Quick Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Local Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Post Local Destination Advisory"
        maxWidth="lg"
      >
        <form onSubmit={handlePostUpdate} className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 leading-relaxed">
            <strong>Community Responsibility Notice:</strong> Updates submitted by local operators are instantly stamped with <span className="font-bold underline">“Pending Moderator Review”</span> before global broadcast to ensure verified information.
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">Advisory Category</label>
            <select
              value={alertCategory}
              onChange={(e) => setAlertCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
            >
              <option value="Activities">Activities & Ropeways</option>
              <option value="Weather">Weather Caution</option>
              <option value="Route & Transport">Route & Transport</option>
              <option value="Facilities">Local Facilities & Health</option>
              <option value="Local Experience">Special Cultural Event</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">Update Title</label>
            <input
              type="text"
              placeholder="e.g. Sudden snow flurries near Solang upper meadow"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">Specific Location</label>
              <input
                type="text"
                value={alertLocation}
                onChange={(e) => setAlertLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">Expected Expiry</label>
              <input
                type="text"
                value={alertExpiry}
                onChange={(e) => setAlertExpiry(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">Detailed Description & Impact</label>
            <textarea
              rows={3}
              placeholder="Explain what travelers should avoid or prepare for..."
              value={alertDescription}
              onChange={(e) => setAlertDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Submit for Review
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
