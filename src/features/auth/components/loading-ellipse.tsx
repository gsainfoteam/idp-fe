import { cn } from '@/features/core';

export function LoadingEllipse({ color }: { color: `bg-${string}` }) {
  return (
    <div className="w-13 h-6 p-2.5 flex gap-2.5 items-center">
      <div className={cn('w-1 h-1 rounded-full', color, 'animate-ping1')} />
      <div className={cn('w-1 h-1 rounded-full', color, 'animate-ping2')} />
      <div className={cn('w-1 h-1 rounded-full', color, 'animate-ping3')} />
    </div>
  );
}
