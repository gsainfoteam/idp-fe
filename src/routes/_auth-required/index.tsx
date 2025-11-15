import { createFileRoute } from '@tanstack/react-router';

import { HomeFrame } from '@/features/core';

const HomePage = () => {
  return <HomeFrame />;
};

export const Route = createFileRoute('/_auth-required/')({
  component: HomePage,
});
