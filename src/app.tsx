import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';
import { OverlayProvider } from 'overlay-kit';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createRouter({ routeTree, defaultPreload: 'intent' });
const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <RouterProvider router={router} />
        <Toaster />
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default App;
