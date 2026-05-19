import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);
  const [showBack, setShowBack]   = useState(false);

  useEffect(() => {
    let backTimer: ReturnType<typeof setTimeout>;

    const handleOffline = () => {
      setIsOffline(true);
      setShowBack(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowBack(true);
      backTimer = setTimeout(() => setShowBack(false), 3000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online',  handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online',  handleOnline);
      clearTimeout(backTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {(isOffline || showBack) && (
        <motion.div
          key={isOffline ? 'offline' : 'online'}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className={[
            'fixed top-0 left-0 right-0 z-[700] flex items-center justify-center gap-2 px-4 py-2.5',
            isOffline
              ? 'bg-warning-soft border-b border-warning-medium/40'
              : 'bg-success-soft border-b border-success-medium/40',
          ].join(' ')}
          role="status"
          aria-live="polite"
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-warning-strong shrink-0" />
              <p className="text-xs font-semibold text-warning-strong">
                You're offline — live search is paused. Saved trips still work.
              </p>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-success-strong shrink-0" />
              <p className="text-xs font-semibold text-success-strong">
                Back online — all features restored.
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
