import { PropsWithChildren, useEffect } from 'react';

import { cn } from '../utils/cn';

import { Backdrop } from './backdrop';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export function Modal({
  open,
  onClose,
  children,
  className,
}: PropsWithChildren<ModalProps>) {
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
          'flex w-[400px] flex-col rounded-[20px] bg-white p-5 md:p-6',
          className,
        )}
      >
        {children}
      </div>
    </Backdrop>
  );
}
