import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { OverlayProvider } from 'overlay-kit';
import { ErrorBoundary } from 'react-error-boundary';

import {
  AmplitudeProvider,
  ErrorFallbackFrame,
  Log,
  ThemeProvider,
  ToastProvider,
} from '@/features/core';

import { router } from './router';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorFallbackFrame
          status={error.status}
          message={error.message}
          description={error.stack}
          onRetry={resetErrorBoundary}
        />
      )}
      onError={(error, info) =>
        Log.error('runtime', {
          message: error.message,
          context: info.componentStack,
          stack: error.stack,
        })
      }
    >
      <AmplitudeProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <OverlayProvider>
              <RouterProvider router={router} />
              <ToastProvider />
            </OverlayProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AmplitudeProvider>
    </ErrorBoundary>
  );
}
