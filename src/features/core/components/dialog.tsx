import { createContext, PropsWithChildren, useContext } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Backdrop } from './backdrop';

interface DialogContextType {
  close: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

const Dialog = ({
  isOpen,
  close,
  children,
  className,
}: PropsWithChildren<DialogProps>) => {
  return (
    <DialogContext.Provider value={{ close }}>
      <Backdrop isOpen={isOpen} close={close}>
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
            'bg-dialog-background relative flex w-fit flex-col rounded-[20px]',
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
  const context = useContext(DialogContext);
  if (!context) throw new Error('Dialog.Close must be used within a Dialog');

  return (
    <div
      onClick={(e) => {
        onClick?.(e);
        context.close();
      }}
      className={cn('w-full cursor-pointer', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Dialog };
