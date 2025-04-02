import { cn } from '@/features/core';

export function LoadingEllipse({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex h-6 w-13 items-center gap-2.5 p-2.5" {...props}>
      <div className={cn('h-1 w-1 rounded-full', 'animate-ping1', className)} />
      <div className={cn('h-1 w-1 rounded-full', 'animate-ping2', className)} />
      <div className={cn('h-1 w-1 rounded-full', 'animate-ping3', className)} />
    </div>
  );
}
