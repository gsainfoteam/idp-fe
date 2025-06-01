import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ToastBar, Toaster } from 'react-hot-toast';

import { routeTree } from './routeTree.gen';
import { ReactElement } from 'react';

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
      <Toaster
        toastOptions={{
          style: {
            background: 'var(--color-toast-background)',
            color: 'var(--color-toast-text)',
            border: '1px solid var(--color-toast-border)',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 12,
            paddingRight: 12,
          },
          success: {
            iconTheme: {
              primary: 'var(--color-toast-icon-success)',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-toast-icon-error)',
              secondary: 'white',
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className="flex items-center gap-3">
                {icon}
                <div className="text-body-1">
                  {
                    (message as ReactElement<{ children: string }>).props
                      .children
                  }
                </div>
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
};

export default App;
