import { createFileRoute, Navigate, useLocation } from '@tanstack/react-router';

import { useAuth } from '@/features/auth';

const ProfilePage = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (user === undefined) return null;
  if (user === null)
    return (
      <Navigate to="/auth/login" search={{ redirectUrl: location.href }} />
    );
  return <div>Profile</div>;
};

export const Route = createFileRoute('/')({
  component: ProfilePage,
});
