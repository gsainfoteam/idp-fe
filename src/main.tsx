import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app.tsx';

import { Log } from '@/features/core';

import './index.css';
import './locales/i18n';

declare global {
  interface Window {
    __APP_ERROR_LISTENERS__?: boolean;
  }
}

if (typeof window !== 'undefined' && !window.__APP_ERROR_LISTENERS__) {
  window.__APP_ERROR_LISTENERS__ = true;

  window.addEventListener('error', (event) => {
    Log.error('runtime', {
      message: event.message,
      context: event.filename,
      stack: event.error?.stack,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === 'string'
          ? reason
          : JSON.stringify(reason);

    const stack = reason instanceof Error ? reason.stack : undefined;

    Log.error('runtime', {
      message: message ?? 'Unhandled promise rejection',
      context: 'unhandledrejection',
      stack,
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
