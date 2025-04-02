import { cn } from '@/features/core';

export function LoadingEllipse({ color }: { color: `bg-${string}` }) {
  return (
    <div className="flex h-6 w-13 items-center gap-2.5 p-2.5">
      <div className={cn('h-1 w-1 rounded-full', color, 'animate-ping1')} />
      <div className={cn('h-1 w-1 rounded-full', color, 'animate-ping2')} />
      <div className={cn('h-1 w-1 rounded-full', color, 'animate-ping3')} />
    </div>
  );
}
