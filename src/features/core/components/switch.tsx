import { forwardRef } from 'react';

import { cn } from '../utils/cn';

export const Switch = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ disabled = false, className, ...props }, ref) => {
  return (
    <label className="flex h-fit w-fit items-center">
      <input
        type="checkbox"
        className={cn('peer appearance-none', className)}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      <div
        className={cn(
          'flex h-7.5 w-12.5 rounded-full p-0.5',
          'peer-checked:bg-primary-500 bg-neutral-200',
          'justify-start peer-checked:justify-end',
          disabled
            ? 'cursor-default bg-neutral-300 peer-checked:bg-neutral-300 peer-checked:[&>div]:bg-white'
            : 'cursor-pointer',
        )}
      >
        <div
          className={cn(
            'size-6.5 rounded-full',
            disabled ? 'bg-neutral-500' : 'bg-white',
          )}
        />
      </div>
    </label>
  );
});
