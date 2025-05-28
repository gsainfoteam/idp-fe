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
          'border-button-default-disabled-border bg-button-default-background active:bg-button-default-active disabled:border-button-default-disabled-border disabled:bg-button-default-disabled-background disabled:text-button-default-disabled-label text-button-default-label rounded-lg border px-5 py-3',
        primary:
          'bg-button-primary active:bg-button-primary-active disabled:bg-button-primary-disabled text-button-label rounded-lg px-5 py-3',
        secondary:
          'text-button-primary border-button-primary active:bg-button-primary-50 disabled:border-button-secondary-disabled-border disabled:bg-button-secondary-disabled-background disabled:text-button-secondary-disabled-label rounded-lg border bg-white px-5 py-3',
        text: 'text-button-primary active:text-button-text-active disabled:text-button-text-disabled px-5 py-3',
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
        className:
          'bg-button-default-disabled-background border-button-default-disabled-border',
      },
      {
        variant: 'primary',
        loading: true,
        className: 'bg-button-primary-active',
      },
      {
        variant: 'secondary',
        loading: true,
        className: 'bg-button-secondary-active',
      },
      {
        variant: 'link',
        loading: true,
        className: 'text-button-text-disabled',
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
