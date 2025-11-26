import {
  type NavigateOptions,
  Outlet,
  type ValidateLinkOptions,
  createRootRoute,
  useLocation,
  useSearch,
} from '@tanstack/react-router';
import { useEffect } from 'react';

import { Log } from '@/features/core';
import { type router } from '@/router';

function RootComponent() {
  const location = useLocation();
  const search = useSearch({ strict: false });

  useEffect(() => {
    Log.pageview(
      location.pathname as ValidateLinkOptions<typeof router>['to'],
      search as NavigateOptions<typeof router>['search'],
    );
    Log.setCurrentPath(location.pathname);
  }, [location.pathname, search]);

  return <Outlet />;
}

export const Route = createRootRoute({
  component: RootComponent,
});
