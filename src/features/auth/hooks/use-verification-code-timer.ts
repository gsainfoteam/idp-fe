import { useEffect, useRef, useState } from 'react';

export function useVerificationCodeTimer({
  initialSec,
  maxTryCount,
  onExpired,
  onMaxCountReached,
  onInvalidCode,
  onReset,
}: {
  initialSec: number;
  maxTryCount: number;
  onExpired?: () => void;
  onMaxCountReached?: () => void;
  onInvalidCode?: (count: number, maxCount: number) => void;
  onReset?: () => void;
}) {
  const [remainSec, setRemainSec] = useState(initialSec);
  const [tryCount, setTryCount] = useState(0);
  const expiredCalledRef = useRef(false);
  const maxCountCalledRef = useRef(false);

  useEffect(() => {
    if (remainSec <= 0 && onExpired && !expiredCalledRef.current) {
      expiredCalledRef.current = true;
      onExpired();
    }

    if (
      tryCount >= maxTryCount &&
      onMaxCountReached &&
      !maxCountCalledRef.current
    ) {
      maxCountCalledRef.current = true;
      onMaxCountReached();
    }

    if (remainSec > 0) {
      const timer = setTimeout(() => {
        setRemainSec((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [tryCount, remainSec, maxTryCount, onExpired, onMaxCountReached]);

  const incrementCount = () => {
    setTryCount((prev) => prev + 1);
  };

  const handleInvalidCode = () => {
    if (tryCount < maxTryCount && onInvalidCode) {
      onInvalidCode(tryCount, maxTryCount);
    }
  };

  const resetTimer = () => {
    setRemainSec(initialSec);
    setTryCount(0);
    expiredCalledRef.current = false;
    maxCountCalledRef.current = false;
    onReset?.();
  };

  return {
    remainSec,
    tryCount,
    incrementCount,
    handleInvalidCode,
    resetTimer,
    isExpired: remainSec <= 0,
    isMaxCountReached: tryCount >= maxTryCount,
  };
}
