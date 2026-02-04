import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { OverlayProvider } from 'overlay-kit';
import { ErrorBoundary } from 'react-error-boundary';

import { router } from './router';

import {
  ErrorFallbackFrame,
  Log,
  ThemeProvider,
  ToastProvider,
} from '@/features/core';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        const err = error instanceof Error ? error : new Error(String(error));
        const description = import.meta.env.DEV ? err.stack : undefined;
        const errorStatus = (error as { status?: unknown }).status;
        const status =
          typeof errorStatus === 'number' ? errorStatus : undefined;

        return (
          <ErrorFallbackFrame
            status={status}
            message={err.message}
            description={description}
            onRetry={resetErrorBoundary}
          />
        );
      }}
      onError={(error, info) => {
        const err = error instanceof Error ? error : new Error(String(error));
        Log.error('runtime', {
          message: err.message,
          context: info.componentStack,
          stack: err.stack,
        });
      }}
    >
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <OverlayProvider>
            <RouterProvider router={router} />
            <ToastProvider />
          </OverlayProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
