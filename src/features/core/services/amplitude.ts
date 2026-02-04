import * as amplitude from '@amplitude/analytics-browser';

import { Log } from '../utils/log';

const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY;

if (!amplitudeApiKey) {
  Log.error('runtime', {
    message: 'Amplitude API key missing',
    context: 'amplitude-init',
  });
} else {
  amplitude.init(amplitudeApiKey, {
    autocapture: true,
    logLevel: amplitude.Types.LogLevel.Warn,
  });
}
