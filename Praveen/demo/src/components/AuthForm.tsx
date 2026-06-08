import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, ArrowRight } from 'lucide-react';
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

export function AuthForm({ onSuccess, onBack, asModal = false }: AuthFormProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onSuccess({ name: 'Traveller', email: 'demo@gmail.com' });
  };

  const wrapper = asModal
    ? 'p-1'
    : 'min-h-dvh bg-bg-app flex flex-col items-center justify-center p-4';

  return (
    <div className={wrapper}>
      <div className="w-full max-w-sm">

        {/* Brand — standalone page only */}
        {!asModal && (
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-heading tracking-tight">
              Trip<span className="text-brand">AI</span>
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key="google-auth"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-display font-bold text-heading mb-1">
                Welcome to TripAI
              </h1>
              <p className="text-sm text-muted">
                Plan smarter trips with real Google data + AI
              </p>
            </div>

            <form onSubmit={handleGoogleSignIn} className="space-y-4">
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

            {/* M-04: clarify demo-only auth so users aren't confused */}
            <p className="mt-4 text-xs text-center text-muted">
              This is a <span className="font-semibold text-heading">demo</span> — your name is saved locally. Real Google OAuth coming soon.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
