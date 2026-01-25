import {
  Children,
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '@/features/core';

interface SeparatorTabContextValue<T extends string> {
  selected: T;
  setSelected: (value: T) => void;
  items: readonly T[];
}

const SeparatorTabContext =
  createContext<SeparatorTabContextValue<string> | null>(null);

function useSeparatorTabInternal<
  T extends string,
>(): SeparatorTabContextValue<T> {
  const context = useContext(SeparatorTabContext);
  if (!context) {
    throw new Error('useSeparatorTab must be used within SeparatorTabProvider');
  }
  return context as unknown as SeparatorTabContextValue<T>;
}

export type SeparatorTabProviderProps = PropsWithChildren;

export type SeparatorTabListProps = PropsWithChildren;

export type SeparatorTabLabelProps<T extends string> = PropsWithChildren<{
  value: T;
}>;

export type SeparatorTabRenderProps<T extends string> = PropsWithChildren<{
  value: T;
}>;

function isTabLabel(child: unknown): child is ReactElement<{ value: unknown }> {
  return (
    child !== null &&
    typeof child === 'object' &&
    'props' in child &&
    child.props !== null &&
    typeof child.props === 'object' &&
    'value' in child.props
  );
}

export function SeparatorTabList<T extends string = string>({
  children,
}: {
  children: ReactNode;
}) {
  const { items } = useSeparatorTabInternal<T>();

  const childrenMap = new Map<T, ReactElement>();
  Children.forEach(children, (child) => {
    if (isTabLabel(child)) {
      const value = child.props.value;
      if (typeof value === 'string') {
        childrenMap.set(value as T, child);
      }
    }
  });

  return (
    <div className="text-title-3 text-label -mx-5 flex">
      {items.map((value) => {
        const child = childrenMap.get(value as T);
        return child ? child : null;
      })}
    </div>
  );
}

export function SeparatorTabLabel<T extends string>({
  value,
  children,
}: SeparatorTabLabelProps<T>) {
  const { selected, setSelected } = useSeparatorTabInternal<T>();

  return (
    <button
      className="flex w-full flex-col gap-2 text-center"
      onClick={() => setSelected(value)}
    >
      {children}
      <div
        className={cn(
          'h-2 w-full',
          selected === value
            ? 'bg-funnel-separator-active'
            : 'bg-funnel-separator',
        )}
      />
    </button>
  );
}

export function SeparatorTabRender<T extends string>({
  value,
  children,
}: SeparatorTabRenderProps<T>) {
  const { selected } = useSeparatorTabInternal<T>();

  if (selected !== value) {
    return null;
  }

  return <>{children}</>;
}

export function SeparatorTabProvider<T extends string>({
  items,
  defaultValue,
  children,
  onChange,
}: {
  items: readonly T[];
  defaultValue: T;
  children: ReactNode;
  onChange?: (value: T) => void;
}) {
  const [selected, setSelected] = useState<T>(defaultValue);

  const handleChange = (value: T) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <SeparatorTabContext.Provider
      value={
        {
          selected,
          setSelected: handleChange,
          items,
        } as unknown as SeparatorTabContextValue<string>
      }
    >
      {children}
    </SeparatorTabContext.Provider>
  );
}
