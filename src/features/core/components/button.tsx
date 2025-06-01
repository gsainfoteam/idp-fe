import { cva, type VariantProps } from 'class-variance-authority';

import { cn, LoadingEllipse, palette } from '@/features/core';

const buttonColors = {
  default: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-default-default-background',
      border: 'inset-ring-button-default-default-border inset-ring',
      text: 'text-button-default-default-label',
    },
    hover: {
      background: 'hover:bg-button-default-hover-background',
      border: 'hover:inset-ring-button-default-hover-border hover:inset-ring',
      text: 'hover:text-button-default-hover-label',
    },
    active: {
      background: 'active:bg-button-default-active-background',
      border:
        'active:inset-ring-button-default-active-border active:inset-ring',
      text: 'active:text-button-default-active-label',
    },
    loading: {
      background: loading && 'bg-button-default-loading-background',
      border: loading && 'inset-ring-button-default-loading-border inset-ring',
      text: loading && 'text-button-default-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-default-disabled-background',
      border:
        'disabled:inset-ring-button-default-disabled-border disabled:inset-ring',
      text: 'disabled:text-button-default-disabled-label',
    },
  })),
  primary: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-primary-default-background',
      border: 'inset-ring-button-primary-default-border inset-ring',
      text: 'text-button-primary-default-label',
    },
    hover: {
      background: 'hover:bg-button-primary-hover-background',
      border: 'hover:inset-ring-button-primary-hover-border hover:inset-ring',
      text: 'hover:text-button-primary-hover-label',
    },
    active: {
      background: 'active:bg-button-primary-active-background',
      border:
        'active:inset-ring-button-primary-active-border active:inset-ring',
      text: 'active:text-button-primary-active-label',
    },
    loading: {
      background: loading && 'bg-button-primary-loading-background',
      border: loading && 'inset-ring-button-primary-loading-border inset-ring',
      text: loading && 'text-button-primary-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-primary-disabled-background',
      border:
        'disabled:inset-ring-button-primary-disabled-border disabled:inset-ring',
      text: 'disabled:text-button-primary-disabled-label',
    },
  })),
  secondary: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-secondary-default-background',
      border: 'inset-ring-button-secondary-default-border inset-ring',
      text: 'text-button-secondary-default-label',
    },
    hover: {
      background: 'hover:bg-button-secondary-hover-background',
      border: 'hover:inset-ring-button-secondary-hover-border hover:inset-ring',
      text: 'hover:text-button-secondary-hover-label',
    },
    active: {
      background: 'active:bg-button-secondary-active-background',
      border:
        'active:inset-ring-button-secondary-active-border active:inset-ring',
      text: 'active:text-button-secondary-active-label',
    },
    loading: {
      background: loading && 'bg-button-secondary-loading-background',
      border:
        loading && 'inset-ring-button-secondary-loading-border inset-ring',
      text: loading && 'text-button-secondary-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-secondary-disabled-background',
      border:
        'disabled:inset-ring-button-secondary-disabled-border disabled:inset-ring',
      text: 'disabled:text-button-secondary-disabled-label',
    },
  })),
  text: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-text-default-background',
      border: 'inset-ring-button-text-default-border inset-ring',
      text: 'text-button-text-default-label',
    },
    hover: {
      background: 'hover:bg-button-text-hover-background',
      border: 'hover:inset-ring-button-text-hover-border hover:inset-ring',
      text: 'hover:text-button-text-hover-label',
    },
    active: {
      background: 'active:bg-button-text-active-background',
      border: 'active:inset-ring-button-text-active-border active:inset-ring',
      text: 'active:text-button-text-active-label',
    },
    loading: {
      background: loading && 'bg-button-text-loading-background',
      border: loading && 'inset-ring-button-text-loading-border inset-ring',
      text: loading && 'text-button-text-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-text-disabled-background',
      border:
        'disabled:inset-ring-button-text-disabled-border disabled:inset-ring',
      text: 'disabled:text-button-text-disabled-label',
    },
  })),
  link: palette((loading: boolean) => ({
    default: {
      background: 'bg-button-link-default-background',
      border: 'inset-ring-button-link-default-border inset-ring',
      text: 'text-button-link-default-label',
    },
    hover: {
      background: 'hover:bg-button-link-hover-background',
      border: 'hover:inset-ring-button-link-hover-border hover:inset-ring',
      text: 'hover:text-button-link-hover-label',
    },
    active: {
      background: 'active:bg-button-link-active-background',
      border: 'active:inset-ring-button-link-active-border active:inset-ring',
      text: 'active:text-button-link-active-label',
    },
    loading: {
      background: loading && 'bg-button-link-loading-background',
      border: loading && 'inset-ring-button-link-loading-border inset-ring',
      text: loading && 'text-button-link-loading-label',
    },
    disabled: {
      background: 'disabled:bg-button-link-disabled-background',
      border:
        'disabled:inset-ring-button-link-disabled-border disabled:inset-ring',
      text: 'disabled:text-button-link-disabled-label',
    },
  })),
};

const buttonStyles = cva(
  cn(
    'relative flex items-center justify-center text-center',
    'w-fit cursor-pointer rounded-lg',
    'transition duration-200',
  ),
  {
    variants: {
      variant: {
        default: 'text-title-3 px-5 py-3',
        primary: 'text-title-3 px-5 py-3',
        secondary: 'text-title-3 px-5 py-3',
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: NonNullable<VariantProps<typeof buttonStyles>['variant']>;
  loading?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  labelClassName?: string;
}

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
  const showEllipse = loading && variant !== 'link';

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
