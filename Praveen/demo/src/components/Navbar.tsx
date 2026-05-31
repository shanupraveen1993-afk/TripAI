import React, { useState } from 'react';
import { MapPin, Home, History, User, Compass, LogOut, ChevronDown } from 'lucide-react';

export type MainSection = 'home' | 'history' | 'profile';

interface NavbarProps {
  section: MainSection;
  onSectionChange: (s: MainSection) => void;
  onLogout: () => void;
  userName: string;
  searchLocation: string;
  onSearchChange: (v: string) => void;
  onLocationPick?: (display: string, area: string, lat?: number, lng?: number) => void;
  showBack?: boolean;
  onBack?: () => void;
  backLabel?: string;
}

const NAV_ITEMS: { id: MainSection; label: string; icon: React.ReactNode }[] = [
  { id: 'home',    label: 'Home',    icon: <Home className="w-5 h-5" /> },
  { id: 'history', label: 'Trips',   icon: <History className="w-5 h-5" /> },
];

function CitySearch({ value, onChange, onPick }: {
  value: string;
  onChange: (v: string) => void;
  onPick?: (display: string, area: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);

  const handleFocus = () => {
    setDraft(value);
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed.toLowerCase() !== value.toLowerCase()) {
      onChange(trimmed);
      onPick?.(trimmed, trimmed);
    } else {
      setDraft(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setDraft(value);
      setEditing(false);
      e.currentTarget.blur();
    }
  };

  const isDirty     = editing && draft.trim().toLowerCase() !== value.toLowerCase();
  const isThanjavur = draft.trim().toLowerCase() === 'thanjavur';
  // Only warn after user has typed enough to clearly not be heading for Thanjavur (L-03)
  const showCityWarning = isDirty && !isThanjavur && draft.trim().length >= 4;

  /* ── Idle pill ──────────────────────────────────────────────── */
  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => { setDraft(value); setEditing(true); }}
        className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-bg-app hover:bg-brand-softer transition-all duration-150 group shrink-0"
      >
        <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
        <span className="text-sm font-semibold text-heading max-w-[120px] truncate">{value || 'Thanjavur'}</span>
        <ChevronDown className="w-3 h-3 text-muted group-hover:text-brand transition-colors shrink-0" />
      </button>
    );
  }

  /* ── Edit pill ──────────────────────────────────────────────── */
  return (
    <div className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-brand-softer ring-1 ring-brand-border shrink-0">
      <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
      <label htmlFor="city-search-input" className="sr-only">Search city</label>
      <input
        id="city-search-input"
        type="text"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder="City name…"
        className="bg-transparent text-base font-semibold text-heading outline-none min-w-0 w-28 sm:w-36"
      />
      {showCityWarning && (
        <span className="text-xs font-medium text-warning-strong whitespace-nowrap shrink-0">Thanjavur only</span>
      )}
    </div>
  );
}

export function Navbar({ section, onSectionChange, onLogout, userName, searchLocation, onSearchChange, onLocationPick, showBack, onBack, backLabel }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const handlePick = (display: string, area: string) => {
    onLocationPick?.(display, area);
  };

  return (
    <>
      {/* ── Skip to main content — keyboard / screen reader ──────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[1000] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand focus:text-white focus:font-semibold focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* ── Top navbar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-[200] border-b" style={{ background: 'rgba(249,250,251,0.88)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 1px 12px rgba(28,100,242,0.06)', paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="w-full max-w-[920px] mx-auto px-4 h-14 flex items-center gap-3">

          {/* Desktop: always logo — website standard */}
          <button
            onClick={() => onSectionChange('home')}
            aria-label="Go to home"
            className="hidden sm:flex items-center gap-2 shrink-0"
          >
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-heading tracking-tight">
              Trip<span className="text-brand">AI</span>
            </span>
          </button>

          {/* Mobile: always show logo — back is handled by ResultsView's breadcrumb */}
          <div className="sm:hidden">
            <button
              onClick={() => onSectionChange('home')}
              aria-label="Go to home"
              className="flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* City pill — right-aligned, before user menu */}
          <CitySearch
            value={searchLocation}
            onChange={onSearchChange}
            onPick={handlePick}
          />

          {/* User menu */}
          <div className="shrink-0 relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Open user menu"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-border hover:bg-bg-app transition-colors"
            >
              <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-heading hidden md:block max-w-24 truncate">
                {userName.split(' ')[0]}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform hidden md:block ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div role="menu" className="absolute right-0 top-full mt-2 w-44 bg-surface border border-border rounded-xl overflow-hidden z-[100]" style={{ boxShadow: 'var(--shadow-m)' }}>
                <button
                  role="menuitem"
                  onClick={() => { onSectionChange('history'); setProfileOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-body hover:bg-bg-app transition-colors"
                >
                  <History className="w-4 h-4" /> Saved Trips
                </button>
                <button
                  role="menuitem"
                  onClick={() => { onSectionChange('profile'); setProfileOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-body hover:bg-bg-app transition-colors"
                >
                  <User className="w-4 h-4" /> My Profile
                </button>
                <div className="border-t border-border" />
                <button
                  role="menuitem"
                  onClick={() => { setProfileOpen(false); onLogout(); }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-danger hover:bg-danger-soft transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>

      </header>

    </>
  );
}
