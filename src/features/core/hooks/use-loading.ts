import { useCallback, useMemo, useState } from 'react';
import { useIsMountedRef } from './use-is-mounted-ref';

export function useLoading(): [
  boolean,
  <T>(promise: Promise<T>) => Promise<T>,
] {
  const [loading, setLoading] = useState(false);
  const ref = useIsMountedRef();

  const startLoading = useCallback(
    async <T>(promise: Promise<T>) => {
      try {
        setLoading(true);
        return await promise;
      } finally {
        if (ref.isMounted) {
          setLoading(false);
        }
      }
    },
    [ref.isMounted],
  );

  return useMemo(() => [loading, startLoading], [loading, startLoading]);
}
