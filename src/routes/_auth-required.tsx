import {
  createFileRoute,
  Navigate,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { useAuth } from '@/features/auth';
import { useCleanupFunnel } from '@/features/core';

const AuthRequiredLayout = () => {
  const { user } = useAuth();
  const router = useRouter();
  // FIXME: useLocation에서는 Maximum update depth exceeded 오류가 발생함 useCleanupFunnel 코드 수정 필요
  const cleanup = useCleanupFunnel();

  if (user === undefined) return null;
  if (user === null) {
    cleanup();
    return (
      <Navigate
        to="/auth/login"
        search={(prev) => ({
          ...prev,
          redirect: router.history.location.href,
        })}
        replace
      />
    );
  }
  return <Outlet />;
};

export const Route = createFileRoute('/_auth-required')({
  component: AuthRequiredLayout,
});
