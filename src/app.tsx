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
  defaultViewTransition: {
    types: ({ fromLocation, toLocation, hrefChanged }) => {
      // 시작 페이지이거나, 경로와 쿼리 등이 모두 동일한 새로고침의 경우
      if (!fromLocation || !hrefChanged) {
        return ['reload'];
      }

      const fromIndex = fromLocation.state.__TSR_index;
      const toIndex = toLocation.state.__TSR_index;

      return [fromIndex > toIndex ? 'backwards' : 'forwards'];
    },
  },
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
