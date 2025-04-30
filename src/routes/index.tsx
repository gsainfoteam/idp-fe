import { createFileRoute, Navigate, useRouter } from '@tanstack/react-router';

import { useAuth } from '@/features/auth';

const ProfilePage = () => {
  const { user } = useAuth();
  // NOTE: useLocation에서는 Maximum update depth exceeded 오류가 발생함
  const router = useRouter();
  if (user === undefined) return null;
  if (user === null)
    return (
      <Navigate
        to="/auth/login"
        search={{ redirectUrl: router.history.location.href }}
        replace
      />
    );
  return <div>Profile</div>;
};

export const Route = createFileRoute('/')({
  component: ProfilePage,
});
