import React from 'react';
import { ShieldCheck, Award, ThumbsUp, Clock, CheckCircle2 } from 'lucide-react';

interface TrustScoreCardProps {
  score: number;
  providerName?: string;
  verificationBadge?: string;
  whyTrusted?: {
    identityVerified: boolean;
    recentlyActive: boolean;
    consistentFeedback: boolean;
    communityModerated: boolean;
    localBaseEstablished: boolean;
  };
  compact?: boolean;
}

export const TrustScoreCard: React.FC<TrustScoreCardProps> = ({
  score,
  providerName,
  verificationBadge = 'Verified',
  whyTrusted,
  compact = false,
}) => {
  const getBadgeColor = () => {
    if (score >= 90) return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    if (score >= 80) return 'bg-teal-50 text-teal-800 border-teal-300';
    return 'bg-amber-50 text-amber-800 border-amber-300';
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono font-bold text-xs ${getBadgeColor()}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-[#0E7490]" />
        <span>Trust Score: {score}/100</span>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-slate-900 text-base">RouteSathi Trust Score</h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-[#0E7490] border border-teal-200">
              {verificationBadge}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent signals based on local verification, response consistency, and peer reviews.
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-xl border text-center font-mono ${getBadgeColor()}`}>
          <div className="text-xl font-black">{score}</div>
          <div className="text-[10px] uppercase font-bold tracking-wider -mt-1 opacity-75">/ 100</div>
        </div>
      </div>

      {/* Trust criteria list */}
      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Local operational base established in Kullu/Manali valley</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Identity & commercial vehicle/guiding permits submitted</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Consistent positive feedback from college & family groups</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Active check-in and advisory response within 30 minutes</span>
        </div>
      </div>
    </div>
  );
};
