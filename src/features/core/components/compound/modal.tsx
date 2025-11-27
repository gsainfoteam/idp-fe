import { type HTMLAttributes, type PropsWithChildren } from 'react';

import {
  ModalContext,
  type ModalContextValue,
} from '../../context/modal-context';
import { useIsDesktop } from '../../hooks/use-is-desktop';
import { cn } from '../../utils/cn';

import { BottomSheet } from './bottom-sheet';
import { Dialog } from './dialog';

export type ModalProps<TCloseValue> = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  close: (value: TCloseValue) => void;
  defaultCloseValue: TCloseValue;
  key?: string;
  dialogClassName?: string;
  bottomSheetClassName?: string;
};

function ModalComponent<TCloseValue>({
  close,
  defaultCloseValue,
  children,
  className,
  dialogClassName,
  bottomSheetClassName,
  key,
  ...props
}: PropsWithChildren<ModalProps<TCloseValue>>) {
  const { isDesktop } = useIsDesktop();

  return (
    <ModalContext.Provider value={{ close } as ModalContextValue<unknown>}>
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

function ModalClose<TCloseValue>({
  children,
  closeValue,
  ...props
}: PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    closeValue: TCloseValue;
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
