import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

import { cn } from '../utils/cn';

import { Backdrop } from './backdrop';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

export function Modal({
  open,
  onClose,
  children,
  className,
}: PropsWithChildren<ModalProps>) {
  return (
    <Backdrop open={open} onClose={onClose}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: 'spring',
          duration: 0.3,
          damping: 20,
          stiffness: 250,
        }}
        className={cn(
          'relative flex w-[400px] flex-col rounded-[20px] bg-white p-6 md:p-7',
          className,
        )}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}
