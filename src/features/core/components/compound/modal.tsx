import { PropsWithChildren, createContext } from 'react';
import { useIsDesktop } from '../../hooks/use-is-desktop';
import { Dialog } from './dialog';
import { BottomSheet } from './bottom-sheet';
import { cn } from '../../utils/cn';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
  key?: string;
}

export const ModalContext = createContext<Pick<ModalProps, 'close'> | null>(
  null,
);

function Modal({
  close,
  children,
  className,
  dialogClassName,
  bottomSheetClassName,
  key,
  ...props
}: PropsWithChildren<
  ModalProps & { dialogClassName?: string; bottomSheetClassName?: string }
>) {
  const { isDesktop } = useIsDesktop();

  return (
    <ModalContext.Provider value={{ close }}>
      {isDesktop ? (
        <Dialog
          key={key}
          close={close}
          className={cn(className, dialogClassName)}
          {...props}
        >
          {children}
        </Dialog>
      ) : (
        <BottomSheet
          key={key}
          close={close}
          className={cn(className, bottomSheetClassName)}
          {...props}
        >
          {children}
        </BottomSheet>
      )}
    </ModalContext.Provider>
  );
}

Modal.Header = ({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Header : BottomSheet.Header;

  return <Wrapper {...props}>{children}</Wrapper>;
};

Modal.Body = ({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Body : BottomSheet.Body;

  return <Wrapper {...props}>{children}</Wrapper>;
};

Modal.Footer = ({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Footer : BottomSheet.Footer;

  return <Wrapper {...props}>{children}</Wrapper>;
};

Modal.Close = ({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Close : BottomSheet.Close;

  return <Wrapper {...props}>{children}</Wrapper>;
};

export { Modal };
