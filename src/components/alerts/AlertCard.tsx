import React from 'react';
import { Link } from 'react-router-dom';
import { TravelAlert } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import {
  AlertTriangle,
  CloudSun,
  Route,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Info,
} from 'lucide-react';

interface AlertCardProps {
  alert: TravelAlert;
  onActionClick?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onActionClick }) => {
  const getCategoryIcon = () => {
    switch (alert.category) {
      case 'Weather':
        return <CloudSun className="w-4 h-4 text-amber-600" />;
      case 'Route & Transport':
        return <Route className="w-4 h-4 text-sky-600" />;
      case 'Local Experience':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'Activities':
        return <AlertTriangle className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  const isSevere = alert.severity === 'High' || alert.severity === 'Moderate';

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-200 ${
        alert.severity === 'High'
          ? 'bg-red-50/50 border-red-200 ring-1 ring-red-300/40'
          : alert.severity === 'Moderate'
          ? 'bg-amber-50/50 border-amber-200 ring-1 ring-amber-300/40'
          : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
      }`}
    >
      {/* Top Meta: Category, Severity, Verification */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-slate-100 border border-slate-200">
            {getCategoryIcon()}
          </span>
          <span className="text-xs font-semibold text-slate-700">{alert.category}</span>
          <span className="text-slate-300">•</span>
          <StatusBadge status={alert.severity} type="severity" size="sm" />
        </div>

        <StatusBadge status={alert.status} type="verification" size="sm" />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
        {alert.title}
      </h3>

      {/* Trip Impact Box */}
      <div
        className={`p-3 rounded-xl mb-3 text-xs leading-relaxed ${
          isSevere
            ? 'bg-amber-100/70 border border-amber-300/80 text-amber-900 font-medium'
            : 'bg-slate-50 border border-slate-200/80 text-slate-600'
        }`}
      >
        <span className="font-bold block mb-0.5">Trip Impact:</span>
        {alert.impact}
      </div>

      {/* Meta grid: Source, Location, Reported, Expiry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 mb-4 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            <strong className="text-slate-700">Location:</strong> {alert.location}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            <strong className="text-slate-700">Source:</strong> {alert.source} ({alert.sourceType})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            <strong className="text-slate-700">Reported:</strong> {alert.reportedAgo}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            <strong className="text-slate-700">Valid until:</strong> {alert.validUntil}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
        {alert.isSampleAdvisory ? (
          <span className="text-[11px] font-medium text-slate-400 italic">
            Sample advisory for prototype demonstration only.
          </span>
        ) : (
          <span className="text-[11px] text-teal-700 font-medium">
            Active sector monitor
          </span>
        )}

        {alert.actionRoute ? (
          <Link to={alert.actionRoute}>
            <Button
              size="sm"
              variant={alert.severity === 'Moderate' ? 'danger' : 'primary'}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="text-xs"
            >
              {alert.actionText || 'Take Action'}
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled={alert.actionText === 'No major change needed'}
            className="text-xs"
            onClick={onActionClick}
          >
            {alert.actionText || 'Acknowledge'}
          </Button>
        )}
      </div>
    </div>
  );
};
