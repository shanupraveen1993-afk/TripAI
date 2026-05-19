import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ToastProvider } from './components/ui/Toast.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { OfflineBanner } from './components/OfflineBanner.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <OfflineBanner />
        <App />
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
);
