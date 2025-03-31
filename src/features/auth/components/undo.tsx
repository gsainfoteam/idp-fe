import UndoIcon from '../../../assets/undo.svg?react';

import { cn } from '@/features/core';

type UndoProps = {
  label?: string;
};

export function Undo({
  className,
  children,
  onClick,
  ...props
}: UndoProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center w-fit cursor-pointer', className)}
      onClick={onClick}
      {...props}
    >
      <UndoIcon className="mr-1" />
      <div className="text-body-2">{children}</div>
    </div>
  );
}
