import {
  createFileRoute,
  Navigate,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { useAuth } from '@/features/auth';

const cleanupAllFunnel = (search: Partial<Record<string, string>>) => {
  return Object.fromEntries(
    Object.entries(search).filter(([key]) => !key.endsWith('-step')),
  );
};

const AuthRequiredLayout = () => {
  const { user, isSigningOut } = useAuth();
  const router = useRouter();

  if (user === undefined) return null;
  if (user === null) {
    return (
      <Navigate
        to="/auth/login"
        search={(prev) => ({
          ...cleanupAllFunnel(prev),
          ...(isSigningOut ? {} : { redirect: router.history.location.href }),
        })}
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
