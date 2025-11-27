import { useEffect, useRef } from 'react';

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
  const eventRef = useRef(event);
  const openPropertiesRef = useRef(openProperties);

  useEffect(() => {
    eventRef.current = event;
    openPropertiesRef.current = openProperties;
  }, [event, openProperties]);

  useEffect(() => {
    if (!isOpen) return;
    Log.modal(`${eventRef.current}_open`, openPropertiesRef.current);
  }, [isOpen]);

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
