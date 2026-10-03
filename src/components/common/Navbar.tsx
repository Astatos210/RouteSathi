import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, ShieldCheck, AlertCircle, Menu, X, ArrowRight, Sliders, MapPin } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { readiness, demoMode, setDemoMode } = useTrip();

  const navLinks = [
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Explore', path: '/explore' },
    { label: 'Travel Alerts', path: '/alerts' },
    { label: 'Local Partners', path: '/explore?category=all' },
    { label: 'Partner Portal', path: '/partner' },
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) return false;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#0B1F33] text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-teal-400 font-medium text-[11px] bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/60">
              <MapPin className="w-3 h-3" /> Pilot: Manali, Himachal Pradesh
            </span>
            <span className="hidden sm:inline text-slate-400">
              Adaptive Travel Readiness MVP • Prototype Data
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDemoMode(!demoMode)}
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle Hackathon Demo Controls"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="font-semibold underline decoration-amber-400 underline-offset-2">
                {demoMode ? 'Demo Mode Active' : 'Enable Demo Mode'}
              </span>
            </button>
            <div className="h-3 w-px bg-slate-700 hidden sm:block" />
            <Link
              to="/trip/demo-trip/readiness"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white"
            >
              Readiness: <span className="text-white font-bold">{readiness.overall}/100</span> ({readiness.status})
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B1F33] to-[#0E7490] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-teal-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#0B1F33] flex items-center gap-1">
                Route<span className="text-[#0E7490]">Sathi</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                Adaptive Travel Readiness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#0E7490] ${
                  isActive(link.path)
                    ? 'text-[#0E7490] font-semibold'
                    : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/trip/demo-trip">
              <Button variant="outline" size="sm">
                View Demo Trip
              </Button>
            </Link>
            <Link to="/plan">
              <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Plan My Trip
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/trip/demo-trip">
              <Button variant="outline" size="sm" className="text-xs px-2.5">
                Demo
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0E7490]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link to="/trip/demo-trip" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                View Demo Trip (Atharv's 3-Day Manali)
              </Button>
            </Link>
            <Link to="/plan" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Plan My Trip
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
