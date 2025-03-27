import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useState } from 'react';

import { LoadingEllipse } from './loading-ellipse';

import { cn } from '@/features/core';

type ButtonProps = {
  variant: NonNullable<VariantProps<typeof buttonStyle>['variant']>;
  disabled?: boolean;
  isLoading?: boolean;
};

const buttonStyle = cva(
  'flex items-center justify-center text-center rounded-lg w-auto cursor-pointer text-title-3',
  {
    variants: {
      variant: {
        primary: 'w-full py-3 bg-primary-600 text-white',
        secondary:
          'w-full py-3 bg-white text-primary-600 border border-primary-600',
        text: 'text-primary-600',
        link: 'text-body-1 text-neutral-400 underline',
      },
      isPressed: { true: 'cursor-default', false: '' },
      disabled: { true: 'cursor-default', false: '' },
    },
    compoundVariants: [
      {
        variant: 'primary',
        isPressed: true,
        className: 'bg-primary-700',
      },
      {
        variant: 'primary',
        disabled: true,
        className: 'bg-neutral-600',
      },
      {
        variant: 'secondary',
        isPressed: true,
        className: 'bg-primary-50',
      },
      {
        variant: 'secondary',
        disabled: true,
        className: 'bg-neutral-100 text-neutral-600 border-neutral-600',
      },
      {
        variant: 'text',
        isPressed: true,
        className: 'text-primary-700',
      },
      {
        variant: 'text',
        disabled: true,
        className: 'text-neutral-600',
      },
      {
        variant: 'link',
        isPressed: true,
        className: 'text-neutral-500',
      },
    ],
  },
);

export function Button({
  variant,
  disabled = false,
  isLoading = false,
  onMouseDown,
  className,
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isPressed, setPressed] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isPressed) setPressed(false);
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isPressed]);

  return (
    <button
      disabled={disabled}
      onMouseDown={(e) => {
        setPressed(true);
        onMouseDown?.(e);
      }}
      className={cn(buttonStyle({ variant, isPressed, disabled }), className)}
      {...props}
    >
      {variant === 'primary' && isLoading ? (
        <LoadingEllipse color="bg-[#d9d9d9]" />
      ) : (
        children
      )}
    </button>
  );
}
