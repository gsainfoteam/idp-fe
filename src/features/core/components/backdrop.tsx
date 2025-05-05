import React, { PropsWithChildren } from 'react';

import { cn } from '../utils/cn';

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

export function Backdrop({
  open = true,
  children,
  className = '',
  ...props
}: PropsWithChildren<BackdropProps>) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-75',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      {...props}
    >
      <div
        className={cn(
          'bg-dimmed-50 absolute inset-0 h-full w-full transition-opacity duration-300',
          className,
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </div>
  );
}
