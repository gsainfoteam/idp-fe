import { forwardRef } from 'react';

import { cn } from '@/features/core';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, required = false, disabled = false, error, className, ...props },
    ref,
  ) => {
    return (
      <div>
        {label && (
          <div className="text-label-1 mb-1 flex">
            {label}
            {required && <div className="text-red-500">*</div>}
          </div>
        )}
        <input
          disabled={disabled}
          ref={ref}
          className={cn(
            'w-full rounded px-4 py-3',
            'text-body-1 text-neutral-950 placeholder:text-neutral-400',
            'focus:border-primary-400 border border-neutral-400 bg-white shadow-none focus:border focus:outline-none',
            error &&
              'border-red-500 bg-white shadow-[inset_0_0_0_1px_theme(colors.red.500)]',
            disabled &&
              'border border-neutral-400 bg-neutral-100 text-neutral-600',
            className,
          )}
          {...props}
        />
        {typeof error === 'string' && error.trim().length > 0 && (
          <div className="text-label-1 mt-1 px-1 text-red-500">{error}</div>
        )}
      </div>
    );
  },
);
