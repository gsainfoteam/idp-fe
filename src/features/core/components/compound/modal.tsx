import { PropsWithChildren, createContext } from 'react';

import { useIsDesktop } from '../../hooks/use-is-desktop';
import { cn } from '../../utils/cn';
import { BottomSheet } from './bottom-sheet';
import { Dialog } from './dialog';

export type ModalProps<TCloseValue = void> =
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    close: [TCloseValue] extends [void]
      ? () => void
      : (value: TCloseValue) => void;
    defaultCloseValue: [TCloseValue] extends [void] ? never : TCloseValue;
    key?: string;
  };

export type ModalContextValue<TCloseValue = void> = Pick<
  ModalProps<TCloseValue>,
  'close'
> | null;

export const ModalContext = createContext<ModalContextValue<any>>(null);

function ModalComponent<TCloseValue = void>({
  close,
  defaultCloseValue,
  children,
  className,
  dialogClassName,
  bottomSheetClassName,
  key,
  ...props
}: PropsWithChildren<
  ModalProps<TCloseValue> & {
    dialogClassName?: string;
    bottomSheetClassName?: string;
  }
>) {
  const { isDesktop } = useIsDesktop();

  return (
    <ModalContext.Provider value={{ close } as ModalContextValue<any>}>
      {isDesktop ? (
        <Dialog<TCloseValue>
          key={key}
          close={close}
          defaultCloseValue={defaultCloseValue}
          className={cn(className, dialogClassName)}
          {...props}
        >
          {children}
        </Dialog>
      ) : (
        <BottomSheet<TCloseValue>
          key={key}
          close={close}
          defaultCloseValue={defaultCloseValue}
          className={cn(className, bottomSheetClassName)}
          {...props}
        >
          {children}
        </BottomSheet>
      )}
    </ModalContext.Provider>
  );
}

function ModalHeader({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Header : BottomSheet.Header;

  return <Wrapper {...props}>{children}</Wrapper>;
}

function ModalBody({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Body : BottomSheet.Body;

  return <Wrapper {...props}>{children}</Wrapper>;
}

function ModalFooter({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Footer : BottomSheet.Footer;

  return <Wrapper {...props}>{children}</Wrapper>;
}

function ModalClose<TCloseValue = void>({
  children,
  closeValue,
  ...props
}: PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    closeValue?: TCloseValue;
  }
>) {
  const { isDesktop } = useIsDesktop();
  const Wrapper = isDesktop ? Dialog.Close : BottomSheet.Close;

  return (
    <Wrapper<TCloseValue> closeValue={closeValue} {...props}>
      {children}
    </Wrapper>
  );
}

export const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
});
