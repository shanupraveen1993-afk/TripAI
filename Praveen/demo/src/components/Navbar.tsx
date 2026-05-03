import React, { useState, useRef } from 'react';
import { Search, MapPin, Home, History, User, Compass, LogOut, ChevronDown, X } from 'lucide-react';
import { fetchAutocomplete, AutocompleteSuggestion } from '../api/client';

export type MainSection = 'home' | 'history' | 'profile';

interface NavbarProps {
  section: MainSection;
  onSectionChange: (s: MainSection) => void;
  onLogout: () => void;
  userName: string;
  searchLocation: string;
  onSearchChange: (v: string) => void;
  onLocationPick?: (display: string, area: string, lat?: number, lng?: number) => void;
}

const NAV_ITEMS: { id: MainSection; label: string; icon: React.ReactNode }[] = [
  { id: 'home',    label: 'Home',    icon: <Home className="w-5 h-5" /> },
  { id: 'history', label: 'Trips',   icon: <History className="w-5 h-5" /> },
];

function LocationSearch({ value, onChange, onPick }: {
  value: string;
  onChange: (v: string) => void;
  onPick?: (display: string, area: string) => void;
}) {
  const [focused,     setFocused]     = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (val: string) => {
    onChange(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchAutocomplete(val, 'Thanjavur').then(setSuggestions);
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handlePick = (s: AutocompleteSuggestion) => {
    const display = s.full || s.main;
    const area    = s.main || s.full;
    onChange(display);
    setSuggestions([]);
    setFocused(false);
    onPick?.(display, area);
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        placeholder="Search area in Thanjavur…"
        className="w-full pl-9 pr-8 py-2.5 bg-bg-app border border-border rounded-xl text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange(''); setSuggestions([]); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {/* Autocomplete dropdown */}
      {focused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={() => handlePick(s)}
              className="w-full text-left flex items-start gap-2.5 px-3 py-2.5 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <MapPin className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-heading truncate">{s.main || s.full}</p>
                {s.secondary && <p className="text-xs text-muted truncate">{s.secondary}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({ section, onSectionChange, onLogout, userName, searchLocation, onSearchChange, onLocationPick }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const handlePick = (display: string, area: string) => {
    onLocationPick?.(display, area);
  };

  return (
    <>
      {/* ── Top navbar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(249,250,251,0.88)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 1px 12px rgba(28,100,242,0.06)' }}>
        <div className="w-full px-4 sm:px-6 xl:px-[304px] h-14 flex items-center gap-4">

          {/* Brand */}
          <button
            onClick={() => onSectionChange('home')}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-black text-xl text-heading tracking-tight hidden sm:block">
              Trip<span className="text-brand">AI</span>
            </span>
          </button>

          {/* Search bar — center, desktop only */}
          <div className="flex-1 max-w-sm mx-auto hidden md:block">
            <LocationSearch
              value={searchLocation}
              onChange={onSearchChange}
              onPick={handlePick}
            />
          </div>

          {/* User menu */}
          <div className="ml-auto relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-border hover:bg-bg-app transition-colors"
            >
              <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-heading hidden sm:block max-w-24 truncate">
                {userName.split(' ')[0]}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => { onSectionChange('history'); setProfileOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-body hover:bg-bg-app transition-colors"
                >
                  <History className="w-4 h-4" /> Saved Trips
                </button>
                <button
                  onClick={() => { onSectionChange('profile'); setProfileOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-body hover:bg-bg-app transition-colors"
                >
                  <User className="w-4 h-4" /> My Profile
                </button>
                <div className="border-t border-border" />
                <button
                  onClick={() => { setProfileOpen(false); onLogout(); }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-danger hover:bg-danger-soft transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-3">
          <LocationSearch
            value={searchLocation}
            onChange={onSearchChange}
            onPick={handlePick}
          />
        </div>
      </header>

      {/* ── Bottom nav (mobile only) ─────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border safe-area-bottom">
        <div className="flex items-center h-16">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors',
                section === item.id ? 'text-brand' : 'text-muted hover:text-heading',
              ].join(' ')}
            >
              <span className={section === item.id ? '[&>svg]:stroke-[2.5]' : ''}>
                {item.icon}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
