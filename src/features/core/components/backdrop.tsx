import { PropsWithChildren, useEffect } from 'react';
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
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
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
          onClick={(e) => {
            onClick?.(e);
            onClose();
          }}
          {...props}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="h-fit w-fit" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence propagate>{children}</AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
