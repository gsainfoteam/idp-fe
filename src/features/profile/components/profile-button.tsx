import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';

import { Button } from '@/features/core';

interface ProfileButtonProps {
  to?: string;
  icon: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  children: ReactNode;
}

export function ProfileButton({
  to,
  icon,
  onClick,
  variant = 'default',
  children,
}: ProfileButtonProps) {
  const buttonContent = (
    <Button
      variant="primary"
      className={`w-full justify-start px-4 py-3 ${
        variant === 'default'
          ? 'bg-neutral-50 active:bg-neutral-100'
          : 'bg-red-50 active:bg-red-100'
      }`}
      labelClassName={`gap-3 text-body-1 ${
        variant === 'default' ? 'text-neutral-950' : 'text-red-900'
      }`}
      prefixIcon={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  if (to) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
}
