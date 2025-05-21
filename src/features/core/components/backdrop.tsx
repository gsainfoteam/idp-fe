import { PropsWithChildren, useEffect, useRef } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';

import { cn } from '../utils/cn';

interface BackdropProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  open: boolean;
  onClose: () => void;
}

export function Backdrop({
  open,
  onClose,
  className,
  onClick,
  children,
  ...props
}: PropsWithChildren<BackdropProps>) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const pointerDownRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) onClose();
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
          }}
          className={cn(
            'bg-dimmed-50 fixed inset-0 z-50 h-full w-full',
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
              onClose();
            }
          }}
          {...props}
        >
          <div
            ref={backdropRef}
            className="relative flex h-full w-full items-center justify-center"
          >
            <div className="h-fit w-fit" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence propagate>{children}</AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
