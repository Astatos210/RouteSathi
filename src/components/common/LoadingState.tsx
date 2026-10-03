import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Analyzing trip readiness...',
  subMessage = 'Checking local weather, verified transport routes, and destination alerts in Manali',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center animate-bounce">
          <Compass className="w-8 h-8 text-[#0E7490] animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0B1F33] text-amber-400 flex items-center justify-center shadow-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-[#0B1F33] mb-2">{message}</h3>
      <p className="text-sm text-slate-500 max-w-md">{subMessage}</p>
      <div className="mt-6 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#0E7490] animate-ping" />
        <div className="w-2 h-2 rounded-full bg-[#0E7490] animate-ping" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-[#0E7490] animate-ping" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};
