import React from 'react';
import { Compass, RefreshCw } from 'lucide-react';

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-dvh bg-bg-app flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 bg-danger-soft border border-danger-medium/30 rounded-2xl flex items-center justify-center mb-5">
          <Compass className="w-7 h-7 text-danger" />
        </div>
        <h1 className="font-display font-bold text-xl text-heading mb-2">Something went wrong</h1>
        <p className="text-sm text-muted max-w-xs mb-6 leading-relaxed">
          An unexpected error occurred. Your saved trips are safe — refresh the page to continue.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-strong text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh page
        </button>
      </div>
    );
  }
}
