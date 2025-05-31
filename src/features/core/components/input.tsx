import { forwardRef, useCallback, useState } from 'react';

import { cn, palette } from '@/features/core';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  inputClassName?: string;
  prefixAdornment?: React.ReactNode;
  suffixAdornment?: React.ReactNode;
}

const inputColors = palette((hasError: boolean) => ({
  default: {
    placeholder: 'placeholder:text-input-placeholder',
    background: 'bg-input-default-background',
    border: 'inset-ring-input-default-border inset-ring',
    text: 'text-input-default-label',
  },
  focus: {
    placeholder: !hasError && 'placeholder:text-input-placeholder',
    background: !hasError && 'focus:bg-input-focus-background',
    border: !hasError && 'focus:inset-ring-input-focus-border focus:inset-ring',
    text: !hasError && 'focus:text-input-focus-label',
  },
  error: {
    placeholder: 'placeholder:text-input-placeholder',
    background: hasError && 'bg-input-error-background',
    border: hasError && 'inset-ring-input-error-border inset-ring-2',
    text: hasError && 'text-input-error-label',
  },
  disabled: {
    placeholder: 'disabled:placeholder:text-input-disabled-label',
    background: 'disabled:bg-input-disabled-background',
    border: 'disabled:inset-ring-input-disabled-border disabled:inset-ring',
    text: 'disabled:text-input-disabled-label',
  },
}));

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
              className={cn(
                'absolute ml-4 flex h-full cursor-pointer items-center justify-center',
                'text-input-placeholder',
              )}
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
                'text-body-1',
                'shadow-none focus:outline-none',
                'transition duration-200',
                inputColors(!!error),
                inputClassName,
              )}
              {...props}
            />
            <div
              ref={suffixRef}
              className={cn(
                'absolute inset-y-0 right-0 mr-4 flex h-full cursor-pointer items-center justify-center',
                'text-input-placeholder',
              )}
            >
              {suffixAdornment}
            </div>
          </div>
        </div>
        {typeof error === 'string' && error.trim().length > 0 && (
          <div className="text-label-1 text-input-error-border mt-1 px-1">
            {error}
          </div>
        )}
      </div>
    );
  },
);
