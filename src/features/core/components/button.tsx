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
  'text-title-3 relative flex w-fit items-center justify-center text-center transition duration-100',
  {
    variants: {
      variant: {
        default:
          'rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-3 text-black active:bg-neutral-100 disabled:border-neutral-300 disabled:bg-neutral-200 disabled:text-neutral-300',
        primary:
          'bg-primary-600 active:bg-primary-700 rounded-lg px-5 py-3 text-white disabled:bg-neutral-200',
        secondary:
          'text-primary-600 border-primary-600 active:bg-primary-50 rounded-lg border bg-white px-5 py-3 disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-200',
        text: 'text-primary-600 active:text-primary-700 px-5 py-3 disabled:text-neutral-200',
        link: 'text-body-1 text-neutral-400 underline active:text-neutral-600 disabled:cursor-default disabled:text-neutral-200',
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
      {
        variant: 'link',
        loading: true,
        className: 'text-neutral-200',
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
                ? 'bg-button-loading-ellipse-default'
                : variant === 'primary'
                  ? 'bg-button-loading-ellipse-primary'
                  : 'bg-button-loading-ellipse-secondary',
            )}
          />
        </div>
      )}
    </button>
  );
}
