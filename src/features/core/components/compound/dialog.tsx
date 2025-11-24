import { PropsWithChildren, createContext, useContext } from 'react';

import { motion } from 'framer-motion';

import { cn } from '../../utils/cn';
import { Backdrop } from '../atomic/backdrop';
import { ModalContext, ModalContextValue, ModalProps } from './modal';

export type DialogContextValue<TCloseValue> = Pick<
  ModalProps<TCloseValue>,
  'close'
> | null;

const DialogContext = createContext<DialogContextValue<any>>(null);

function DialogComponent<TCloseValue>(
  props: PropsWithChildren<ModalProps<TCloseValue>>,
) {
  const { isOpen, close, defaultCloseValue, children, className, key } = props;

  return (
    <DialogContext.Provider value={{ close } as DialogContextValue<any>}>
      <Backdrop isOpen={isOpen} close={() => close(defaultCloseValue)}>
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
            'bg-modal-background relative mx-10 flex w-fit flex-col rounded-[20px]',
            className,
          )}
        >
          {children}
        </motion.div>
      </Backdrop>
    </DialogContext.Provider>
  );
}

function DialogHeader({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'text-title-1 text-modal-header w-full px-6 pt-6 pb-2 text-pretty whitespace-pre-wrap',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogBody({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'text-body-1 text-modal-body w-full px-6 py-2 text-pretty whitespace-pre-wrap',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogFooter({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn('flex w-full gap-3 px-5 pt-3 pb-5', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogClose<TCloseValue>({
  children,
  className,
  onClick,
  closeValue,
  ...props
}: PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    closeValue: TCloseValue;
  }
>) {
  const dialogContext = useContext(
    DialogContext,
  ) as DialogContextValue<TCloseValue>;
  const modalContext = useContext(
    ModalContext,
  ) as ModalContextValue<TCloseValue>;

  const contexts = [dialogContext, modalContext].filter((v) => v !== null);
  if (contexts.length === 0)
    throw new Error('Dialog.Close must be used within a Dialog or Modal');

  return (
    <div
      onClick={(e) => {
        onClick?.(e);
        contexts.forEach((context) => {
          context.close(closeValue as TCloseValue);
        });
      }}
      className={cn('w-fit cursor-pointer', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export const Dialog = Object.assign(DialogComponent, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});
