import { createRouter } from '@tanstack/react-router';

import { ErrorFallbackFrame, NotFoundFrame } from '@/features/core';

import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: () => <NotFoundFrame />,
  defaultErrorComponent: ({ error, info, reset }) => {
    const description = import.meta.env.DEV ? info?.componentStack : undefined;
    const errorStatus = (error as { status?: unknown }).status;
    const status = typeof errorStatus === 'number' ? errorStatus : undefined;

    return (
      <ErrorFallbackFrame
        message={error.message}
        description={description}
        status={status}
        onRetry={reset}
      />
    );
  },
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
