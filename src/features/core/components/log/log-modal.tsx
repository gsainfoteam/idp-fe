import { useEffect } from 'react';

import { Log, type ModalEventMap } from '@/features/core';

import { Modal, ModalProps } from '../compound/modal';

type LogModalProps<
  TCloseValue,
  TEvent extends keyof ModalEventMap,
> = ModalProps<TCloseValue> & {
  event: TEvent;
  openProperties?: ModalEventMap[TEvent]['open'];
  closeProperties: (closeValue: TCloseValue) => ModalEventMap[TEvent]['close'];
};

function LogModalComponent<TCloseValue, TEvent extends keyof ModalEventMap>({
  event,
  openProperties = {} as ModalEventMap[TEvent]['open'],
  closeProperties,
  isOpen,
  close,
  defaultCloseValue,
  children,
  dialogClassName,
  bottomSheetClassName,
  ...props
}: LogModalProps<TCloseValue, TEvent>) {
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

export const LogModal = Object.assign(LogModalComponent, {
  Header: Modal.Header,
  Body: Modal.Body,
  Footer: Modal.Footer,
  Close: Modal.Close,
});
