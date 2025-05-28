import { forwardRef } from 'react';

import CheckIcon from '@/assets/icons/line/checkbox.svg?react';
import { cn } from '@/features/core';

export const Checkbox = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ disabled = false, className, children, ...props }, ref) => {
  return (
    <div className="w-fit cursor-pointer">
      <label className="flex w-fit items-center">
        <input
          type="checkbox"
          className={cn('peer appearance-none', className)}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div
          className={cn(
            'm-1 flex size-6 items-center justify-center rounded transition-all',
            'peer-checked:bg-checkbox-peer-checked-background border-checkbox-border bg-checkbox-background border peer-checked:border-none peer-checked:*:block',
            disabled
              ? 'bg-checkbox-disabled-background peer-checked:bg-checkbox-peer-checked-disabled-background cursor-default'
              : 'cursor-pointer',
          )}
        >
          <CheckIcon className="text-button-label hidden" />
        </div>
        <div
          className={cn(
            'text-body-1 text-checkbox-label ml-2',
            disabled ? 'cursor-default' : 'cursor-pointer',
          )}
        >
          {children}
        </div>
      </label>
    </div>
  );
});
