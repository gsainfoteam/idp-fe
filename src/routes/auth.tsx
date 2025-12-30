import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { z } from 'zod';

import { useAuth } from '@/features/auth';

const AuthLayout = () => {
  const { user } = useAuth();
  const { redirect } = Route.useSearch();

  if (user === undefined) return null;
  if (user !== null) return <Navigate to={redirect ?? '/'} />;
  return <Outlet />;
};

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  validateSearch: z.object({
    redirect: z
      .string()
      .min(1, 'Redirect cannot be empty')
      .refine((val) => val.startsWith('/'), 'Redirect must be a relative path')
      .optional(),
  }),
});
