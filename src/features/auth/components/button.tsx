import { cva } from 'class-variance-authority';
import { useState } from 'react';

import { LoadingEllipse } from './loading-ellipse';

import { cn } from '@/features/core';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'text' | 'link';
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const buttonStyle = cva(
  'flex items-center justify-center text-center rounded-lg w-auto cursor-pointer text-title-3',
  {
    variants: {
      type: {
        primary: 'w-full py-3 bg-primary-600 text-white',
        secondary:
          'w-full py-3 bg-white text-primary-600 border border-primary-600',
        text: 'text-primary-600',
        link: 'text-primary-400 underline',
      },
      isPressed: {
        true: 'cursor-default',
        false: '',
      },
      isDisabled: {
        true: 'cursor-default',
        false: '',
      },
    },
    compoundVariants: [
      {
        type: 'primary',
        isPressed: true,
        className: 'bg-primary-700',
      },
      {
        type: 'primary',
        isDisabled: true,
        className: 'bg-neutral-600',
      },
      {
        type: 'secondary',
        isPressed: true,
        className: 'bg-primary-50',
      },
      {
        type: 'secondary',
        isDisabled: true,
        className: 'bg-neutral-100 text-neutral-600 border-neutral-600',
      },
      {
        type: 'text',
        isPressed: true,
        className: 'text-primary-700',
      },
      {
        type: 'text',
        isDisabled: true,
        className: 'text-neutral-600',
      },
      {
        type: 'link',
        isPressed: true,
        className: 'text-neutral-500 underline',
      },
    ],
  },
);

export function Button({
  variant,
  text,
  disabled = false,
  isLoading: _isLoading = false,
  onClick,
  className,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isPressed, setIsPressed] = useState(false);
  const isLoading = variant === 'primary' && _isLoading;

  return (
    <button
      onClick={(e) => {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 300);
        onClick?.(e);
      }}
      className={cn(
        buttonStyle({ type: variant, isPressed, isDisabled: disabled }),
        className,
      )}
      {...props}
    >
      {isLoading ? <LoadingEllipse color="bg-[#d9d9d9]" /> : text}
    </button>
  );
}
