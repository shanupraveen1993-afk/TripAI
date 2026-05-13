import React from 'react';
import { Hotel, Utensils, Route, Compass } from 'lucide-react';

export type Tab = 'Hotels' | 'Food' | 'Itinerary' | 'Explore';

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  Hotels:    <Hotel   className="w-4 h-4" />,
  Food:      <Utensils className="w-4 h-4" />,
  Itinerary: <Route   className="w-4 h-4" />,
  Explore:   <Compass className="w-4 h-4" />,
};

export const TABS: Tab[] = ['Hotels', 'Food', 'Itinerary', 'Explore'];

// Per-tab active styles — mirrors Dashboard TAB_META accents exactly
const TAB_ACTIVE: Record<Tab, string> = {
  Hotels:    'bg-brand text-white shadow-sm',
  Food:      'bg-[#D97706] text-white shadow-sm',
  Itinerary: 'bg-[#7C3AED] text-white shadow-sm',
  Explore:   'bg-[#059669] text-white shadow-sm',
};

interface TabBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  className?: string;
}

export function TabBar({ active, onChange, className = '' }: TabBarProps) {
  return (
    <div className={`flex gap-1 bg-bg-app rounded-xl p-1 ${className}`}>
      {TABS.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={[
            'flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all duration-150',
            active === tab
              ? TAB_ACTIVE[tab]
              : 'text-muted hover:text-heading hover:bg-border/30',
          ].join(' ')}
        >
          {TAB_ICONS[tab]}
          <span>{tab}</span>
        </button>
      ))}
    </div>
  );
}
