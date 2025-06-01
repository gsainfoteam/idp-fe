import { forwardRef } from 'react';

import CheckIcon from '@/assets/icons/line/checkbox.svg?react';
import { cn, palette } from '@/features/core';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const checkboxColors = palette(() => ({
  default: {
    background: 'bg-transparent',
    border: 'inset-ring-checkbox-default-border',
    foreground: 'text-transparent',
  },
  checked: {
    background: 'peer-checked:bg-checkbox-checked-background',
    border: 'peer-checked:inset-ring-checkbox-checked-border',
    foreground: 'peer-checked:text-checkbox-checked-foreground',
  },
  disabled: {
    background: 'peer-disabled:bg-checkbox-disabled-background',
    border: cn(
      'peer-disabled:not-peer-checked:inset-ring-checkbox-default-border',
      'peer-disabled:peer-checked:inset-ring-checkbox-disabled-border',
    ),
    foreground: 'peer-disabled:text-checkbox-disabled-foreground',
  },
}));

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ disabled = false, className, children, ...props }, ref) => {
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
              'm-1 flex size-5 items-center justify-center rounded inset-ring-1 transition-all',
              'cursor-pointer peer-checked:*:block peer-disabled:cursor-default',
              checkboxColors(),
            )}
          >
            <CheckIcon className="hidden text-current" />
          </div>
          <div
            className={cn(
              'text-body-1 text-label ml-2',
              'cursor-pointer peer-disabled:cursor-default',
            )}
          >
            {children}
          </div>
        </label>
      </div>
    );
  },
);
