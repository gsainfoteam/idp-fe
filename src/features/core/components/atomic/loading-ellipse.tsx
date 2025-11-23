import { cn } from '@/features/core';

interface LoadingEllipseProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
}

export function LoadingEllipse({
  className,
  containerClassName,
  ...props
}: LoadingEllipseProps) {
  return (
    <div
      className={cn('flex h-fit w-full items-center gap-2', containerClassName)}
      {...props}
    >
      <div className={cn('animate-ping1 h-1 w-1 rounded-full', className)} />
      <div className={cn('animate-ping2 h-1 w-1 rounded-full', className)} />
      <div className={cn('animate-ping3 h-1 w-1 rounded-full', className)} />
    </div>
  );
}
