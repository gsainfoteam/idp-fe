import {
  createFileRoute,
  Navigate,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { useAuth } from '@/features/auth';

const AuthRequiredLayout = () => {
  const { user } = useAuth();
  // NOTE: useLocation에서는 Maximum update depth exceeded 오류가 발생함
  const router = useRouter();

  if (user === undefined) return null;
  if (user === null)
    return (
      <Navigate
        to="/auth/login"
        search={(prev) => ({
          // funnel step 중간에 log out 되었을 경우 step 삭제
          ...Object.fromEntries(
            Object.entries(prev).filter(([key]) => !key.endsWith('-step')),
          ),
          redirect: router.history.location.href,
        })}
        replace
      />
    );
  return <Outlet />;
};

export const Route = createFileRoute('/_auth-required')({
  component: AuthRequiredLayout,
});
