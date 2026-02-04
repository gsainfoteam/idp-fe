import { AnimatePresence, type HTMLMotionProps, motion } from 'framer-motion';
import { type PropsWithChildren, useEffect, useRef } from 'react';

import { cn } from '../../utils/cn';

interface BackdropProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  isOpen: boolean;
  close: () => void;
}

export function Backdrop({
  isOpen,
  close,
  className,
  onClick,
  children,
  ...props
}: PropsWithChildren<BackdropProps>) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const pointerDownRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) close();
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
          }}
          className={cn(
            'fixed inset-0 z-50 h-full w-full bg-black/50',
            className,
          )}
          onPointerDown={(e) => {
            pointerDownRef.current = e.target;
          }}
          onPointerUp={(e) => {
            const pointerDown = pointerDownRef.current;
            const pointerUp = e.target;
            const backdrop = backdropRef.current;
            pointerDownRef.current = null;

            if (pointerDown === backdrop && pointerUp === backdrop) {
              onClick?.(e);
              close();
            }
          }}
          {...props}
        >
          <div
            ref={backdropRef}
            className="relative flex h-full w-full items-center justify-center px-5"
          >
            <div
              className="mx-auto h-fit w-full max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence propagate>{children}</AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
