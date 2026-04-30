import React from 'react';
import { motion } from 'motion/react';
import { User, Star, Compass, LogOut, ChevronRight, Map, Bell } from 'lucide-react';
import { Button } from './ui/Button';

interface ProfileProps {
  user: { name: string; email: string; avatar?: string };
  tripCount: number;
  aiCount: number;
  onLogout: () => void;
}

function TravelBadge({ count }: { count: number }) {
  const badge = count >= 10 ? { label: 'Expert', color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-200' }
    : count >= 3  ? { label: 'Explorer', color: 'text-accent', bg: 'bg-accent-soft border-accent/20' }
    :               { label: 'Newbie', color: 'text-muted', bg: 'bg-bg-app border-border' };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${badge.bg} ${badge.color}`}>
      <Star className="w-3.5 h-3.5 fill-current" />
      {badge.label}
    </div>
  );
}

const MENU_ITEMS = [
  { icon: <Map className="w-4 h-4" />, label: 'Saved Places', desc: 'Your bookmarked destinations' },
  { icon: <Bell className="w-4 h-4" />, label: 'Notifications', desc: 'Trip reminders and updates' },
];

export function Profile({ user, tripCount, aiCount, onLogout }: ProfileProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="w-full px-4 sm:px-6 xl:px-[304px] py-6 pb-28 lg:pb-8 space-y-5">

      {/* User hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark rounded-2xl p-6 relative overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand/20 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full -ml-16 -mb-16 blur-2xl pointer-events-none" />

        <div className="relative flex items-center gap-4 mb-5">
          <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white text-xl font-display font-black shrink-0 overflow-hidden">
            {user.avatar
              ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              : initials}
          </div>
          <div>
            <h2 className="font-display font-black text-white text-lg">{user.name}</h2>
            <p className="text-xs text-white/50 mt-0.5">{user.email}</p>
            <div className="mt-2">
              <TravelBadge count={tripCount} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-2 gap-3">
          {[
            { label: 'Trips Saved', value: tripCount, color: 'text-brand' },
            { label: 'AI Queries', value: aiCount, color: 'text-accent' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className={`text-2xl font-display font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress to next badge */}
      {tripCount < 10 && (
        <div className="bg-surface border border-card-border rounded-xl p-4">
          <div className="flex justify-between text-xs font-bold text-muted mb-2">
            <span>Progress to {tripCount >= 3 ? 'Expert' : 'Explorer'}</span>
            <span className="text-brand">{tripCount}/{tripCount >= 3 ? 10 : 3} trips</span>
          </div>
          <div className="h-1.5 bg-bg-app rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((tripCount / (tripCount >= 3 ? 10 : 3)) * 100, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-brand rounded-full"
            />
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="bg-surface border border-card-border rounded-xl overflow-hidden">
        {MENU_ITEMS.map((item, i) => (
          <button
            key={item.label}
            className={[
              'w-full flex items-center gap-3 px-4 py-4 text-sm text-left hover:bg-bg-app transition-colors group',
              i > 0 ? 'border-t border-border' : '',
            ].join(' ')}
          >
            <div className="w-8 h-8 rounded-lg bg-bg-app border border-border flex items-center justify-center text-muted group-hover:text-brand group-hover:bg-brand-softer group-hover:border-brand-soft/30 transition-colors">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-sm text-heading">{item.label}</div>
              <div className="text-xs text-muted">{item.desc}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-brand transition-colors" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <Button variant="outline" fullWidth onClick={onLogout} icon={<LogOut className="w-4 h-4" />} className="border-danger/30 text-danger hover:bg-danger-soft hover:border-danger">
        Log Out
      </Button>

    </div>
  );
}
