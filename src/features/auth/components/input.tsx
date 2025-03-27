import { cn } from '@/features/core';

type InputProps = {
  disabled?: boolean;
  error?: string | boolean;
};

export function Input({
  disabled = false,
  error = undefined,
  className,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        disabled={disabled}
        className={cn(
          'text-neutral-950 border border-neutral-400 bg-white w-full rounded px-4 py-3 placeholder:text-neutral-400 text-body-1 focus:outline-none focus:border focus:border-primary-400',
          error && 'bg-white border-2 border-red-500',
          disabled &&
            'bg-neutral-100 text-neutral-600 border border-neutral-400',
          className,
        )}
        {...props}
      />
      {typeof error === 'string' && (
        <>
          <div className="h-1" />
          <div className="text-red-500 text-label-1 pl-1 pr-1">{error}</div>
        </>
      )}
    </>
  );
}
