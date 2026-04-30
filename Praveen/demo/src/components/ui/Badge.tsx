import React from 'react';

type BadgeVariant = 'brand' | 'success' | 'danger' | 'warning' | 'neutral' | 'accent';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  pill?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  brand:   'bg-brand-softer text-brand border border-brand-soft/30',
  success: 'bg-success-soft text-success border border-success-medium/30',
  danger:  'bg-danger-soft text-danger border border-danger-medium/30',
  warning: 'bg-warning-soft text-warning border border-warning-medium/30',
  neutral: 'bg-bg-app text-muted border border-border',
  accent:  'bg-accent-soft text-accent border border-accent/20',
};

const dotColors: Record<BadgeVariant, string> = {
  brand:   'bg-brand',
  success: 'bg-success',
  danger:  'bg-danger',
  warning: 'bg-warning',
  neutral: 'bg-muted',
  accent:  'bg-accent',
};

export function Badge({ variant = 'neutral', children, dot = false, pill = false, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold',
        pill ? 'rounded-full' : 'rounded-md',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
