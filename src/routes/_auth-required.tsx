import { useMemo } from 'react';

import { useAuth, useToken } from '@/features/auth';
import {
  Navigate,
  Outlet,
  createFileRoute,
  useRouter,
} from '@tanstack/react-router';

const cleanupAllFunnel = (href: string): string => {
  const url = new URL(href, window.location.origin);
  const params = url.searchParams;

  for (const key of params.keys()) {
    if (key.endsWith('-step')) {
      params.delete(key);
    }
  }

  url.search = params.toString();
  return url.pathname + url.search + url.hash;
};

const AuthRequiredLayout = () => {
  const { user } = useAuth();
  const { token } = useToken();
  const router = useRouter();

  const searchParams = useMemo(() => {
    const shouldRedirect = token === null;
    return shouldRedirect
      ? { redirect: cleanupAllFunnel(router.history.location.href) }
      : {};
  }, [token, router.history.location.href]);

  if (user === undefined) return null;
  if (user === null) {
    return (
      <Navigate
        to="/auth/login"
        search={searchParams}
        replace
        viewTransition={{ types: ['reload'] }}
      />
    );
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_auth-required')({
  component: AuthRequiredLayout,
});
