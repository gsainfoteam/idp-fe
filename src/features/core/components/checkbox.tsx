import { forwardRef } from 'react';

import CheckIcon from '../../../assets/check.svg?react';

import { cn } from '@/features/core';

export const Checkbox = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ disabled = false, className, children, ...props }, ref) => {
  return (
    <div className="cursor-pointer">
      <label className="flex w-fit items-center">
        <input
          type="checkbox"
          className={cn('peer appearance-none', className)} // group:checked:bg-primary-500
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div
          className={cn(
            'm-1 flex h-5 w-5 items-center justify-center rounded transition-all',
            'peer-checked:bg-primary-500 border border-neutral-500 bg-white peer-checked:border-none peer-checked:*:block',
            disabled
              ? 'cursor-default bg-neutral-300 peer-checked:bg-neutral-300'
              : 'cursor-pointer',
          )}
        >
          <CheckIcon className="hidden" />
        </div>
        <div
          className={cn(
            'text-body-1 ml-2 text-black',
            disabled ? 'cursor-default' : 'cursor-pointer',
          )}
        >
          {children}
        </div>
      </label>
    </div>
  );
});
