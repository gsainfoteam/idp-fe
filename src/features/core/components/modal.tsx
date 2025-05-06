import { PropsWithChildren } from 'react';

import { cn } from '../utils/cn';

import { Backdrop } from './backdrop';

import ExitIcon from '@/assets/icons/line/exit.svg?react';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title: string;
  button: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  button,
  children,
  className,
  ...props
}: PropsWithChildren<ModalProps>) {
  return (
    <Backdrop open={open} onClose={onClose}>
      <div
        className={cn('flex flex-col rounded-2xl bg-white p-7', className)}
        {...props}
      >
        <div className="relative flex w-full flex-col gap-2.5">
          <div className="absolute top-0 right-0 cursor-pointer">
            <ExitIcon color="var(--color-neutral-600)" onClick={onClose} />
          </div>
          <div className="text-title-1 w-full text-pretty text-neutral-950">
            {title}
          </div>
          <div className="text-body-2 w-full text-pretty text-neutral-800">
            {children}
          </div>
        </div>
        <div className="mt-auto w-full">{button}</div>
      </div>
    </Backdrop>
  );
}
