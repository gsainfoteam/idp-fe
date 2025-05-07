import { createFileRoute } from '@tanstack/react-router';

import { AvatarTestFrame } from '@/features/test';

const AvatarTestPage = () => {
  return <AvatarTestFrame />;
};

export const Route = createFileRoute('/test/components/avatar')({
  component: AvatarTestPage,
});
