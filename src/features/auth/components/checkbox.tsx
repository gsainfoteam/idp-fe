import { forwardRef } from 'react';

import CheckIcon from '../../../assets/check.svg?react';

import { cn } from '@/features/core';

export const Checkbox = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ disabled = false, className, children, ...props }, ref) => {
  return (
    <div className="cursor-pointer">
      <label className="flex items-center w-fit">
        <input
          type="checkbox"
          className={cn('peer appearance-none', className)} // group:checked:bg-primary-500
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div
          className={cn(
            'w-5 h-5 m-1 rounded flex items-center justify-center transition-all',
            'bg-white border border-neutral-500 peer-checked:bg-primary-500 peer-checked:border-none peer-checked:*:block',
            disabled
              ? 'bg-neutral-300 peer-checked:bg-neutral-300 cursor-default'
              : 'cursor-pointer',
          )}
        >
          <CheckIcon className="hidden" />
        </div>
        <div
          className={cn(
            'ml-2 text-body-1 text-black',
            disabled ? 'cursor-default' : 'cursor-pointer',
          )}
        >
          {children}
        </div>
      </label>
    </div>
  );
});
