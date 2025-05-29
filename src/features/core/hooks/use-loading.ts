import { useCallback, useMemo, useState } from 'react';
import { useIsMounted } from './use-is-mounted';

export function useLoading(): [
  boolean,
  <T>(promise: Promise<T> | (() => Promise<T>)) => Promise<T>,
] {
  const [loading, setLoading] = useState(false);
  const { getIsMounted } = useIsMounted();

  const startLoading = useCallback(
    async <T>(promise: Promise<T> | (() => Promise<T>)) => {
      try {
        setLoading(true);
        return await (typeof promise === 'function' ? promise() : promise);
      } finally {
        if (getIsMounted()) {
          setLoading(false);
        }
      }
    },
    [getIsMounted],
  );

  return useMemo(() => [loading, startLoading], [loading, startLoading]);
}
