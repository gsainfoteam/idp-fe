import { cva, type VariantProps } from 'class-variance-authority';

import { cn, LoadingEllipse, palette } from '@/features/core';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: NonNullable<VariantProps<typeof buttonStyles>['variant']>;
  loading?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  labelClassName?: string;
}

const buttonColors = {
  default: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-default-default-background',
      border: 'border-button-default-default-border',
      text: 'text-button-default-default-label',
    },
    hover: {
      background: 'hover:bg-button-default-hover-background',
      border: 'hover:border-button-default-hover-border',
      text: 'hover:text-button-default-hover-label',
    },
    active: {
      background: 'active:bg-button-default-active-background',
      border: 'active:border-button-default-active-border',
      text: 'active:text-button-default-active-label',
    },
    loading: {
      background: loading && 'bg-button-default-loading-background',
      border: loading && 'border-button-default-loading-border',
      text: loading && 'text-button-default-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-default-disabled-background',
      border: 'disabled:border-button-default-disabled-border',
      text: 'disabled:text-button-default-disabled-label',
    },
  })),
  primary: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-primary-default-background',
      border: 'border-button-primary-default-border',
      text: 'text-button-primary-default-label',
    },
    hover: {
      background: 'hover:bg-button-primary-hover-background',
      border: 'hover:border-button-primary-hover-border',
      text: 'hover:text-button-primary-hover-label',
    },
    active: {
      background: 'active:bg-button-primary-active-background',
      border: 'active:border-button-primary-active-border',
      text: 'active:text-button-primary-active-label',
    },
    loading: {
      background: loading && 'bg-button-primary-loading-background',
      border: loading && 'border-button-primary-loading-border',
      text: loading && 'text-button-primary-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-primary-disabled-background',
      border: 'disabled:border-button-primary-disabled-border',
      text: 'disabled:text-button-primary-disabled-label',
    },
  })),
  secondary: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-secondary-default-background',
      border: 'border-button-secondary-default-border',
      text: 'text-button-secondary-default-label',
    },
    hover: {
      background: 'hover:bg-button-secondary-hover-background',
      border: 'hover:border-button-secondary-hover-border',
      text: 'hover:text-button-secondary-hover-label',
    },
    active: {
      background: 'active:bg-button-secondary-active-background',
      border: 'active:border-button-secondary-active-border',
      text: 'active:text-button-secondary-active-label',
    },
    loading: {
      background: loading && 'bg-button-secondary-loading-background',
      border: loading && 'border-button-secondary-loading-border',
      text: loading && 'text-button-secondary-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-secondary-disabled-background',
      border: 'disabled:border-button-secondary-disabled-border',
      text: 'disabled:text-button-secondary-disabled-label',
    },
  })),
  text: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-text-default-background',
      border: 'border-button-text-default-border',
      text: 'text-button-text-default-label',
    },
    hover: {
      background: 'hover:bg-button-text-hover-background',
      border: 'hover:border-button-text-hover-border',
      text: 'hover:text-button-text-hover-label',
    },
    active: {
      background: 'active:bg-button-text-active-background',
      border: 'active:border-button-text-active-border',
      text: 'active:text-button-text-active-label',
    },
    loading: {
      background: loading && 'bg-button-text-loading-background',
      border: loading && 'border-button-text-loading-border',
      text: loading && 'text-button-text-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-text-disabled-background',
      border: 'disabled:border-button-text-disabled-border',
      text: 'disabled:text-button-text-disabled-label',
    },
  })),
  link: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-link-default-background',
      border: 'border-button-link-default-border',
      text: 'text-button-link-default-label',
    },
    hover: {
      background: 'hover:bg-button-link-hover-background',
      border: 'hover:border-button-link-hover-border',
      text: 'hover:text-button-link-hover-label',
    },
    active: {
      background: 'active:bg-button-link-active-background',
      border: 'active:border-button-link-active-border',
      text: 'active:text-button-link-active-label',
    },
    loading: {
      background: loading && 'bg-button-link-loading-background',
      border: loading && 'border-button-link-loading-border',
      text: loading && 'text-button-link-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-link-disabled-background',
      border: 'disabled:border-button-link-disabled-border',
      text: 'disabled:text-button-link-disabled-label',
    },
  })),
};

const buttonStyles = cva(
  cn(
    'relative flex items-center justify-center text-center',
    'w-fit cursor-pointer rounded-lg',
    'transition-colors duration-100',
  ),
  {
    variants: {
      variant: {
        default: 'text-title-3 border px-5 py-3',
        primary: 'text-title-3 px-5 py-3',
        secondary: 'text-title-3 border bg-white px-5 py-3',
        text: 'text-title-3 px-5 py-3',
        link: 'text-body-1 underline',
      },
      loading: {
        true: 'pointer-events-none cursor-default',
        false: '',
      },
      disabled: {
        true: 'cursor-default',
        false: '',
      },
    },
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
      className={cn(
        buttonStyles({ variant, loading, disabled }),
        buttonColors[variant](loading),
        className,
      )}
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
          <LoadingEllipse className="bg-current" />
        </div>
      )}
    </button>
  );
}
