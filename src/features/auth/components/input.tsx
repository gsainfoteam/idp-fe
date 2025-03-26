import { cva } from 'class-variance-authority';

import { cn } from '@/features/core';

type InputProps = {
  isDisabled?: boolean;
  isError?: boolean;
};

const inputStyle = cva(
  'text-neutral-950 border border-neutral-400 bg-white w-full rounded px-4 py-3 placeholder:text-neutral-400 text-body-1 focus:outline-none focus:border focus:border-primary-400',
  {
    variants: {
      isError: {
        true: 'bg-white border-2 border-red-500',
        false: '',
      },
      isDisabled: {
        true: 'bg-neutral-100 text-neutral-600 border border-neutral-400',
        false: '',
      },
    },
  },
);

export function Input({
  isDisabled = false,
  isError = false,
  className,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(inputStyle({ isError, isDisabled }), className)}
      {...props}
    />
  );
}
