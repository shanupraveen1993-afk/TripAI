import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Route, ChevronRight, Sparkles } from 'lucide-react';
import { FullDayPlanOption } from '../api/client';

interface Props {
  city: string;
  plans: FullDayPlanOption[];
  onPick: (plan: FullDayPlanOption) => void;
  onBack: () => void;
}

const PLAN_ACCENTS: Record<string, { badge: string; bg: string; border: string; text: string }> = {
  A: { badge: 'bg-brand text-white',         bg: 'bg-brand-softer',   border: 'border-brand-medium',  text: 'text-brand' },
  B: { badge: 'bg-success text-white',       bg: 'bg-success-soft',   border: 'border-success-medium',text: 'text-success-strong' },
  C: { badge: 'bg-warning-strong text-white',bg: 'bg-warning-soft',   border: 'border-warning-medium',text: 'text-warning-strong' },
};

export function FullDayPlanPicker({ city, plans, onPick, onBack }: Props) {
  return (
    <div className="min-h-screen bg-bg-app">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface border-b border-border px-4 py-3 flex items-center gap-3">
        <button type="button" onClick={onBack} className="p-1.5 rounded-lg hover:bg-bg-app transition-colors">
          <ChevronRight className="w-4 h-4 text-muted rotate-180" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-heading leading-none">{city} — Full Day Plans</h1>
          <p className="text-xs text-muted mt-0.5">7:00 AM – 1:00 PM · Pick your style</p>
        </div>
        <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-brand">
          <Sparkles className="w-3.5 h-3.5" /> AI Generated
        </span>
      </div>

      {/* Intro strip */}
      <div className="px-4 pt-4 pb-2">
        <div className="rounded-xl p-3 border border-brand-medium bg-brand-softer flex items-start gap-2.5">
          <Route className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <p className="text-xs text-body leading-relaxed">
            <span className="font-bold text-heading">3 plans, real distances.</span>{' '}
            Gemini picked the best route for each. Distances are verified via Google Maps — pick the plan that fits your pace.
          </p>
        </div>
      </div>

      {/* Plan cards */}
      <div className="px-4 pb-8 space-y-4 pt-3">
        {plans.map((plan, i) => {
          const acc = PLAN_ACCENTS[plan.planId] ?? PLAN_ACCENTS.A;
          return (
            <motion.div
              key={plan.planId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border overflow-hidden shadow-sm ${acc.border}`}
            >
              {/* Card header */}
              <div className={`px-4 pt-4 pb-3 ${acc.bg}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full leading-none ${acc.badge}`}>
                      Plan {plan.planId}
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-heading leading-tight">{plan.name}</h2>
                      <p className={`text-xs font-medium mt-0.5 ${acc.text}`}>{plan.theme}</p>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="flex items-center gap-1 text-xs font-semibold text-body">
                    <MapPin className="w-3.5 h-3.5 text-muted" />
                    {plan.stopCount} places
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-body">
                    <Clock className="w-3.5 h-3.5 text-muted" />
                    {plan.estimatedHrs}
                  </span>
                  {plan.totalDistanceStr && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-body">
                      <Route className="w-3.5 h-3.5 text-muted" />
                      {plan.totalDistanceStr}
                    </span>
                  )}
                </div>
              </div>

              {/* Stop list */}
              <div className="bg-surface px-4 py-3 space-y-2">
                {plan.stops.map((stop, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex flex-col items-center pt-0.5">
                      <span className={`w-5 h-5 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${acc.badge}`}>
                        {idx + 1}
                      </span>
                      {idx < plan.stops.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1 mb-0.5" style={{ minHeight: 16 }} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-heading leading-snug">{stop.stop}</span>
                        <span className="text-xs text-muted shrink-0">{stop.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        {stop.duration && (
                          <span className="text-xs text-body">⏱ {stop.duration}</span>
                        )}
                        {stop.entryFee && (
                          <span className="text-xs text-body">· 🎟 {stop.entryFee}</span>
                        )}
                      </div>
                      {idx < plan.stops.length - 1 && stop.travelToNext && (
                        <span className="inline-flex items-center gap-1 mt-1 text-xs text-muted italic">
                          → {stop.travelToNext}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-4 pb-4 bg-surface">
                <button
                  type="button"
                  onClick={() => onPick(plan)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98]"
                  style={{ background: 'var(--color-brand)' }}
                >
                  Choose Plan {plan.planId}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
