import React from 'react';

function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-border-medium/60 rounded-lg shimmer ${className}`} />
  );
}

export function PlaceCardSkeleton() {
  return (
    <div className="bg-surface border border-card-border rounded-xl px-3 pt-2.5 pb-5 space-y-4">
      <SkeletonBlock className="h-40 w-full rounded-lg" />
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
      </div>
      <div className="flex gap-2">
        <SkeletonBlock className="h-5 w-12" />
        <SkeletonBlock className="h-5 w-16" />
      </div>
      <SkeletonBlock className="h-16 w-full rounded-lg" />
    </div>
  );
}

export function ItineraryItemSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <SkeletonBlock className="w-8 h-8 rounded-full" />
        <SkeletonBlock className="w-0.5 h-16 mt-1" />
      </div>
      <div className="flex-1 pb-6 space-y-2">
        <SkeletonBlock className="h-4 w-1/2" />
        <SkeletonBlock className="h-3 w-3/4" />
        <SkeletonBlock className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function TripCardSkeleton() {
  return (
    <div className="bg-surface border border-card-border rounded-xl p-4 flex gap-4">
      <SkeletonBlock className="w-12 h-12 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
      </div>
    </div>
  );
}
