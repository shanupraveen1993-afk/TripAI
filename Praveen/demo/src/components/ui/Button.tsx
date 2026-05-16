import React from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'brand' | 'ghost' | 'outline' | 'danger' | 'success';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  pill?: boolean;
}

const variantClasses: Record<Variant, string> = {
  brand: 'bg-brand hover:bg-brand-strong text-white shadow-sm focus:ring-4 focus:ring-brand-soft',
  ghost:   'bg-transparent hover:bg-bg-app text-body focus:ring-2 focus:ring-border-medium',
  outline: 'bg-transparent border border-border hover:bg-bg-app text-heading focus:ring-2 focus:ring-border-medium',
  danger:  'bg-danger hover:bg-danger-strong text-white shadow-sm focus:ring-4 focus:ring-danger-medium',
  success: 'bg-success hover:bg-success-strong text-white shadow-sm focus:ring-4 focus:ring-success-medium',
};

const sizeClasses: Record<Size, string> = {
  xs: 'px-3 py-1.5 text-xs gap-1',
  sm: 'px-3 py-2 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-5 py-3 text-base gap-2',
  xl: 'px-6 py-3.5 text-base gap-2',
};

export function Button({
  variant = 'brand',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  pill = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center font-semibold transition-all duration-150',
        'outline-none active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        pill ? 'rounded-full' : 'rounded-lg',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
