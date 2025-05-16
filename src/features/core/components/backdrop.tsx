import { PropsWithChildren } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

import { cn } from '../utils/cn';

interface BackdropProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  open: boolean;
}

export function Backdrop({
  open,
  className,
  children,
  ...props
}: PropsWithChildren<BackdropProps>) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'bg-dimmed-50 fixed inset-0 z-50 h-full w-full',
            className,
          )}
          {...props}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="h-fit w-fit" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
