import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

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
  return (
    <Backdrop open={open} onClose={onClose}>
      <motion.div
        initial={{ y: '150%' }}
        animate={{ y: 0 }}
        exit={{ y: '150%' }}
        transition={{
          type: 'spring',
          duration: 0.5,
          damping: 20,
          stiffness: 175,
        }}
        className={cn(
          'absolute right-0 bottom-0 left-0 mx-3 mb-3 flex flex-col rounded-[20px] bg-white px-5 pt-9 pb-5',
          className,
        )}
      >
        <div className="absolute top-2 left-1/2 h-1.5 w-12.5 -translate-x-1/2 rounded-full bg-neutral-200" />
        {children}
      </motion.div>
    </Backdrop>
  );
}
