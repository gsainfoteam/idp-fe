import { cn } from '@/features/core';

type InputProps = {
  disabled?: boolean;
  hasError?: boolean;
};

export function Input({
  disabled = false,
  hasError = false,
  className,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'text-neutral-950 border border-neutral-400 bg-white w-full rounded px-4 py-3 placeholder:text-neutral-400 text-body-1 focus:outline-none focus:border focus:border-primary-400',
        hasError && 'bg-white border-2 border-red-500',
        disabled && 'bg-neutral-100 text-neutral-600 border border-neutral-400',
        className,
      )}
      {...props}
    />
  );
}
