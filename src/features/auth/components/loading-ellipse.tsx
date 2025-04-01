import { cn } from '@/features/core';

export function LoadingEllipse({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-13 h-6 p-2.5 flex gap-2.5 items-center" {...props}>
      <div className={cn('w-1 h-1 rounded-full', 'animate-ping1', className)} />
      <div className={cn('w-1 h-1 rounded-full', 'animate-ping2', className)} />
      <div className={cn('w-1 h-1 rounded-full', 'animate-ping3', className)} />
    </div>
  );
}
