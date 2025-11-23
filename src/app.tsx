import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { OverlayProvider } from 'overlay-kit';

import {
  AmplitudeProvider,
  ThemeProvider,
  ToastProvider,
} from '@/features/core';

import { router } from './router';

const queryClient = new QueryClient();

export default function App() {
  return (
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
  );
}
