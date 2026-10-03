import React from 'react';
import { Route, Hotel, ShieldCheck, CloudSun, CheckSquare, Info } from 'lucide-react';

interface ReadinessFactorCardProps {
  factorKey: 'routeStatus' | 'stayBooking' | 'providerTrust' | 'destinationUpdates' | 'tripCompleteness';
  title: string;
  score: number;
  description: string;
  isDisrupted?: boolean;
}

export const ReadinessFactorCard: React.FC<ReadinessFactorCardProps> = ({
  factorKey,
  title,
  score,
  description,
  isDisrupted = false,
}) => {
  const getIcon = () => {
    switch (factorKey) {
      case 'routeStatus':
        return <Route className="w-5 h-5 text-sky-600" />;
      case 'stayBooking':
        return <Hotel className="w-5 h-5 text-emerald-600" />;
      case 'providerTrust':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'destinationUpdates':
        return <CloudSun className="w-5 h-5 text-amber-600" />;
      case 'tripCompleteness':
        return <CheckSquare className="w-5 h-5 text-teal-600" />;
    }
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getProgressBarColor = () => {
    if (score >= 80) return 'bg-emerald-600';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 ${
        isDisrupted
          ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-400/30'
          : 'bg-white border-slate-200/80 shadow-xs hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            <span className="text-[11px] text-slate-500">Weight: 20%</span>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded-lg border font-mono font-bold text-sm ${getScoreColor()}`}>
          {score}/100
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${getProgressBarColor()}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};
