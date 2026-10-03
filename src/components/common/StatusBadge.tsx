import React from 'react';
import { ItemStatus, TripStatus, VerificationStatus, AlertSeverity } from '../../types';
import { CheckCircle2, AlertTriangle, AlertCircle, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: ItemStatus | TripStatus | VerificationStatus | AlertSeverity | string;
  type?: 'item' | 'trip' | 'verification' | 'severity';
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'item',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  // Item Status Badges
  if (type === 'item') {
    switch (status as ItemStatus) {
      case 'Confirmed':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses} ${className}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'Suggested':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Suggested
          </span>
        );
      case 'Needs Review':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-300 animate-pulse-subtle ${sizeClasses} ${className}`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Needs Review
          </span>
        );
      case 'Alternative Available':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-sky-50 text-sky-800 border border-sky-300 ${sizeClasses} ${className}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Alternative Available
          </span>
        );
      case 'Adapted Plan':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-teal-50 text-teal-800 border border-teal-300 shadow-xs ${sizeClasses} ${className}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Adapted Plan
          </span>
        );
      default:
        return (
          <span className={`inline-flex font-medium rounded-full bg-slate-100 text-slate-700 ${sizeClasses} ${className}`}>
            {status}
          </span>
        );
    }
  }

  // Trip Overall Status
  if (type === 'trip') {
    switch (status as TripStatus) {
      case 'Ready to Go':
        return (
          <span
            className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 ${sizeClasses} ${className}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Ready to Go
          </span>
        );
      case 'Needs Attention':
        return (
          <span
            className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-amber-100 text-amber-900 border border-amber-300 ${sizeClasses} ${className}`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Needs Attention
          </span>
        );
      default:
        return (
          <span
            className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-300 ${sizeClasses} ${className}`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            Action Required
          </span>
        );
    }
  }

  // Verification Badges
  if (type === 'verification') {
    switch (status as VerificationStatus) {
      case 'Moderator Verified':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200 ${sizeClasses} ${className}`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Moderator Verified
          </span>
        );
      case 'Community Confirmed':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses} ${className}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Community Confirmed
          </span>
        );
      case 'Local Partner Update':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-200 ${sizeClasses} ${className}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Local Partner Update
          </span>
        );
      case 'Pending Moderator Review':
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200 border-dashed ${sizeClasses} ${className}`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pending Moderator Review
          </span>
        );
      default:
        return (
          <span
            className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses} ${className}`}
          >
            {status}
          </span>
        );
    }
  }

  // Severity Badges
  if (type === 'severity') {
    switch (status as AlertSeverity) {
      case 'High':
        return (
          <span
            className={`inline-flex items-center gap-1 font-semibold rounded-md bg-red-100 text-red-800 border border-red-200 ${sizeClasses} ${className}`}
          >
            High Severity
          </span>
        );
      case 'Moderate':
        return (
          <span
            className={`inline-flex items-center gap-1 font-semibold rounded-md bg-amber-100 text-amber-800 border border-amber-200 ${sizeClasses} ${className}`}
          >
            Moderate Caution
          </span>
        );
      case 'Low':
        return (
          <span
            className={`inline-flex items-center gap-1 font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}
          >
            Low Impact
          </span>
        );
      default:
        return (
          <span
            className={`inline-flex items-center gap-1 font-semibold rounded-md bg-sky-100 text-sky-800 border border-sky-200 ${sizeClasses} ${className}`}
          >
            Informational
          </span>
        );
    }
  }

  return (
    <span className={`inline-flex font-medium rounded-full bg-slate-100 text-slate-700 ${sizeClasses} ${className}`}>
      {status}
    </span>
  );
};
