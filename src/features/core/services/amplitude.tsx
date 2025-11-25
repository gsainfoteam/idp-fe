import { PropsWithChildren, useEffect } from 'react';

import * as amplitude from '@amplitude/analytics-browser';

import { Log } from '../utils/log';

const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY;

export const AmplitudeProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    if (!amplitudeApiKey) {
      Log.error('runtime', {
        message: 'Amplitude API key missing',
        context: 'AmplitudeProvider',
      });
      return;
    }

    amplitude.init(amplitudeApiKey, {
      autocapture: true,
    });
  }, []);

  return <>{children}</>;
};
