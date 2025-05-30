import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';

import { routeTree } from './routeTree.gen';
const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
