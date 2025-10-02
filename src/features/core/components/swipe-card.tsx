import { PropsWithChildren, useState } from 'react';

import {
  MotionProps,
  motion,
  useAnimationControls,
  useMotionValue,
} from 'framer-motion';

import { cn } from '../utils/cn';

interface SwipeAction {
  bg: string;
  content: React.ReactNode;
  onClick: () => Promise<void>;
}

interface SwipeCardProps extends PropsWithChildren<MotionProps> {
  avatar: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  className?: string;

  actionWidth?: number;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];

  onClick?: () => void;
}

export function SwipeCard({
  avatar,
  icon,
  className,
  children,

  actionWidth = 80,
  leftActions = [],
  rightActions = [],
  onClick,
  onDragStart,
  onDragEnd,
  ...props
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const controls = useAnimationControls();

  const leftWidth = leftActions.length * actionWidth;
  const rightWidth = rightActions.length * actionWidth;
  const bonusWidth = 5; // border radius 커버용 여유 공간

  const [dragStarted, setDragStarted] = useState(false);

  const close = () =>
    controls.start({
      x: 0,
      transition: { type: 'spring', stiffness: 500, damping: 38 },
    });

  const handleDragEnd = () => {
    const current = x.get();

    if (current > 0) {
      if (current % actionWidth > actionWidth / 2) {
        // 오른쪽으로 충분히 드래그했을 때
        controls.start({
          x: current + (actionWidth - (current % actionWidth)),
          transition: { type: 'spring', stiffness: 400, damping: 40 },
        });
      } else {
        controls.start({
          x: current - (current % actionWidth),
          transition: { type: 'spring', stiffness: 400, damping: 40 },
        });
      }
    } else if (current < 0) {
      if (current % actionWidth < -actionWidth / 2) {
        // 왼쪽으로 충분히 드래그했을 때
        controls.start({
          x: current - (actionWidth + (current % actionWidth)),
          transition: { type: 'spring', stiffness: 400, damping: 40 },
        });
      } else {
        controls.start({
          x: current - (current % actionWidth),
          transition: { type: 'spring', stiffness: 400, damping: 40 },
        });
      }
    } else {
      close();
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg touch-pan-y">
      {leftActions.length > 0 && (
        <div
          className="absolute top-0 bottom-0 left-0 flex"
          style={{ width: leftWidth + bonusWidth }}
        >
          {leftActions.map((action, i) => (
            <button
              key={`left-${i}`}
              className="flex justify-center items-center cursor-pointer"
              onClick={async () => {
                await action.onClick();
                await close();
              }}
              style={{
                width:
                  actionWidth + (i == leftActions.length - 1 ? bonusWidth : 0),
                background: action.bg,
              }}
            >
              {action.content}
            </button>
          ))}
        </div>
      )}

      {rightActions.length > 0 && (
        <div
          className="absolute top-0 bottom-0 right-0 flex justify-end"
          style={{ width: rightWidth + bonusWidth }}
        >
          {rightActions.map((action, i) => (
            <button
              key={`right-${i}`}
              className="flex justify-center items-center cursor-pointer"
              onClick={async () => {
                await action.onClick();
                await close();
              }}
              style={{
                width:
                  actionWidth + (i == rightActions.length - 1 ? bonusWidth : 0),
                background: action.bg,
              }}
            >
              {action.content}
            </button>
          ))}
        </div>
      )}

      <motion.div
        drag="x"
        dragConstraints={{ left: -rightWidth, right: leftWidth }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={(e, info) => {
          setDragStarted(true);
          onDragStart?.(e, info);
        }}
        onDragEnd={(_, info) => {
          setDragStarted(false);

          // 작은 드래그는 클릭으로 처리 (모바일 고려)
          if (Math.abs(info.offset.x) < 5 && !dragStarted) {
            onClick?.();
          }

          handleDragEnd();
          onDragEnd?.(_, info);
        }}
        onTap={() => {
          if (!dragStarted) onClick?.();
        }}
        animate={controls}
        style={{ x }}
        className={cn(
          'relative bg-funnel-background border-basics-tertiary-label flex items-center gap-3 rounded-lg border p-3 w-full',
          leftActions.length + rightActions.length > 0 &&
            'cursor-grab active:cursor-grabbing',
          className,
        )}
        {...props}
      >
        <div>{avatar}</div>
        <div className="min-w-0 flex-1">{children}</div>
        {icon}
      </motion.div>
    </div>
  );
}
