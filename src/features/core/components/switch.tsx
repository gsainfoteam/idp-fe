import { forwardRef } from 'react';

import { cn } from '../utils/cn';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
            'peer-checked:bg-switch-track-background-checked bg-switch-track-background peer-checked:[&>div]:translate-x-5',
            disabled
              ? 'bg-switch-track-disabled-background peer-checked:bg-switch-track-disabled-background-checked peer-checked:[&>div]:bg-switch-track-disabled-checked-children cursor-default'
              : 'cursor-pointer',
            trackClassName,
          )}
        >
          {/* Handle */}
          <div
            className={cn(
              'absolute top-0.5 left-0.5 size-6.5 rounded-full transition-transform duration-200 ease-in-out',
              disabled
                ? 'bg-switch-handle-background-disabled'
                : 'bg-switch-handle-background',
              handleClassName,
            )}
          />
        </div>
      </label>
    );
  },
);
