import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useState } from 'react';

import { cn, LoadingEllipse } from '@/features/core';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: NonNullable<VariantProps<typeof buttonStyle>['variant']>;
  disabled?: boolean;
  isLoading?: boolean;
}

// TODO: isPressed -> active: 로 대체 가능

// TODO: cva, cn 같은 함수에도 tailwindcss prettier 적용되게 하기

const buttonStyle = cva(
  'flex items-center justify-center text-center rounded-lg w-auto cursor-pointer text-title-3',
  {
    variants: {
      variant: {
        default:
          'w-full py-3 bg-neutral-50 text-black border border-neutral-200',
        primary: 'w-full py-3 bg-primary-600 text-white',
        secondary:
          'w-full py-3 bg-white text-primary-600 border border-primary-600',
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
        className: 'bg-neutral-200 border-neutral-300',
      },
      {
        variant: 'default',
        disabled: true,
        className: 'bg-neutral-300 border-neutral-200',
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
      disabled={disabled}
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
