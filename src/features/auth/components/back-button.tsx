import { useRouter } from '@tanstack/react-router';

import UndoIcon from '../../../assets/arrow-left.svg?react';

import { cn } from '@/features/core';

export function BackButton({
  className,
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  return (
    <div
      className={cn('flex gap-1 items-center w-fit cursor-pointer', className)}
      onClick={(e) => {
        if (router.history.canGoBack()) router.history.back();
        onClick?.(e);
      }}
      {...props}
    >
      <UndoIcon />
      <div className="text-body-2">{children}</div>
    </div>
  );
}
