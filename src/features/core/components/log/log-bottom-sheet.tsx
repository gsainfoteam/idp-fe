import { useEffect } from 'react';

import { Log, type ModalEventMap } from '@/features/core';

import { BottomSheet } from '../compound/bottom-sheet';
import { ModalProps } from '../compound/modal';

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
  useEffect(() => {
    if (!isOpen) return;
    Log.modal(`${event}_open`, openProperties);
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
