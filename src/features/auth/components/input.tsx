import { cn } from '@/features/core';

type InputProps = {
  label?: string;
  disabled?: boolean;
  error?: string | boolean;
};

export function Input({
  label,
  disabled = false,
  error,
  className,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      {label && <div className="text-label-1 mb-1">{label}</div>}
      <input
        disabled={disabled}
        className={cn(
          'w-full rounded px-4 py-3',
          'text-body-1 text-neutral-950 placeholder:text-neutral-400',
          'focus:border-primary-400 border border-neutral-400 bg-white shadow-none focus:border focus:outline-none',
          error &&
            'border-red-500 bg-white shadow-[inset_0_0_0_1px_theme(colors.red.500)]',
          disabled &&
            'border border-neutral-400 bg-neutral-100 text-neutral-600',
        )}
        {...props}
      />
      {typeof error === 'string' && (
        <div className="text-label-1 mt-1 px-1 text-red-500">{error}</div>
      )}
    </div>
  );
}
