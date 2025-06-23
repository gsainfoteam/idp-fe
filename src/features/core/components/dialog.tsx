import { createContext, PropsWithChildren, useContext } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Backdrop } from './backdrop';
import { ModalProps } from './modal';
import { ModalContext } from './modal';

const DialogContext = createContext<Pick<ModalProps, 'close'> | null>(null);

const Dialog = ({
  isOpen,
  close,
  children,
  className,
  key,
}: PropsWithChildren<ModalProps>) => {
  return (
    <DialogContext.Provider value={{ close }}>
      <Backdrop isOpen={isOpen} close={close}>
        <motion.div
          key={key}
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
            'bg-dialog-background relative mx-10 flex w-fit flex-col rounded-[20px]',
            className,
          )}
        >
          {children}
        </motion.div>
      </Backdrop>
    </DialogContext.Provider>
  );
};

Dialog.Header = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        'text-title-1 w-full px-6 pt-6 pb-2 text-pretty whitespace-pre-wrap text-neutral-950',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Dialog.Body = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        'text-body-1 w-full px-6 py-2 text-pretty whitespace-pre-wrap text-neutral-600',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Dialog.Footer = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn('flex w-full gap-3 px-5 pt-3 pb-5', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Dialog.Close = ({
  children,
  className,
  onClick,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const dialogContext = useContext(DialogContext);
  const modalContext = useContext(ModalContext);
  const contexts = [dialogContext, modalContext].filter((v) => v !== null);

  if (contexts.length === 0)
    throw new Error('Dialog.Close must be used within a Dialog or Modal');

  return (
    <div
      onClick={(e) => {
        onClick?.(e);
        contexts.forEach((context) => context.close());
      }}
      className={cn('w-fit cursor-pointer', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Dialog };
