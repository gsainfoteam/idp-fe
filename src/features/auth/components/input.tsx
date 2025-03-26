import { useState } from 'react';

import { cn } from '@/features/core';

type InputProps = {
  isDisabled?: boolean;
  isError?: boolean;
};

function textStyle(isDisabled: boolean) {
  if (isDisabled) return 'text-neutral-600';
  return 'text-neutral-950';
}

function borderStyle(
  isDisabled: boolean,
  isError: boolean,
  isFocused: boolean,
) {
  if (isDisabled) return 'border border-neutral-400';
  if (isError) return 'border-2 border-red-500';
  if (isFocused) return 'border border-primary-400';
  return 'border border-neutral-400';
}

function bgStyle(isDisabled: boolean, isError: boolean) {
  if (isDisabled) return 'bg-neutral-100';
  if (isError) return 'bg-white';
  return 'bg-white';
}

export function Input({
  isDisabled = false,
  isError = false,
  onFocus,
  onBlur,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      className={cn(
        textStyle(isDisabled),
        borderStyle(isDisabled, isError, isFocused),
        bgStyle(isDisabled, isError),
        `w-full h-12 rounded px-4 py-3 placeholder:text-neutral-400 typo-body1 focus:outline-none`,
        props.className,
      )}
      {...props}
    />
  );
}
