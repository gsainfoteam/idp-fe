import { useEffect, useRef } from 'react';

export function useIsMounted() {
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const getIsMounted = () => isMounted.current;

  return { getIsMounted };
}
