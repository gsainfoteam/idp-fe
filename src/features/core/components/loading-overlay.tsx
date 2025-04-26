import { PropsWithChildren } from 'react';

import { cn } from '../utils/cn';

export function LoadingOverlay({
  children,
  show,
}: PropsWithChildren<{ show: boolean }>) {
  return (
    <div
      className={cn(
        'transition-opacity duration-300',
        show ? 'pointer-events-none opacity-40' : 'opacity-100',
      )}
    >
      {children}
    </div>
  );
}
