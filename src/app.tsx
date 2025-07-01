import { createRouter, RouterProvider } from '@tanstack/react-router';
import { OverlayProvider } from 'overlay-kit';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFoundFrame, ThemeProvider, ToastProvider } from '@/features/core';

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: () => <NotFoundFrame />,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <RouterProvider router={router} />
          <ToastProvider />
        </OverlayProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
