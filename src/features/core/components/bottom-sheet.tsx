import { PropsWithChildren } from 'react';

import { cn } from '../utils/cn';

import { Backdrop } from './backdrop';

interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title: string;
  button: React.ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  button,
  children,
  className,
  ...props
}: PropsWithChildren<BottomSheetProps>) {
  return (
    <Backdrop open={open} onClose={onClose}>
      <div
        className={cn(
          'relative rounded-[20px] bg-white px-5 pt-9 pb-5',
          className,
        )}
        {...props}
      >
        <div className="absolute top-2 left-1/2 h-1.5 w-12.5 -translate-x-1/2 rounded-full bg-neutral-200" />
        <div className="flex w-full flex-col gap-2">
          <div className="text-title-1 w-full text-pretty whitespace-pre-wrap text-neutral-950">
            {title}
          </div>
          <div className="text-body-2 w-full text-pretty text-neutral-800">
            {children}
          </div>
        </div>
        <div className="mt-10 w-full">{button}</div>
      </div>
    </Backdrop>
  );
}
