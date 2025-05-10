import React, { PropsWithChildren } from 'react';

import { cn } from '../utils/cn';

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export function Backdrop({
  open,
  children,
  className,
  ...props
}: PropsWithChildren<BackdropProps>) {
  if (!open) return null;

  return (
    <div
      className={cn('bg-dimmed-50 fixed inset-0 z-50 h-full w-full', className)}
      {...props}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-fit w-fit" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}
