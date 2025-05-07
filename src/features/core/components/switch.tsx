import { forwardRef } from 'react';

import { cn } from '../utils/cn';

export const Switch = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ disabled = false, className, ...props }, ref) => {
  return (
    <div className="w-fit cursor-pointer">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className={cn('peer sr-only', className)}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {/* 트랙 */}
        <div
          className={cn(
            'relative h-7.5 w-12.5 rounded-full p-0.5 transition-colors duration-200',
            'peer-checked:bg-primary-500 bg-neutral-200 peer-checked:[&>div]:translate-x-5',
            disabled
              ? 'cursor-default bg-neutral-300 peer-checked:bg-neutral-300 peer-checked:[&>div]:bg-white'
              : 'cursor-pointer',
          )}
        >
          {/* 핸들 */}
          <div
            className={cn(
              'absolute top-0.5 left-0.5 size-6.5 rounded-full transition-transform duration-200 ease-in-out',
              disabled ? 'bg-neutral-500' : 'bg-white',
            )}
          />
        </div>
      </label>
    </div>
  );
});
