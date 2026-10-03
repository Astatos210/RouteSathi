import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sliders,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
} from 'lucide-react';
import { Button } from './Button';

export const DemoControlPanel: React.FC = () => {
  const {
    readiness,
    isDisruptionActive,
    isAlternateApplied,
    triggerDisruption,
    applyAlternatePlan,
    revertToOriginalPlan,
    resetDemo,
    demoMode,
    setDemoMode,
  } = useTrip();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  if (!demoMode) return null;

  return (
    <aside aria-label="Hackathon Demo Controller" className="fixed bottom-4 left-4 z-40 max-w-sm sm:max-w-md w-full pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#0B1F33]/20 shadow-2xl overflow-hidden transition-all duration-300">
        {/* Header bar */}
        <div className="bg-[#0B1F33] text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              Hackathon Judge Demo Bar
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                readiness.status === 'Ready to Go'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              Score: {readiness.overall}/100
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-300 hover:text-white p-1 rounded transition-colors cursor-pointer"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="p-3.5 space-y-3 text-xs bg-slate-50/80">
            {/* Step indicators */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div
                className={`p-1.5 rounded-lg border text-[11px] font-medium ${
                  !isDisruptionActive && !isAlternateApplied
                    ? 'bg-white border-[#0E7490] text-[#0E7490] font-bold shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}
              >
                1. Initial (86)
              </div>
              <div
                className={`p-1.5 rounded-lg border text-[11px] font-medium ${
                  isDisruptionActive && !isAlternateApplied
                    ? 'bg-amber-50 border-amber-500 text-amber-800 font-bold shadow-xs animate-pulse-subtle'
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}
              >
                2. Disrupted (62)
              </div>
              <div
                className={`p-1.5 rounded-lg border text-[11px] font-medium ${
                  isAlternateApplied
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}
              >
                3. Adapted (84)
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {!isDisruptionActive && !isAlternateApplied && (
                <Button
                  size="sm"
                  variant="danger"
                  className="flex-1 text-xs"
                  icon={<AlertTriangle className="w-3.5 h-3.5" />}
                  onClick={() => {
                    triggerDisruption();
                    if (!location.pathname.includes('/trip/demo-trip/readiness')) {
                      navigate('/trip/demo-trip/readiness');
                    }
                  }}
                >
                  Simulate Disruption (62)
                </Button>
              )}

              {isDisruptionActive && !isAlternateApplied && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex-1 text-xs"
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={() => {
                    navigate('/trip/demo-trip/alternate-plan');
                  }}
                >
                  View Alternate Plan
                </Button>
              )}

              {isDisruptionActive && !isAlternateApplied && (
                <Button
                  size="sm"
                  variant="primary"
                  className="text-xs bg-emerald-700 hover:bg-emerald-800"
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={() => {
                    applyAlternatePlan();
                    navigate('/trip/demo-trip');
                  }}
                >
                  Instant Apply (84)
                </Button>
              )}

              {isAlternateApplied && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs"
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                  onClick={() => revertToOriginalPlan()}
                >
                  Revert to Disrupted (62)
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                className="text-xs text-slate-600 hover:text-slate-900"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={() => resetDemo()}
                title="Reset demo to initial 86 state"
              >
                Reset Demo
              </Button>
            </div>

            {/* Quick Nav Links for Judge Convenience */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">Quick Jump:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/trip/demo-trip')}
                  className="hover:text-[#0E7490] hover:underline cursor-pointer"
                >
                  Itinerary
                </button>
                <span>•</span>
                <button
                  onClick={() => navigate('/trip/demo-trip/readiness')}
                  className="hover:text-[#0E7490] hover:underline cursor-pointer"
                >
                  Readiness
                </button>
                <span>•</span>
                <button
                  onClick={() => navigate('/alerts')}
                  className="hover:text-[#0E7490] hover:underline cursor-pointer"
                >
                  Alerts
                </button>
                <span>•</span>
                <button
                  onClick={() => navigate('/explore')}
                  className="hover:text-[#0E7490] hover:underline cursor-pointer"
                >
                  Partners
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
