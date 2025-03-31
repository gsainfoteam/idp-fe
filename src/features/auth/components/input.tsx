import { cn } from '@/features/core';

type InputProps = {
  label?: string;
  error?: string | boolean;
};

export function Input({
  label,
  required = false,
  disabled = false,
  error,
  className,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  // NOTE: label 아래에 mb-1보다 mb-2는 너무 넓고 mb-1.5가 더 나은 거 같은데

  return (
    <div className={className}>
      {label && (
        <div className="text-label-1 mb-1.5 flex">
          {label}
          {required && <div className="text-red-500">*</div>}
        </div>
      )}
      <input
        disabled={disabled}
        className={cn(
          'w-full rounded px-4 py-3',
          'text-neutral-950 text-body-1 placeholder:text-neutral-400',
          'bg-white border border-neutral-400 shadow-none focus:outline-none focus:border focus:border-primary-400',
          error &&
            'bg-white border-red-500 shadow-[inset_0_0_0_1px_theme(colors.red.500)]',
          disabled &&
            'bg-neutral-100 text-neutral-600 border border-neutral-400',
        )}
        {...props}
      />
      {typeof error === 'string' && (
        <div className="text-red-500 text-label-1 px-1 mt-1">{error}</div>
      )}
    </div>
  );
}
