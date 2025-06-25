import { useEffect, useState } from 'react';

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 768px)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    handleResize(mediaQuery);

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return { isDesktop };
}
