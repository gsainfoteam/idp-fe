import { useEffect } from 'react';

import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';

import { Log } from '@/features/core/utils/log';

function RootComponent() {
  const location = useLocation();

  useEffect(() => {
    Log.setCurrentPath(location.pathname);
  }, [location.pathname]);

  return <Outlet />;
}

export const Route = createRootRoute({
  component: RootComponent,
});
