import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Compass, ArrowRight, MapPin } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface AuthFormProps {
  onSuccess: (user: { name: string; email: string; avatar?: string }) => void;
  onBack?: () => void;
  asModal?: boolean;
}

/* Google "G" logo — official colours */
function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

/* City destinations for the animated background slider */
const LOGIN_CITIES = [
  { city: 'Thanjavur',  subtitle: 'Brihadeeswarar Temple',  imgId: '1587474260584-136574528ed5', gradient: 'from-orange-900 via-amber-800 to-yellow-700' },
  { city: 'Goa',        subtitle: 'Calangute Beach',         imgId: '1512343879784-a960bf40e7f2', gradient: 'from-teal-900 via-cyan-800 to-sky-700' },
  { city: 'Jaipur',     subtitle: 'Hawa Mahal, Pink City',   imgId: '1477587458883-47145ed94245', gradient: 'from-pink-900 via-rose-800 to-pink-700' },
  { city: 'Udaipur',    subtitle: 'Lake Pichola Palace',     imgId: '1622018135960-249abd263aeb', gradient: 'from-violet-900 via-purple-800 to-fuchsia-700' },
  { city: 'Bangalore',  subtitle: 'Garden City',             imgId: '1708782462555-b3af03b4b3d2', gradient: 'from-slate-900 via-slate-800 to-blue-900' },
  { city: 'Mumbai',     subtitle: 'The City of Dreams',      imgId: '1598434192043-71111c1b3f41', gradient: 'from-indigo-900 via-blue-800 to-sky-800' },
  { city: 'Hyderabad',  subtitle: 'Charminar & Biryani',     imgId: '1657981630164-769503f3a9a8', gradient: 'from-amber-900 via-yellow-800 to-orange-700' },
  { city: 'Kolkata',    subtitle: 'City of Joy',             imgId: '1558618666-fcd25c85cd64', gradient: 'from-indigo-900 via-blue-800 to-indigo-700' },
];

const uImg = (id: string, w = 1200, h = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

function CityBackground({ active }: { active: number }) {
  const prefersReducedMotion = useReducedMotion();
  const d = LOGIN_CITIES[active];
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={active}
        className="absolute inset-0"
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.9, ease: 'easeInOut' }}
      >
        <img
          src={uImg(d.imgId)}
          alt={d.city}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${d.gradient} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </motion.div>
    </AnimatePresence>
  );
}

function CityNameSlider({ active }: { active: number }) {
  const prefersReducedMotion = useReducedMotion();
  const d = LOGIN_CITIES[active];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="flex items-center gap-1.5"
      >
        <MapPin className="w-3.5 h-3.5 text-white/70 shrink-0" />
        <span className="text-sm font-bold text-white">{d.city}</span>
        <span className="text-xs text-white/60">· {d.subtitle}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export function AuthForm({ onSuccess, onBack, asModal = false }: AuthFormProps) {
  const [name, setName]           = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading]     = useState(false);
  const [heroActive, setHeroActive] = useState(0);

  useEffect(() => {
    if (asModal) return;
    const id = setInterval(
      () => setHeroActive(i => (i + 1) % LOGIN_CITIES.length),
      4000,
    );
    return () => clearInterval(id);
  }, [asModal]);

  const handleGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Please enter your name to continue');
      return;
    }
    setNameError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onSuccess({ name: name.trim(), email: 'demo@gmail.com' });
  };

  /* ── Modal variant — unchanged compact form ── */
  if (asModal) {
    return (
      <div className="p-1 w-full max-w-sm mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="google-auth"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-display font-bold text-heading mb-1">Welcome to TripAI</h1>
              <p className="text-sm text-muted">Plan smarter trips with real Google data + AI</p>
            </div>
            <form onSubmit={handleGoogleSignIn} className="space-y-4">
              <Input
                label="Your name"
                type="text"
                placeholder="e.g. Praveen"
                value={name}
                autoFocus
                onChange={e => { setName(e.target.value); setNameError(''); }}
                error={nameError}
              />
              <Button
                type="submit"
                variant="brand"
                fullWidth
                loading={loading}
                icon={!loading ? <GoogleLogo /> : undefined}
                iconRight={!loading ? <ArrowRight className="w-3.5 h-3.5" /> : undefined}
                className="justify-between"
              >
                {loading ? 'Signing in…' : 'Continue with Google'}
              </Button>
            </form>
            <p className="mt-4 text-xs text-center text-muted">By continuing you agree to our Terms of Service</p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  /* ── Full-page variant — immersive city slider design ── */
  return (
    <div className="relative min-h-dvh overflow-hidden flex flex-col">

      {/* ── Animated city photo background ── */}
      <div className="absolute inset-0">
        <CityBackground active={heroActive} />
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex flex-col min-h-dvh">

        {/* Top: Brand header */}
        <div className="px-6 pt-10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/25">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-2xl text-white tracking-tight">
              Trip<span className="text-brand-soft">AI</span>
            </span>
          </div>
        </div>

        {/* Middle: hero city caption */}
        <div className="flex-1 flex flex-col justify-end px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
              AI-planned trips for
            </p>
            <CityNameSlider active={heroActive} />

            {/* City dot indicators */}
            <div className="flex gap-1.5 mt-4">
              {LOGIN_CITIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHeroActive(i)}
                  className="transition-all duration-300"
                  aria-label={LOGIN_CITIES[i].city}
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:  i === heroActive ? 20 : 6,
                      height: 6,
                      background: i === heroActive ? 'white' : 'rgba(255,255,255,0.35)',
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Login card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
          >
            <div className="mb-5">
              <h1 className="text-xl font-display font-bold text-heading mb-1">
                Start planning your trip
              </h1>
              <p className="text-sm text-muted">
                Real places · AI ranked · No fluff
              </p>
            </div>

            <form onSubmit={handleGoogleSignIn} className="space-y-4">
              <Input
                label="Your name"
                type="text"
                placeholder="e.g. Praveen"
                value={name}
                autoFocus
                onChange={e => { setName(e.target.value); setNameError(''); }}
                error={nameError}
              />
              <Button
                type="submit"
                variant="brand"
                fullWidth
                loading={loading}
                icon={!loading ? <GoogleLogo /> : undefined}
                iconRight={!loading ? <ArrowRight className="w-3.5 h-3.5" /> : undefined}
                className="justify-between"
              >
                {loading ? 'Signing in…' : 'Continue with Google'}
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted">
              By continuing you agree to our Terms of Service
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
