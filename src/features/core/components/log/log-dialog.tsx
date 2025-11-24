import { useEffect } from 'react';

import { Log, type ModalEventMap } from '@/features/core';

import { Dialog } from '../compound/dialog';
import { ModalProps } from '../compound/modal';

type LogDialogProps<T extends keyof ModalEventMap, TCloseValue = void> = Omit<
  ModalProps<TCloseValue>,
  'isOpen' | 'close'
> & {
  event: T;
  openProperties?: ModalEventMap[T]['open'];
  closeProperties: (closeValue: TCloseValue) => ModalEventMap[T]['close'];
  isOpen: boolean;
  close: ModalProps<TCloseValue>['close'];
  defaultCloseValue: [TCloseValue] extends [void] ? never : TCloseValue;
};

export function LogDialog<T extends keyof ModalEventMap, TCloseValue = void>({
  event,
  openProperties = {} as ModalEventMap[T]['open'],
  closeProperties,
  isOpen,
  close,
  defaultCloseValue,
  children,
  ...props
}: LogDialogProps<T, TCloseValue>) {
  useEffect(() => {
    if (isOpen) {
      Log.modal(`${event}_open`, openProperties);
    }
  }, [isOpen, event, openProperties]);

  const wrappedClose: ModalProps<TCloseValue>['close'] = ((
    value: TCloseValue,
  ) => {
    const closeProps = closeProperties(value);
    Log.modal(`${event}_close`, closeProps);
    close(value);
  }) as ModalProps<TCloseValue>['close'];

  return (
    <Dialog<TCloseValue>
      isOpen={isOpen}
      close={wrappedClose}
      defaultCloseValue={defaultCloseValue}
      {...props}
    >
      {children}
    </Dialog>
  );
}

LogDialog.Header = Dialog.Header;
LogDialog.Body = Dialog.Body;
LogDialog.Footer = Dialog.Footer;
LogDialog.Close = Dialog.Close;
