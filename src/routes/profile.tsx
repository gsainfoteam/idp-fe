import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { ProfileFrame } from '@/features/profile';

const schema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  redirectUrl: z.string().optional(),
});

const ProfilePage = () => {
  return <ProfileFrame />;
};

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
  validateSearch: schema,
});
