import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { MapPin, AlertTriangle, CloudSun, ShieldCheck, Sparkles, Navigation, X } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

interface LocationPin {
  id: string;
  name: string;
  altitude: string;
  coords: { x: number; y: number }; // percentage 0-100
  type: 'valley' | 'town' | 'heritage' | 'pass';
  currentStatus: 'Normal' | 'Weather Caution' | 'Light Traffic' | 'Special Event';
  description: string;
  hasAlert?: boolean;
  alertId?: string;
}

const locations: LocationPin[] = [
  {
    id: 'rohtang',
    name: 'Rohtang Pass',
    altitude: '3,978 m',
    coords: { x: 26, y: 14 },
    type: 'pass',
    currentStatus: 'Weather Caution',
    description: 'High altitude mountain ridge connecting Kullu & Lahaul valleys.',
    hasAlert: true,
    alertId: 'rohtang-route-advisory',
  },
  {
    id: 'solang',
    name: 'Solang Valley',
    altitude: '2,560 m',
    coords: { x: 38, y: 30 },
    type: 'valley',
    currentStatus: 'Weather Caution',
    description: 'Adventure hub with paragliding, zorbing, and ropeways.',
    hasAlert: true,
    alertId: 'solang-weather-alert',
  },
  {
    id: 'old-manali',
    name: 'Old Manali & Hadimba',
    altitude: '2,050 m',
    coords: { x: 48, y: 50 },
    type: 'town',
    currentStatus: 'Normal',
    description: 'Cedar groves, Hadimba Devi temple, and riverside cafés.',
  },
  {
    id: 'mall-road',
    name: 'Central Mall Road',
    altitude: '2,000 m',
    coords: { x: 55, y: 62 },
    type: 'town',
    currentStatus: 'Light Traffic',
    description: 'Pedestrian shopping avenue and main taxi union hub.',
    hasAlert: true,
    alertId: 'mall-road-traffic',
  },
  {
    id: 'naggar',
    name: 'Naggar Castle & Roerich',
    altitude: '1,760 m',
    coords: { x: 74, y: 82 },
    type: 'heritage',
    currentStatus: 'Special Event',
    description: 'Ancient capital of Kullu, Kath-Kuni castle, and Roerich art estate.',
    hasAlert: true,
    alertId: 'naggar-cultural-event',
  },
];

export const InteractiveMap: React.FC = () => {
  const { isDisruptionActive } = useTrip();
  const [selectedPin, setSelectedPin] = useState<LocationPin | null>(locations[1]); // Solang default

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#0E7490]" />
            Interactive Manali Corridor Map
          </h3>
          <p className="text-xs text-slate-500">
            Real-time sector status across the Beas River valley corridor
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" /> Caution / Alert
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Cultural Event
          </span>
        </div>
      </div>

      {/* Illustrated Map Canvas */}
      <div className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 via-[#0e2a47] to-[#123952] border border-slate-800 shadow-inner select-none">
        {/* Mountain contour SVGs in background */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Mountain silhouettes */}
          <polygon points="0,180 80,60 160,180" fill="url(#snowGrad)" />
          <polygon points="120,200 240,40 360,200" fill="url(#snowGrad)" />
          <polygon points="300,220 440,70 560,220" fill="url(#snowGrad)" />
          <polygon points="500,200 640,50 780,200" fill="url(#snowGrad)" />
          {/* Beas River serpentine line */}
          <path
            d="M 120 20 Q 180 120 220 180 T 320 260 T 420 340 T 520 430"
            fill="transparent"
            stroke="#38BDF8"
            strokeWidth="4"
            strokeDasharray="6 4"
            opacity="0.4"
          />
        </svg>

        {/* River Label */}
        <div className="absolute bottom-6 left-1/3 transform -rotate-12 text-[10px] font-mono tracking-widest text-sky-400/40 uppercase pointer-events-none">
          ~ Beas River Valley Corridor ~
        </div>

        {/* Pins */}
        {locations.map((loc) => {
          const isSelected = selectedPin?.id === loc.id;
          const isWeatherAlert = loc.id === 'solang' && isDisruptionActive;

          return (
            <div
              key={loc.id}
              style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onClick={() => setSelectedPin(loc)}
            >
              {/* Outer pulsing ring for alerts */}
              {(loc.hasAlert || isWeatherAlert) && (
                <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
              )}

              {/* Pin bubble */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 group-hover:scale-110 ${
                  isSelected
                    ? 'bg-white text-slate-900 ring-2 ring-teal-400 font-bold'
                    : isWeatherAlert || loc.hasAlert
                    ? 'bg-amber-500 text-white border-amber-300 font-semibold'
                    : 'bg-slate-900/80 text-white border-slate-700 font-medium'
                }`}
              >
                {loc.hasAlert || isWeatherAlert ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                )}
                <span className="text-xs whitespace-nowrap">{loc.name}</span>
              </div>
            </div>
          );
        })}

        {/* Popup / Detail Drawer on Selected Pin */}
        {selectedPin && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-slate-200 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  {selectedPin.name}
                  <span className="text-[10px] text-slate-500 font-mono">
                    ({selectedPin.altitude})
                  </span>
                </h4>
                <span className="text-[11px] font-semibold text-[#0E7490]">
                  Status: {selectedPin.currentStatus}
                </span>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
              {selectedPin.description}
            </p>

            {selectedPin.id === 'solang' && isDisruptionActive && (
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs mb-2">
                <strong>Active Disruption:</strong> Weather alert affecting outdoor ropeways.
                <Link to="/trip/demo-trip/alternate-plan" className="block text-[#0E7490] font-bold underline mt-1">
                  View Recommended Alternative →
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
              <span>Coordinates: {selectedPin.coords.x}N, {selectedPin.coords.y}E</span>
              <span className="text-emerald-700 font-medium">Monitored</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
