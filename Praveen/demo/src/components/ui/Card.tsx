import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
};

export function Card({ children, className = '', hover = false, padding = 'md', onClick }: CardProps) {
  const interactive = Boolean(onClick);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={[
        'bg-surface border border-card-border rounded-xl shadow-sm',
        paddingClasses[padding],
        hover ? 'card-hover cursor-pointer' : '',
        interactive ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
