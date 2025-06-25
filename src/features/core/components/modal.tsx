import { PropsWithChildren, createContext } from 'react';
import { useIsDesktop } from '../hooks/use-is-desktop';
import { Dialog } from './dialog';
import { BottomSheet } from './bottom-sheet';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
  key?: string;
}

export const ModalContext = createContext<Pick<ModalProps, 'close'> | null>(
  null,
);

function Modal({ close, children, ...props }: PropsWithChildren<ModalProps>) {
  const { isDesktop } = useIsDesktop();

  return (
    <ModalContext.Provider value={{ close }}>
      {isDesktop ? (
        <Dialog key="dialog" close={close} {...props}>
          {children}
        </Dialog>
      ) : (
        <BottomSheet key="bottom-sheet" close={close} {...props}>
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
