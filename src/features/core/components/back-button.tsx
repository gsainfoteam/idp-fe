import { RouterHistory, useRouter } from '@tanstack/react-router';

import UndoIcon from '@/assets/icons/line/arrow-left.svg?react';
import { cn } from '@/features/core';

export function BackButton({
  className,
  children,
  onClick,
  onUndoClick = (history) => {
    if (history.canGoBack()) history.back();
  },
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  onUndoClick?: (history: RouterHistory) => void;
}) {
  const router = useRouter();

  return (
    <div
      className={cn('flex w-fit cursor-pointer items-center gap-1', className)}
      onClick={(e) => {
        onClick?.(e);
        onUndoClick?.(router.history);
      }}
      {...props}
    >
      <UndoIcon />
      <div className="text-body-2">{children}</div>
    </div>
  );
}
