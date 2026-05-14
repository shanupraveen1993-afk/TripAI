import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Input({ label, helper, error, icon, iconRight, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-heading mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={[
            'w-full bg-surface border rounded-lg text-sm text-body',
            'placeholder:text-placeholder transition-colors duration-150',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-danger focus:ring-danger-medium focus:border-danger'
              : 'border-border focus:ring-brand-soft focus:border-brand',
            icon ? 'pl-9' : 'pl-3',
            iconRight ? 'pr-9' : 'pr-3',
            'py-2.5',
            className,
          ].join(' ')}
          {...props}
        />
        {iconRight && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-danger font-medium">{error}</p>}
      {helper && !error && <p className="mt-1 text-xs text-muted">{helper}</p>}
    </div>
  );
}
