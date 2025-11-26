import { createContext } from 'react';

export interface ModalContextValue<TCloseValue> {
  close: (value: TCloseValue) => void;
}

export const ModalContext = createContext<ModalContextValue<unknown> | null>(
  null,
);
