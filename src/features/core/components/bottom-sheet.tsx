import { PropsWithChildren, useEffect } from 'react';

import { cn } from '../utils/cn';

import { Backdrop } from './backdrop';

interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export function BottomSheet({
  open,
  onClose,
  children,
  className,
}: PropsWithChildren<BottomSheetProps>) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [open, onClose]);

  return (
    <Backdrop open={open} onClick={onClose}>
      <div
        className={cn(
          'absolute right-0 bottom-0 left-0 mx-3 mb-3 flex flex-col rounded-[20px] bg-white px-5 pt-9 pb-5',
          className,
        )}
      >
        <div className="absolute top-2 left-1/2 h-1.5 w-12.5 -translate-x-1/2 rounded-full bg-neutral-200" />
        {children}
      </div>
    </Backdrop>
  );
}
