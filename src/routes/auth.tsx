import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { z } from 'zod';

import { useAuth } from '@/features/auth';

const AuthLayout = () => {
  const { user } = useAuth();
  const { redirectUrl } = Route.useSearch();
  if (user === undefined) return null;
  if (user !== null) return <Navigate to={redirectUrl ?? '/'} />;
  return <Outlet />;
};

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  validateSearch: z.object({
    redirectUrl: z.string().optional(),
  }),
});
