import { useAuth } from '@/features/auth';
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
  const router = useRouter();

  if (user === undefined) return null;
  if (user === null) {
    const redirect = cleanupAllFunnel(router.history.location.href);

    return (
      <Navigate
        to="/auth/login"
        search={{ redirect }}
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
