import { forwardRef, useCallback, useState } from 'react';

import { cn } from '@/features/core';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  inputClassName?: string;
  prefixAdornment?: React.ReactNode;
  suffixAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      inputClassName,
      prefixAdornment,
      suffixAdornment,
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
              className="[&>*]:text-input-children absolute ml-4 flex h-full cursor-pointer items-center justify-center"
            >
              {prefixAdornment}
            </div>
            <input
              disabled={disabled}
              ref={ref}
              style={{
                paddingLeft: prefixPadding + 16 + (prefixAdornment ? 8 : 0),
                paddingRight: suffixPadding + 16 + (suffixAdornment ? 8 : 0),
              }}
              className={cn(
                'w-full rounded-lg py-3',
                'text-body-1 text-input-text placeholder:text-input-placeholder',
                'focus:border-input-focus-border border-input-border bg-input-background border shadow-none focus:border focus:outline-none',
                error &&
                  'border-input-error-border bg-input-background focus:border-input-error-border shadow-[inset_0_0_0_1px_theme(colors.red.500)] focus:shadow-[inset_0_0_0_1px_theme(colors.red.500)]',
                disabled &&
                  'border-input-disabled-border bg-input-disabled-background text-input-disabled-text',
                inputClassName,
              )}
              {...props}
            />
            <div
              ref={suffixRef}
              className="[&>*]:text-input-children absolute inset-y-0 right-0 mr-4 flex h-full cursor-pointer items-center justify-center"
            >
              {suffixAdornment}
            </div>
          </div>
        </div>
        {typeof error === 'string' && error.trim().length > 0 && (
          <div className="text-label-1 text-input-error-label mt-1 px-1">
            {error}
          </div>
        )}
      </div>
    );
  },
);
