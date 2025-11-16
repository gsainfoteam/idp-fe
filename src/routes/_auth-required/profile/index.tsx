import { createFileRoute } from '@tanstack/react-router';

import { ProfileFrame } from '@/features/profile';

const ProfilePage = () => {
  return <ProfileFrame />;
};

export const Route = createFileRoute('/_auth-required/profile/')({
  component: ProfilePage,
});
