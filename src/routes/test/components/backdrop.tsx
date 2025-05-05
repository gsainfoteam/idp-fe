import { createFileRoute } from '@tanstack/react-router';

import { BackdropTestFrame } from '@/features/test';

const BackdropTestPage = () => {
  return <BackdropTestFrame />;
};

export const Route = createFileRoute('/test/components/backdrop')({
  component: BackdropTestPage,
});
