import { createFileRoute } from '@tanstack/react-router';

import { FindPasswordFrame } from '@/features/profile';

const FindPasswordPage = () => {
  return <FindPasswordFrame />;
};

export const Route = createFileRoute('/find-password')({
  component: FindPasswordPage,
});
