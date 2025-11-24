import { useEffect } from 'react';

import { Log, type ModalEventMap } from '@/features/core';

import { Modal } from '../compound/modal';
import { ModalProps } from '../compound/modal';

type LogModalProps<T extends keyof ModalEventMap, TCloseValue = void> = Omit<
  ModalProps<TCloseValue>,
  'isOpen' | 'close'
> & {
  event: T;
  openProperties?: ModalEventMap[T]['open'];
  closeProperties: (closeValue: TCloseValue) => ModalEventMap[T]['close'];
  isOpen: boolean;
  close: ModalProps<TCloseValue>['close'];
  defaultCloseValue: [TCloseValue] extends [void] ? never : TCloseValue;
  dialogClassName?: string;
  bottomSheetClassName?: string;
};

export function LogModal<T extends keyof ModalEventMap, TCloseValue = void>({
  event,
  openProperties = {} as ModalEventMap[T]['open'],
  closeProperties,
  isOpen,
  close,
  defaultCloseValue,
  children,
  dialogClassName,
  bottomSheetClassName,
  ...props
}: LogModalProps<T, TCloseValue>) {
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
    <Modal<TCloseValue>
      isOpen={isOpen}
      close={wrappedClose}
      defaultCloseValue={defaultCloseValue}
      dialogClassName={dialogClassName}
      bottomSheetClassName={bottomSheetClassName}
      {...props}
    >
      {children}
    </Modal>
  );
}

LogModal.Header = Modal.Header;
LogModal.Body = Modal.Body;
LogModal.Footer = Modal.Footer;
LogModal.Close = Modal.Close;
