import { useEffect } from 'react';

import { Dialog } from '../compound/dialog';
import { type ModalProps } from '../compound/modal';

import { Log, type ModalEventMap } from '@/features/core';

type LogDialogProps<
  TCloseValue,
  TEvent extends keyof ModalEventMap,
> = ModalProps<TCloseValue> & {
  event: TEvent;
  openProperties?: ModalEventMap[TEvent]['open'];
  closeProperties: (closeValue: TCloseValue) => ModalEventMap[TEvent]['close'];
};

export function LogDialog<TCloseValue, TEvent extends keyof ModalEventMap>({
  event,
  openProperties = {} as ModalEventMap[TEvent]['open'],
  closeProperties,
  isOpen,
  close,
  defaultCloseValue,
  children,
  ...props
}: LogDialogProps<TCloseValue, TEvent>) {
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
