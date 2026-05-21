import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel, Utensils, Route, Compass, Trash2, ExternalLink, MapPin, Calendar, Users, Bookmark, History } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Tab } from './ui/Tabs';

export interface SavedTrip {
  id: string;
  tab: Tab;
  destination: string;
  startDate?: string;
  endDate?: string;
  numPeople?: number;
  budget?: number;
  savedAt: string;
  type: 'saved' | 'history';
  tags?: string[];
}

interface SavedTripsProps {
  trips: SavedTrip[];
  onDelete: (id: string) => void;
  onView: (trip: SavedTrip) => void;
}

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  Hotels:    <Hotel        className="w-5 h-5" />,
  Food:      <Utensils     className="w-5 h-5" />,
  Itinerary: <Route        className="w-5 h-5" />,
  Explore:   <Compass className="w-5 h-5" />,
};

const TAB_COLORS: Record<Tab, string> = {
  Hotels:    'bg-brand-softer text-brand border-brand-soft/30',
  Food:      'bg-brand-softer text-brand border-brand-medium',
  Itinerary: 'bg-brand-softer text-brand border-brand-medium',
  Explore:   'bg-brand-softer text-brand border-brand-medium',
};

function TripCard({ trip, onDelete, onView }: { trip: SavedTrip; onDelete: () => void; onView: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, height: 0 }}
      className="bg-surface border border-card-border rounded-xl p-4 flex gap-4 items-start hover:border-brand transition-colors group"
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center border shrink-0 ${TAB_COLORS[trip.tab]}`}>
        {TAB_ICONS[trip.tab]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-sm text-heading group-hover:text-brand transition-colors truncate-1">
              {trip.tab} · {trip.destination}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted flex-wrap">
              {trip.startDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {trip.startDate}
                  {trip.endDate && ` – ${trip.endDate}`}
                </span>
              )}
              {trip.numPeople && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {trip.numPeople} {trip.numPeople === 1 ? 'person' : 'people'}
                </span>
              )}
              {trip.budget && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> ₹{trip.budget.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-muted/60 mt-1">Saved {trip.savedAt}</p>
          </div>

          <div className="flex gap-1 shrink-0">
            <button
              onClick={onView}
              className="p-2 text-muted hover:text-brand hover:bg-brand-softer rounded-lg transition-colors"
              title="View plan"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-muted hover:text-danger hover:bg-danger-soft rounded-lg transition-colors"
              title="Delete trip"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-bg-app border border-border flex items-center justify-center">
        <Compass className="w-8 h-8 text-muted" />
      </div>
      <div>
        <h3 className="font-display font-bold text-sm text-heading mb-1">No saved trips yet</h3>
        <p className="text-sm text-muted max-w-xs">
          Search a destination and save your AI-generated plan to see it here.
        </p>
      </div>
    </div>
  );
}

type InnerTab = 'saved' | 'history';

export function SavedTrips({ trips, onDelete, onView }: SavedTripsProps) {
  const [deleteId, setDeleteId]   = useState<string | null>(null);
  const [innerTab, setInnerTab]   = useState<InnerTab>('saved');

  const confirmDelete = () => {
    if (deleteId) { onDelete(deleteId); setDeleteId(null); }
  };

  const filtered = trips.filter(t => t.type === innerTab);
  const savedCount   = trips.filter(t => t.type === 'saved').length;
  const historyCount = trips.filter(t => t.type === 'history').length;

  return (
    <div className="w-full px-4 sm:px-6 xl:px-[304px] py-6 pb-28 lg:pb-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl text-heading">Trips</h2>
      </div>

      {/* Inner tabs */}
      <div className="flex gap-1 bg-bg-app border border-border rounded-lg p-1 mb-5">
        {([
          { id: 'saved'   as InnerTab, label: 'Saved Plans', icon: <Bookmark className="w-3.5 h-3.5" />,  count: savedCount   },
          { id: 'history' as InnerTab, label: 'History',     icon: <History  className="w-3.5 h-3.5" />,  count: historyCount },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setInnerTab(tab.id)}
            className={[
              'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200',
              innerTab === tab.id
                ? 'bg-surface text-brand shadow-sm border border-card-border'
                : 'text-muted hover:text-heading',
            ].join(' ')}
          >
            {tab.icon}
            {tab.label}
            {tab.count > 0 && (
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${innerTab === tab.id ? 'bg-brand-softer text-brand' : 'bg-border text-muted'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-bg-app border border-border flex items-center justify-center">
            {innerTab === 'saved' ? <Bookmark className="w-7 h-7 text-muted" /> : <History className="w-7 h-7 text-muted" />}
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-heading mb-1">
              {innerTab === 'saved' ? 'Nothing saved yet.' : 'No searches yet.'}
            </h3>
            <p className="text-sm text-muted max-w-xs">
              {innerTab === 'saved'
                ? 'Run a search — if you like what AI finds, save it here.'
                : 'Your recent trips will show up here automatically.'}
            </p>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onView={() => onView(trip)}
                onDelete={() => setDeleteId(trip.id)}
              />
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Delete confirmation modal */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete this trip?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          This will permanently remove this entry. This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
