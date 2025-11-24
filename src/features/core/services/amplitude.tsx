import { PropsWithChildren, useEffect } from 'react';

import * as amplitude from '@amplitude/analytics-browser';

export const AmplitudeProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (import.meta.env.PROD) {
      amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY, {
        autocapture: true,
      });
    }
  }, []);

  return <>{children}</>;
};
