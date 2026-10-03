import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { TripStatus } from '../../types';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface ReadinessGaugeProps {
  score: number;
  status: TripStatus;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({
  score,
  status,
  size = 'md',
  showDetails = true,
}) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return { stroke: '#15803D', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (score >= 60) return { stroke: '#D97706', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { stroke: '#DC2626', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const color = getColor();
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeDimensions = {
    sm: { width: 90, height: 90, strokeWidth: 8, fontSize: 'text-xl' },
    md: { width: 120, height: 120, strokeWidth: 10, fontSize: 'text-3xl' },
    lg: { width: 150, height: 150, strokeWidth: 12, fontSize: 'text-4xl' },
  };

  const dim = sizeDimensions[size];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5">
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={dim.width}
          height={dim.height}
          viewBox="0 0 100 100"
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={dim.strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color.stroke}
            strokeWidth={dim.strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-black tracking-tight ${dim.fontSize} ${color.text}`}>
            {score}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider -mt-1">
            / 100
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="flex flex-col text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h3 className="text-lg font-bold text-slate-900">Travel Readiness Score</h3>
            <StatusBadge status={status} type="trip" />
          </div>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            {status === 'Ready to Go'
              ? 'Your stay, route, and selected services are currently in good shape with no blocking disruptions.'
              : 'A verified local weather alert affects your Day 2 Solang Valley schedule. Review recommendations to restore trip readiness.'}
          </p>
        </div>
      )}
    </div>
  );
};
