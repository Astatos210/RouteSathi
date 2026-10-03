import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from '../../types';
import { useTrip } from '../../context/TripContext';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Languages,
  Check,
  Plus,
  Eye,
  Bookmark,
  Sparkles,
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { selectedProviderIds, toggleSelectProvider, savedProviderIds, toggleSaveProvider } = useTrip();

  const isSelected = selectedProviderIds.includes(provider.id);
  const isSaved = savedProviderIds.includes(provider.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Cover Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={provider.coverImage}
          alt={provider.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <StatusBadge status={provider.verificationBadge} type="verification" size="sm" />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaveProvider(provider.id);
            }}
            className={`p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
            title={isSaved ? 'Bookmarked' : 'Bookmark Provider'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Bottom floating details */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-xs font-medium text-slate-200 block">{provider.category}</span>
            <div className="text-lg font-bold leading-tight drop-shadow-sm">{provider.priceDisplay}</div>
          </div>

          {/* Trust Score Pill */}
          <div className="bg-white/95 text-slate-900 px-2.5 py-1 rounded-xl shadow-md border border-white/50 flex items-center gap-1 font-mono font-bold text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E7490]" />
            <span>Trust: {provider.trustScore}/100</span>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0E7490] transition-colors">
              <Link to={`/provider/${provider.id}`}>{provider.name}</Link>
            </h3>
            <span className="shrink-0 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {provider.availability}
            </span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {provider.shortDescription}
          </p>
        </div>

        {/* Highlights / Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            <MapPin className="w-3 h-3 text-slate-400" />
            {provider.location}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            <Languages className="w-3 h-3 text-slate-400" />
            {provider.languages.join(', ')}
          </span>
          {provider.tags.slice(0, 1).map((t) => (
            <span key={t} className="text-[11px] text-[#0E7490] bg-teal-50 px-2 py-0.5 rounded border border-teal-100 font-medium">
              {t}
            </span>
          ))}
        </div>

        {/* Footer CTAs */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link to={`/provider/${provider.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs" icon={<Eye className="w-3.5 h-3.5" />}>
              View Details
            </Button>
          </Link>

          <Button
            size="sm"
            variant={isSelected ? 'teal' : 'primary'}
            className="text-xs"
            icon={isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            onClick={() => toggleSelectProvider(provider.id)}
          >
            {isSelected ? 'In Trip' : 'Add to Trip'}
          </Button>
        </div>
      </div>
    </div>
  );
};
