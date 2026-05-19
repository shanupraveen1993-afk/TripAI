import React from 'react';

function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-border-medium/60 rounded-lg shimmer ${className}`} />
  );
}

export function PlaceCardSkeleton() {
  return (
    <div className="bg-surface border border-card-border rounded-xl overflow-hidden">
      {/* Photo banner */}
      <SkeletonBlock className="h-40 w-full rounded-none" />
      {/* Info rows */}
      <div className="px-5 py-5 space-y-2">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
        <div className="flex gap-2 pt-0.5">
          <SkeletonBlock className="h-5 w-12 rounded-full" />
          <SkeletonBlock className="h-5 w-16 rounded-full" />
        </div>
      </div>
      {/* CTA row */}
      <div className="flex gap-2 px-3 py-2.5">
        <SkeletonBlock className="h-9 w-16 rounded-lg" />
        <SkeletonBlock className="h-9 flex-1 rounded-lg" />
      </div>
      {/* Detailed Analysis row */}
      <div className="border-t border-border">
        <SkeletonBlock className="h-9 w-full rounded-none" />
      </div>
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
