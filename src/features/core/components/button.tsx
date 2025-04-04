import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useState } from 'react';

import { cn, LoadingEllipse } from '@/features/core';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: NonNullable<VariantProps<typeof buttonStyle>['variant']>;
  disabled?: boolean;
  isLoading?: boolean;
}

// TODO: isPressed -> active: 로 대체 가능

const buttonStyle = cva(
  'text-title-3 flex w-auto cursor-pointer items-center justify-center rounded-lg text-center',
  {
    variants: {
      variant: {
        default:
          'w-full border border-neutral-200 bg-neutral-50 py-3 text-black',
        primary: 'bg-primary-600 w-full py-3 text-white',
        secondary:
          'text-primary-600 border-primary-600 w-full border bg-white py-3',
        text: 'text-primary-600',
        link: 'text-body-1 text-neutral-400 underline',
      },
      isPressed: { true: 'cursor-default', false: '' },
      isLoading: { true: 'cursor-default', false: '' },
      disabled: { true: 'cursor-default', false: '' },
    },
    compoundVariants: [
      {
        variant: 'default',
        isPressed: true,
        className: 'bg-neutral-100',
      },
      {
        variant: 'default',
        isLoading: true,
        className: 'border-neutral-300 bg-neutral-200',
      },
      {
        variant: 'default',
        disabled: true,
        className: 'border-neutral-200 bg-neutral-300',
      },
      {
        variant: 'primary',
        isPressed: true,
        className: 'bg-primary-700',
      },
      {
        variant: 'primary',
        isLoading: true,
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
        className: 'border-neutral-600 bg-neutral-100 text-neutral-600',
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
}: ButtonProps) {
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
      disabled={disabled || isLoading}
      onMouseDown={(e) => {
        setPressed(true);
        onMouseDown?.(e);
      }}
      className={cn(
        buttonStyle({ variant, isPressed, isLoading, disabled }),
        className,
      )}
      {...props}
    >
      {(variant === 'default' || variant === 'primary') && isLoading ? (
        <LoadingEllipse
          className={
            variant === 'default' ? 'bg-neutral-600' : 'bg-neutral-200'
          }
        />
      ) : (
        children
      )}
    </button>
  );
}
