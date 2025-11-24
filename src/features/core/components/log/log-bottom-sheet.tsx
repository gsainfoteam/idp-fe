import { useEffect } from 'react';

import { Log, type ModalEventMap } from '@/features/core';

import { BottomSheet } from '../compound/bottom-sheet';
import { ModalProps } from '../compound/modal';

type LogBottomSheetProps<
  T extends keyof ModalEventMap,
  TCloseValue = void,
> = Omit<ModalProps<TCloseValue>, 'isOpen' | 'close'> & {
  event: T;
  openProperties?: ModalEventMap[T]['open'];
  closeProperties: (closeValue: TCloseValue) => ModalEventMap[T]['close'];
  isOpen: boolean;
  close: ModalProps<TCloseValue>['close'];
  defaultCloseValue: [TCloseValue] extends [void] ? never : TCloseValue;
};

export function LogBottomSheet<
  T extends keyof ModalEventMap,
  TCloseValue = void,
>({
  event,
  openProperties = {} as ModalEventMap[T]['open'],
  closeProperties,
  isOpen,
  close,
  defaultCloseValue,
  children,
  ...props
}: LogBottomSheetProps<T, TCloseValue>) {
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

LogBottomSheet.Header = BottomSheet.Header;
LogBottomSheet.Body = BottomSheet.Body;
LogBottomSheet.Footer = BottomSheet.Footer;
LogBottomSheet.Close = BottomSheet.Close;
