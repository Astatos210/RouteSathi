import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { ProviderCard } from '../components/providers/ProviderCard';
import { Provider } from '../types';
import { Search, Filter, ShieldCheck, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ExplorePage: React.FC = () => {
  const { providers } = useTrip();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [weatherFriendlyOnly, setWeatherFriendlyOnly] = useState<boolean>(false);
  const [availableTodayOnly, setAvailableTodayOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'trust' | 'priceAsc' | 'priceDesc'>('trust');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Homestay',
    'Adventure Guide',
    'Culture / Local Guide',
    'Transport',
    'Food and Culture',
  ];

  const filteredProviders = providers
    .filter((provider) => {
      const matchesCategory =
        selectedCategory === 'All' || provider.category === selectedCategory;

      const matchesVerified =
        !verifiedOnly || provider.verificationBadge === 'Verified';

      const matchesWeatherFriendly =
        !weatherFriendlyOnly ||
        provider.tags.some((t) => t.toLowerCase().includes('weather'));

      const matchesAvailable =
        !availableTodayOnly || provider.availability === 'Available Today';

      const matchesSearch =
        searchQuery.trim() === '' ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesVerified &&
        matchesWeatherFriendly &&
        matchesAvailable &&
        matchesSearch
      );
    })
    .sort((a, b) => {
      if (sortBy === 'trust') return b.trustScore - a.trustScore;
      if (sortBy === 'priceAsc') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'priceDesc') return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0E7490] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified Local Ecosystem
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F33] tracking-tight">
          Explore Trusted Local Partners
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Directly partner with vetted homestays, hill-driving chauffeurs, cultural historians, and authentic culinary masters in Manali.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0B1F33] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {cat === 'All' ? 'All Services' : cat}
            </button>
          ))}
        </div>

        {/* Filter controls row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search providers, amenities, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E7490]/30"
            />
          </div>

          {/* Checkbox Toggles & Sorting */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded text-[#0E7490] border-slate-300"
              />
              <span className="text-slate-700 font-medium">Verified Only</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={weatherFriendlyOnly}
                onChange={(e) => setWeatherFriendlyOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded text-[#0E7490] border-slate-300"
              />
              <span className="text-slate-700 font-medium">Weather-Friendly</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={availableTodayOnly}
                onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded text-[#0E7490] border-slate-300"
              />
              <span className="text-slate-700 font-medium">Available Today</span>
            </label>

            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <span className="text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none"
              >
                <option value="trust">Highest Trust Score</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}

        {filteredProviders.length === 0 && (
          <div className="col-span-3 text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm space-y-3">
            <p>No local providers match your active filters.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('All');
                setVerifiedOnly(false);
                setWeatherFriendlyOnly(false);
                setAvailableTodayOnly(false);
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
