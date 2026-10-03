import React from 'react';
import { Link } from 'react-router-dom';
import { ItineraryItemType } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  Compass,
  MapPin,
  Clock,
  IndianRupee,
  Utensils,
  Mountain,
  Sparkles,
  Camera,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../common/Button';

interface ItineraryItemProps {
  item: ItineraryItemType;
  isAffected?: boolean;
}

export const ItineraryItem: React.FC<ItineraryItemProps> = ({ item, isAffected = false }) => {
  const getCategoryIcon = () => {
    switch (item.category) {
      case 'Adventure':
        return <Mountain className="w-4 h-4 text-emerald-600" />;
      case 'Culture':
        return <Camera className="w-4 h-4 text-purple-600" />;
      case 'Food':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'Guide':
        return <UserCheck className="w-4 h-4 text-[#0E7490]" />;
      case 'Sightseeing':
      default:
        return <Compass className="w-4 h-4 text-sky-600" />;
    }
  };

  const isDisrupted = item.status === 'Needs Review' || isAffected;

  return (
    <div
      className={`relative p-4 rounded-xl border transition-all duration-200 ${
        item.status === 'Adapted Plan'
          ? 'bg-teal-50/40 border-teal-300 shadow-xs ring-1 ring-teal-400/20'
          : isDisrupted
          ? 'bg-amber-50/60 border-amber-300 shadow-sm ring-2 ring-amber-400/30'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
      }`}
    >
      {/* Top Header: Time + Category + Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-slate-100 border border-slate-200">
            {getCategoryIcon()}
          </span>
          <span className="text-xs font-semibold text-slate-500 font-mono">
            {item.time}
          </span>
          <span className="text-[11px] font-medium text-slate-400">• {item.category}</span>
        </div>

        <StatusBadge status={item.status} type="item" />
      </div>

      {/* Title & Description */}
      <div className="mb-3">
        <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
          {item.title}
          {item.status === 'Adapted Plan' && (
            <span className="text-[11px] font-semibold text-[#0E7490] bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#0E7490]" /> Weather-Friendly Alternative
            </span>
          )}
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
      </div>

      {/* Disruption Warning Box if Needs Review */}
      {isDisrupted && (
        <div className="mb-3 p-3 rounded-lg bg-amber-100/80 border border-amber-300 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Weather Alert Active:</span> High-altitude wind and rain caution in Solang Valley.
              <div className="text-amber-800 text-[11px]">
                Outdoor ropeways and paragliding are temporarily suspended.
              </div>
            </div>
          </div>
          <Link to="/trip/demo-trip/alternate-plan" className="shrink-0">
            <Button size="sm" variant="danger" className="text-xs py-1 px-3 shadow-xs">
              View Alternate Plan
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      )}

      {/* Note if Adapted */}
      {item.statusNote && (
        <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>{item.statusNote}</span>
        </div>
      )}

      {/* Footer details: Location, Duration, Cost, Provider */}
      <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-500">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {item.duration}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {item.providerName && item.providerId && (
            <Link
              to={`/provider/${item.providerId}`}
              className="text-[#0E7490] hover:underline font-medium inline-flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              {item.providerName}
            </Link>
          )}

          <span className="font-semibold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            ₹{item.estimatedCost} / person
          </span>
        </div>
      </div>
    </div>
  );
};
