import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

interface CityLockScreenProps {
  destination: string;
  onBack: () => void;
  onTryThanjavur: () => void;
}

export function CityLockScreen({ destination, onBack, onTryThanjavur }: CityLockScreenProps) {
  return (
    <div
      className="w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[92vh] px-5 py-12"
      style={{ background: 'linear-gradient(160deg,#06080F 0%,#0B0F1E 50%,#100816 100%)' }}
    >
      <style>{`
        @keyframes cl-ring  { 0%,100%{transform:scale(1);opacity:.18} 50%{transform:scale(1.08);opacity:.32} }
        @keyframes cl-ring2 { 0%,100%{transform:scale(1);opacity:.10} 50%{transform:scale(1.12);opacity:.22} }
        @keyframes cl-ring3 { 0%,100%{transform:scale(1);opacity:.06} 50%{transform:scale(1.18);opacity:.14} }
        @keyframes cl-scan  { 0%{top:-4px;opacity:0} 10%{opacity:.6} 90%{opacity:.2} 100%{top:100%;opacity:0} }
        @keyframes cl-float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes cl-dot   { 0%,100%{opacity:.15} 50%{opacity:.55} }
      `}</style>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors z-20"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.65)',
        }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(28,100,242,0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
      }} />

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-[2px] pointer-events-none z-10" style={{
        background: 'linear-gradient(90deg, transparent, rgba(28,100,242,0.5), transparent)',
        animation: 'cl-scan 4s ease-in-out infinite',
      }} />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(28,100,242,0.08), transparent 70%)', filter: 'blur(40px)',
      }} />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)', filter: 'blur(40px)',
      }} />

      {/* Concentric rings */}
      <div className="relative flex items-center justify-center mb-8" style={{ animation: 'cl-float 4s ease-in-out infinite' }}>
        <div className="absolute rounded-full" style={{ width: 200, height: 200, border: '1px solid rgba(28,100,242,0.20)', animation: 'cl-ring3 3.6s ease-in-out infinite 0.8s' }} />
        <div className="absolute rounded-full" style={{ width: 148, height: 148, border: '1px solid rgba(28,100,242,0.30)', animation: 'cl-ring2 3.6s ease-in-out infinite 0.4s' }} />
        <div className="absolute rounded-full" style={{ width: 104, height: 104, border: '2px solid rgba(28,100,242,0.40)', animation: 'cl-ring 3.6s ease-in-out infinite' }} />
        <div className="absolute w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle, rgba(28,100,242,0.35), transparent 70%)', filter: 'blur(12px)' }} />
      </div>

      {/* Notice card */}
      <div
        className="w-full max-w-xs text-center px-5 py-4 rounded-2xl mb-6"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
          We're live in{' '}
          <span className="font-semibold" style={{ color: 'var(--color-warning)' }}>Thanjavur</span>{' '}
          — every hotel, restaurant, and landmark AI-ranked and ready.{' '}
          <span className="font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{destination}</span>{' '}
          is on our roadmap. Try what's live now while we get there.
        </p>
      </div>

      {/* Made in India badge */}
      <div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-normal"
        style={{ background: 'rgba(250,202,21,0.10)', border: '1px solid rgba(250,202,21,0.30)', color: 'rgba(250,202,21,0.90)' }}
      >
        <span>🇮🇳</span>
        <span>#MadeInIndia · All Cities Coming Soon</span>
      </div>

      {/* CTA */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ boxShadow: '0 0 32px rgba(28,100,242,0.45), 0 0 8px rgba(28,100,242,0.3)' }}
        className="rounded-2xl"
      >
        <Button
          variant="brand"
          size="lg"
          icon={<Sparkles className="w-4 h-4" />}
          iconRight={<ChevronRight className="w-4 h-4" />}
          onClick={onTryThanjavur}
          className="rounded-2xl px-8"
        >
          Try Thanjavur
        </Button>
      </motion.div>

      {/* Pixel dots */}
      {[
        { top: '12%', left: '8%',  delay: '0s',   size: 3 },
        { top: '22%', left: '88%', delay: '0.8s', size: 2 },
        { top: '72%', left: '6%',  delay: '1.4s', size: 2 },
        { top: '80%', left: '90%', delay: '0.4s', size: 3 },
        { top: '45%', left: '4%',  delay: '2s',   size: 2 },
        { top: '55%', left: '94%', delay: '1.2s', size: 2 },
      ].map((d, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          top: d.top, left: d.left, width: d.size, height: d.size,
          background: 'var(--color-brand)', animation: `cl-dot 2.5s ease-in-out infinite ${d.delay}`,
        }} />
      ))}
    </div>
  );
}
