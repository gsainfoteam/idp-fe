import { forwardRef } from 'react';

import { cn } from '@/features/core';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  inputClassName?: string;
  suffix?: React.ReactNode;
}

// TODO: 인증번호 만료 타이머
// TODO: 비밀번호 보이게 하기 버튼

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      inputClassName,
      suffix,
      required = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className}>
        {label && (
          <div className="text-label-1 mb-1 flex text-neutral-900">
            {label}
            {required && <div className="text-red-500">*</div>}
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            disabled={disabled}
            ref={ref}
            className={cn(
              'w-full rounded-lg px-4 py-3',
              'text-body-1 text-neutral-950 placeholder:text-neutral-400',
              'focus:border-primary-400 border border-neutral-400 bg-white shadow-none focus:border focus:outline-none',
              error &&
                'border-red-500 bg-white shadow-[inset_0_0_0_1px_theme(colors.red.500)]',
              disabled &&
                'border border-neutral-400 bg-neutral-100 text-neutral-600',
              inputClassName,
            )}
            {...props}
          />
          {suffix}
        </div>
        {typeof error === 'string' && error.trim().length > 0 && (
          <div className="text-label-1 mt-1 px-1 text-red-500">{error}</div>
        )}
      </div>
    );
  },
);
