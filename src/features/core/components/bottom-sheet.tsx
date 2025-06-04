import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { motion, PanInfo, useAnimationControls } from 'framer-motion';
import { cn } from '../utils/cn';
import { Backdrop } from './backdrop';

interface BottomSheetContextType {
  close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

const BottomSheet = ({
  isOpen,
  close,
  children,
  className,
}: PropsWithChildren<BottomSheetProps>) => {
  const controls = useAnimationControls();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) close();
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, close]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 100;

    if (info.offset.y > threshold) close();
    else controls.start({ y: 0 });
  };

  return (
    <BottomSheetContext.Provider value={{ close }}>
      <Backdrop isOpen={isOpen} close={close}>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
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
            'bg-bottom-sheet-background fixed inset-x-0 bottom-0 z-50 mx-3 mb-3 flex flex-col rounded-[20px] pt-9 shadow-xl',
            className,
          )}
        >
          <div className="bg-bottom-sheet-handle absolute top-2 left-1/2 h-1.5 w-12.5 -translate-x-1/2 rounded-full" />
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
        'text-title-1 w-full px-5 pb-3 text-pretty whitespace-pre-wrap text-neutral-950',
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
        'text-body-1 w-full px-5 pb-3 text-pretty whitespace-pre-wrap text-neutral-600',
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
  const context = useContext(BottomSheetContext);
  if (!context)
    throw new Error('BottomSheet.Close must be used within a BottomSheet');

  return (
    <div
      onClick={(e) => {
        onClick?.(e);
        context.close();
      }}
      className={cn('w-fit cursor-pointer', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { BottomSheet };
