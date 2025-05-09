import { PropsWithChildren } from 'react';

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
  return (
    <Backdrop open={open} onClick={onClose}>
      <div
        className={cn(
          'flex w-[400px] flex-col rounded-[20px] bg-white p-6',
          className,
        )}
      >
        {children}
      </div>
    </Backdrop>
  );
}
