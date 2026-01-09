import { type FC } from 'react';

import {
  SeparatorTabLabel,
  SeparatorTabList,
  SeparatorTabProvider,
  SeparatorTabRender,
  type SeparatorTabLabelProps,
  type SeparatorTabListProps,
  type SeparatorTabProviderProps,
  type SeparatorTabRenderProps,
} from '../components/separator-tab';

export function useSeparatorTab<T extends string>({
  items,
  defaultValue,
  onChange,
}: {
  items: readonly T[];
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const Provider: FC<SeparatorTabProviderProps> = ({ children }) => (
    <SeparatorTabProvider<T>
      items={items}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {children}
    </SeparatorTabProvider>
  );

  const List: FC<SeparatorTabListProps> = ({ children }) => (
    <SeparatorTabList<T> children={children} />
  );

  const Label: FC<SeparatorTabLabelProps<T>> = (props) => (
    <SeparatorTabLabel<T> {...props} />
  );

  const Render: FC<SeparatorTabRenderProps<T>> = (props) => (
    <SeparatorTabRender<T> {...props} />
  );

  return {
    Provider,
    List,
    Label,
    Render,
  };
}
