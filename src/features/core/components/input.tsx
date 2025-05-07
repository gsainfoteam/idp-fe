import { forwardRef, useCallback, useState } from 'react';

import { cn } from '@/features/core';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  inputClassName?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      inputClassName,
      prefixIcon,
      suffixIcon,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [prefixPadding, setPrefixPadding] = useState(0);
    const [suffixPadding, setSuffixPadding] = useState(0);

    const prefixRef = useCallback((node: HTMLDivElement) => {
      if (!node) return;

      const set = () => setPrefixPadding(node.offsetWidth);
      const observer = new ResizeObserver(set);

      observer.observe(node);
      set();

      return () => {
        observer.disconnect();
        setPrefixPadding(0);
      };
    }, []);

    const suffixRef = useCallback((node: HTMLDivElement) => {
      if (!node) return;

      const set = () => setSuffixPadding(node.offsetWidth);
      const observer = new ResizeObserver(set);

      observer.observe(node);
      set();

      return () => {
        observer.disconnect();
        setSuffixPadding(0);
      };
    }, []);

    return (
      <div className={className}>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <div
              ref={prefixRef}
              className="absolute ml-4 flex h-full cursor-pointer items-center justify-center"
            >
              {prefixIcon}
            </div>
            <input
              disabled={disabled}
              ref={ref}
              style={{
                paddingLeft: prefixPadding + 16 + (prefixIcon ? 8 : 0),
                paddingRight: suffixPadding + 16 + (suffixIcon ? 8 : 0),
              }}
              className={cn(
                'w-full rounded-lg py-3',
                'text-body-1 text-neutral-950 placeholder:text-neutral-400',
                'focus:border-primary-400 border border-neutral-400 bg-white shadow-none focus:border focus:outline-none',
                error &&
                  'border-red-500 bg-white shadow-[inset_0_0_0_1px_theme(colors.red.500)] focus:border-red-500 focus:shadow-[inset_0_0_0_1px_theme(colors.red.500)]',
                disabled &&
                  'border border-neutral-400 bg-neutral-100 text-neutral-600',
                inputClassName,
              )}
              {...props}
            />
            <div
              ref={suffixRef}
              className="absolute inset-y-0 right-0 mr-4 flex h-full cursor-pointer items-center justify-center"
            >
              {suffixIcon}
            </div>
          </div>
        </div>
        {typeof error === 'string' && error.trim().length > 0 && (
          <div className="text-label-1 mt-1 px-1 text-red-500">{error}</div>
        )}
      </div>
    );
  },
);
