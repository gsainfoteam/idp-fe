import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { OverlayProvider } from 'overlay-kit';

import {
  AmplitudeProvider,
  NotFoundFrame,
  ThemeProvider,
  ToastProvider,
} from '@/features/core';

import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: () => <NotFoundFrame />,
  defaultViewTransition: {
    types: ({ fromLocation, toLocation, hrefChanged }) => {
      // 시작 페이지이거나, 경로와 쿼리 등이 모두 동일한 (=새로고침)의 경우
      if (!fromLocation || !hrefChanged) return ['reload'];

      // 경로는 동일하지만 쿼리 등이 변경된 경우
      if (fromLocation.pathname === toLocation.pathname) return ['reload'];

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
};

export default App;
