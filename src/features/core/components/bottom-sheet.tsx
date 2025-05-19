import { PropsWithChildren, useEffect } from 'react';
import { motion, PanInfo, useAnimationControls } from 'framer-motion';

import { cn } from '../utils/cn';

import { Backdrop } from './backdrop';

interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export function BottomSheet({
  open,
  onClose,
  children,
  className,
}: PropsWithChildren<BottomSheetProps>) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (open) controls.start({ y: 0 });
  }, [open, controls]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 100;

    if (info.offset.y > threshold) onClose();
    else controls.start({ y: 0 });
  };

  return (
    <Backdrop open={open} onClose={onClose}>
      <motion.div
        initial={{ y: '100%' }}
        animate={controls}
        exit={{ y: '100%' }}
        transition={{
          type: 'spring',
          duration: 0.5,
          damping: 20,
          stiffness: 175,
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mx-3 mb-3 flex flex-col rounded-[20px] bg-white px-5 pt-9 pb-5 shadow-xl',
          className,
        )}
      >
        <div className="absolute top-2 left-1/2 h-1.5 w-12.5 -translate-x-1/2 rounded-full bg-neutral-200" />
        {children}
      </motion.div>
    </Backdrop>
  );
}
