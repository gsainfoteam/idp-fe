import { useEffect } from 'react';

import {
  NavigateOptions,
  Outlet,
  ValidateLinkOptions,
  createRootRoute,
  useLocation,
  useSearch,
} from '@tanstack/react-router';

import { router } from '@/app';
import { Log } from '@/features/core/utils/log';

function RootComponent() {
  const location = useLocation();
  const search = useSearch({ strict: false });

  useEffect(() => {
    Log.setCurrentPath(location.pathname);
    Log.pageview(
      location.pathname as ValidateLinkOptions<typeof router>['to'],
      search as NavigateOptions<typeof router>['search'],
    );
  }, [location.pathname, search]);

  return <Outlet />;
}

export const Route = createRootRoute({
  component: RootComponent,
});
