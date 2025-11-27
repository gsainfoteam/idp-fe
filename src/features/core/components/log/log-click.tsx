import {
  Children,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from 'react';

import { type ClickEventMap, Log } from '@/features/core';

interface LogClickProps<T extends keyof ClickEventMap> {
  event: T;
  properties?: ClickEventMap[T];
  children: ReactNode;
}

export function LogClick<T extends keyof ClickEventMap>({
  event,
  properties = {} as ClickEventMap[T],
  children,
}: LogClickProps<T>) {
  const child = Children.only(children);
  if (!isValidElement<{ onClick?: (e: React.MouseEvent) => void }>(child)) {
    return <>{children}</>;
  }

  return cloneElement(
    child as ReactElement<{ onClick?: (e: React.MouseEvent) => void }>,
    {
      onClick: (e: React.MouseEvent) => {
        Log.click(event, properties);
        child.props.onClick?.(e);
      },
    },
  );
}
