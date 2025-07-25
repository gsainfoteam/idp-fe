import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { motion, PanInfo, useAnimationControls } from 'framer-motion';
import { cn } from '../utils/cn';
import { Backdrop } from './backdrop';
import { ModalProps } from './modal';
import { ModalContext } from './modal';

const BottomSheetContext = createContext<Pick<ModalProps, 'close'> | null>(
  null,
);

const BottomSheet = ({
  isOpen,
  close,
  children,
  className,
  key,
}: PropsWithChildren<ModalProps>) => {
  const controls = useAnimationControls();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) close();
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
      controls.set({ y: vh });
      controls.start({
        y: 0,
        transition: {
          duration: 0.5,
          type: 'spring',
          damping: 20,
          stiffness: 175,
        },
      });
    }
  }, [isOpen, controls]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 120;

    if (info.offset.y > threshold) {
      close();
    } else {
      controls.start({
        y: 0,
        transition: { type: 'spring', damping: 20, stiffness: 175 },
      });
    }
  };

  return (
    <BottomSheetContext.Provider value={{ close }}>
      <Backdrop isOpen={isOpen} close={close}>
        <motion.div
          key={key}
          animate={controls}
          drag="y"
          exit={{
            y: typeof window !== 'undefined' ? window.innerHeight : 0,
            transition: { duration: 0.3 },
          }}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragStart={() => controls.stop()}
          onDragEnd={handleDragEnd}
          className={cn(
            'bg-modal-background fixed inset-x-0 bottom-0 z-50 mx-3 mb-3 flex flex-col rounded-[20px] pt-9 shadow-xl',
            className,
          )}
        >
          <div className="bg-modal-handle absolute top-3 left-1/2 h-1 w-12.5 -translate-x-1/2 rounded-full" />
          {children}
        </motion.div>
      </Backdrop>
    </BottomSheetContext.Provider>
  );
};

BottomSheet.Header = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        'text-title-1 text-modal-header w-full px-5 pb-3 text-pretty whitespace-pre-wrap',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

BottomSheet.Body = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        'text-body-1 text-modal-body w-full px-5 pb-3 text-pretty whitespace-pre-wrap',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

BottomSheet.Footer = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn('flex w-full justify-end gap-3 px-5 pt-5 pb-5', className)}
      {...props}
    >
      {children}
    </div>
  );
};

BottomSheet.Close = ({
  children,
  className,
  onClick,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const bottomSheetContext = useContext(BottomSheetContext);
  const modalContext = useContext(ModalContext);
  const contexts = [bottomSheetContext, modalContext].filter((v) => v !== null);

  if (contexts.length === 0)
    throw new Error(
      'BottomSheet.Close must be used within a BottomSheet or Modal',
    );

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

export { BottomSheet };
