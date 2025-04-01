import { useRouter } from '@tanstack/react-router';

import UndoIcon from '../../../assets/arrow-left.svg?react';

import { cn } from '@/features/core';

type BackButtonProps = {
  label?: string;
};

export function BackButton({
  className,
  children,
  onClick,
  ...props
}: BackButtonProps & React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  return (
    <div
      className={cn('flex items-center w-fit cursor-pointer', className)}
      onClick={(e) => {
        if (router.history.canGoBack()) router.history.back();
        onClick?.(e);
      }}
      {...props}
    >
      <UndoIcon className="mr-1" />
      <div className="text-body-2">{children}</div>
    </div>
  );
}
