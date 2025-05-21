import { RouterHistory, useRouter } from '@tanstack/react-router';

import UndoIcon from '@/assets/icons/line/arrow-left.svg?react';
import { cn } from '@/features/core';

interface BackButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onUndo?: (history: RouterHistory) => void;
}

export function BackButton({
  className,
  children,
  onClick,
  onUndo = (history) => {
    if (history.canGoBack()) history.back();
  },
  ...props
}: BackButtonProps) {
  const router = useRouter();

  return (
    <div
      className={cn('flex w-fit cursor-pointer items-center gap-1', className)}
      onClick={(e) => {
        onClick?.(e);
        onUndo?.(router.history);
      }}
      {...props}
    >
      <UndoIcon />
      <div className="text-body-2">{children}</div>
    </div>
  );
}
