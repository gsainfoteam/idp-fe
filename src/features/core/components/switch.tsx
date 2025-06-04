import { forwardRef } from 'react';

import { cn } from '../utils/cn';
import { palette } from '../utils/palette';

const trackColors = palette(() => ({
  default: {
    background: 'bg-switch-default-off-track',
  },
  checked: {
    background: 'peer-checked:bg-switch-default-on-track',
  },
  disabled: {
    background: 'peer-disabled:bg-switch-disabled-track',
  },
}));

const handleColors = palette((disabled: boolean) => ({
  default: {
    background: 'bg-switch-default-handle',
  },
  disabled: {
    background: disabled && 'bg-switch-disabled-handle',
  },
}));

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  trackClassName?: string;
  handleClassName?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { disabled = false, className, trackClassName, handleClassName, ...props },
    ref,
  ) => {
    return (
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className={cn('peer sr-only', className)}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {/* Track */}
        <div
          className={cn(
            'relative h-7.5 w-12.5 rounded-full p-0.5 transition-colors duration-200',
            'cursor-pointer peer-disabled:cursor-default peer-checked:[&>div]:translate-x-5',
            trackColors(),
            trackClassName,
          )}
        >
          {/* Handle */}
          <div
            className={cn(
              'absolute top-0.5 left-0.5 size-6.5 rounded-full transition-transform duration-200 ease-in-out',
              handleColors(disabled),
              handleClassName,
            )}
          />
        </div>
      </label>
    );
  },
);
