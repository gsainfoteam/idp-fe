import { cva, type VariantProps } from 'class-variance-authority';

import { cn, LoadingEllipse } from '@/features/core';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: NonNullable<VariantProps<typeof buttonStyle>['variant']>;
  loading?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  labelClassName?: string;
}

const buttonStyle = cva(
  'text-title-3 relative flex w-fit items-center justify-center rounded-lg text-center transition duration-100',
  {
    variants: {
      variant: {
        default:
          'border border-neutral-200 bg-neutral-50 px-5 py-3 text-black active:bg-neutral-100 disabled:border-neutral-300 disabled:bg-neutral-200 disabled:text-neutral-500',
        primary:
          'bg-primary-600 active:bg-primary-700 px-5 py-3 text-white disabled:bg-neutral-600',
        secondary:
          'text-primary-600 border-primary-600 active:bg-primary-50 border bg-white px-5 py-3 disabled:border-neutral-600 disabled:bg-neutral-100 disabled:text-neutral-600',
        text: 'text-primary-600 active:text-primary-700 px-5 py-3 disabled:text-neutral-600',
        link: 'text-body-1 text-neutral-400 underline active:text-neutral-500 disabled:cursor-default',
      },
      loading: {
        true: 'pointer-events-none cursor-default',
        false: 'cursor-pointer',
      },
      disabled: {
        true: 'cursor-default',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        loading: true,
        className: 'border-neutral-300 bg-neutral-200',
      },
      {
        variant: 'primary',
        loading: true,
        className: 'bg-primary-700',
      },
      {
        variant: 'secondary',
        loading: true,
        className: 'bg-primary-50',
      },
    ],
  },
);

export function Button({
  variant,
  disabled = false,
  loading = false,
  prefixIcon,
  suffixIcon,
  className,
  labelClassName,
  children,
  ...props
}: ButtonProps) {
  const showEllipse = loading && !['text', 'link'].includes(variant);

  return (
    <button
      disabled={disabled}
      className={cn(buttonStyle({ variant, loading, disabled }), className)}
      {...props}
    >
      {/* text */}
      <div
        className={cn(
          'flex items-center justify-center gap-2',
          showEllipse && 'invisible',
          labelClassName,
        )}
      >
        {prefixIcon}
        {children}
        {suffixIcon}
      </div>

      {/* loading ellipse */}
      {showEllipse && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <LoadingEllipse
            className={cn(
              variant === 'default'
                ? 'bg-neutral-600'
                : variant === 'primary'
                  ? 'bg-neutral-200'
                  : 'bg-primary-600',
            )}
          />
        </div>
      )}
    </button>
  );
}
