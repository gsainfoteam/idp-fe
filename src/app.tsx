import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';
import { OverlayProvider } from 'overlay-kit';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <OverlayProvider>
      <RouterProvider router={router} />
      <Toaster />
    </OverlayProvider>
  );
};

export default App;
