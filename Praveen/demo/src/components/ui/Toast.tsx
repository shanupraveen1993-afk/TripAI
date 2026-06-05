import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle   className="w-4 h-4 text-success shrink-0" />,
  error:   <XCircle       className="w-4 h-4 text-danger shrink-0" />,
  info:    <Info          className="w-4 h-4 text-accent shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 text-warning-strong shrink-0" />,
};

const toastClasses: Record<ToastType, string> = {
  success: 'border-success-medium/40 bg-success-soft',
  error:   'border-danger-medium/40 bg-danger-soft',
  info:    'border-accent/20 bg-accent-soft',
  warning: 'border-warning-medium/40 bg-warning-soft',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div role="status" aria-live="polite" aria-atomic="false" className="fixed z-[600] flex flex-col gap-2 pointer-events-none bottom-28 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:bottom-auto sm:top-20 sm:right-4 sm:left-auto sm:translate-x-0 sm:w-auto">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium max-w-xs ${toastClasses[t.type]}`}
            >
              {icons[t.type]}
              <span className="text-heading flex-1">{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="text-muted hover:text-heading transition-colors ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
