import { useEffect, useRef } from 'react';

import { BottomSheet } from '../compound/bottom-sheet';
import { type ModalProps } from '../compound/modal';

import { Log, type ModalEventMap } from '@/features/core';

type LogBottomSheetProps<
  TCloseValue,
  TEvent extends keyof ModalEventMap,
> = ModalProps<TCloseValue> & {
  event: TEvent;
  openProperties?: ModalEventMap[TEvent]['open'];
  closeProperties: (closeValue: TCloseValue) => ModalEventMap[TEvent]['close'];
};

export function LogBottomSheet<
  TCloseValue,
  TEvent extends keyof ModalEventMap,
>({
  event,
  openProperties = {} as ModalEventMap[TEvent]['open'],
  closeProperties,
  isOpen,
  close,
  defaultCloseValue,
  children,
  ...props
}: LogBottomSheetProps<TCloseValue, TEvent>) {
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
    <BottomSheet<TCloseValue>
      isOpen={isOpen}
      close={wrappedClose}
      defaultCloseValue={defaultCloseValue}
      {...props}
    >
      {children}
    </BottomSheet>
  );
}
