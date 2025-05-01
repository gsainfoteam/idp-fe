import { useRouter } from '@tanstack/react-router';

import UndoIcon from '@/assets/icons/arrow-left.svg?react';
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
      className={cn('flex w-fit cursor-pointer items-center gap-1', className)}
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
