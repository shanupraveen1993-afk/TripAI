import React, { useState } from 'react';
import { Search, MapPin, Home, History, User, Compass, LogOut, ChevronDown } from 'lucide-react';

export type MainSection = 'home' | 'history' | 'profile';

interface NavbarProps {
  section: MainSection;
  onSectionChange: (s: MainSection) => void;
  onLogout: () => void;
  userName: string;
  searchLocation: string;
  onSearchChange: (v: string) => void;
}

const NAV_ITEMS: { id: MainSection; label: string; icon: React.ReactNode }[] = [
  { id: 'home',    label: 'Home',    icon: <Home className="w-5 h-5" /> },
  { id: 'history', label: 'Trips',   icon: <History className="w-5 h-5" /> },
];

export function Navbar({ section, onSectionChange, onLogout, userName, searchLocation, onSearchChange }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={searchLocation}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search any destination…"
                className="w-full pl-9 pr-10 py-2.5 bg-bg-app border border-border rounded-xl text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-brand transition-colors"
              />
              {searchLocation && (
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-success" />
              )}
            </div>
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchLocation}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search any destination…"
              className="w-full pl-9 pr-4 py-2.5 bg-bg-app border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-soft transition-colors"
            />
          </div>
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
