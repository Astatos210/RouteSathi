import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, AlertCircle, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1F33] text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0E7490] flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Route<span className="text-[#38BDF8]">Sathi</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              “Plan with confidence. Adapt when travel changes.” RouteSathi is an adaptive travel-readiness platform that turns static itineraries into verified, disruption-resilient journeys.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Pilot Destination: Manali & Kullu Valley, Himachal Pradesh</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/plan" className="hover:text-white transition-colors">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/trip/demo-trip" className="hover:text-white transition-colors">
                  Demo Trip (Atharv's 3-Day)
                </Link>
              </li>
              <li>
                <Link to="/trip/demo-trip/readiness" className="hover:text-white transition-colors">
                  Travel Readiness Score
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-white transition-colors">
                  Travel & Weather Alerts
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Verified Local Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Pilot and Disclaimers */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Hackathon MVP Note</h4>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 text-slate-400">
              <div className="flex items-start gap-1.5 text-amber-300 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Simulated Demo Data</span>
              </div>
              <p>
                All advisories, trust scores, and partner profiles are seeded for prototype demonstration. Not official government or emergency dispatches.
              </p>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                Built for Hackathon MVP Showcase • India Travel Tech
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} RouteSathi Platform. Designed to empower resilient travel across India.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for college groups and roadtrippers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
