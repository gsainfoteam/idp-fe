import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { useAuth } from '@/features/auth';

const cleanupAllFunnel = (search: Partial<Record<string, string>>) => {
  // NOTE: useLocation에서는 Maximum update depth exceeded 오류가 발생함
  return Object.fromEntries(
    Object.entries(search).filter(([key]) => !key.endsWith('-step')),
  );
};

const AuthRequiredLayout = () => {
  const { user } = useAuth();

  if (user === undefined) return null;
  if (user === null) {
    return (
      <Navigate
        to="/auth/login"
        search={(prev) => ({
          ...cleanupAllFunnel(prev),
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
