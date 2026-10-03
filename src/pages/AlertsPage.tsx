import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { AlertCard } from '../components/alerts/AlertCard';
import { InteractiveMap } from '../components/alerts/InteractiveMap';
import { AlertCategory } from '../types';
import { Button } from '../components/common/Button';
import {
  Bell,
  Map,
  List,
  Filter,
  ShieldCheck,
  AlertTriangle,
  CloudSun,
  Route,
  Search,
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, isDisruptionActive } = useTrip();

  const [activeTab, setActiveTab] = useState<AlertCategory>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs: AlertCategory[] = [
    'All',
    'Route & Transport',
    'Weather',
    'Activities',
    'Facilities',
    'Safety Advisories',
  ];

  const filteredAlerts = alerts.filter((alert) => {
    const matchesTab =
      activeTab === 'All'
        ? true
        : activeTab === 'Safety Advisories'
        ? alert.severity === 'High' || alert.status === 'Demo Advisory'
        : alert.category.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]);

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.impact.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0E7490] uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5" /> Destination Sentinel
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight">
            Verified Travel & Weather Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Time-stamped, community & moderator validated advisories for the Manali-Kullu Valley
          </p>
        </div>

        {/* View Mode Toggle: List vs Map */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Corridor Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Disruption Alert Callout Banner if Active */}
      {isDisruptionActive && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Active Weather Caution Affecting Day 2 Solang Activity
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Solang Valley outdoor activity flagged: 45 km/h gusts & drizzle hold.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="danger"
            className="shrink-0 text-xs"
            onClick={() => window.location.assign('/trip/demo-trip/alternate-plan')}
          >
            Review Contingency
          </Button>
        </div>
      )}

      {/* Search and Tabs Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0B1F33] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by location or alert..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30 bg-white"
            />
          </div>
        </div>

        {/* View Rendering */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <InteractiveMap />
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-3">
                Corresponding Active Advisories ({filteredAlerts.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
            {filteredAlerts.length === 0 && (
              <div className="col-span-2 text-center py-12 text-slate-500 text-xs bg-white rounded-2xl border border-slate-200">
                No alerts matching your query in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
