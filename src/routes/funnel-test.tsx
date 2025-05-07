import { createFileRoute } from '@tanstack/react-router';

import { FunnelTestFrame } from '@/features/test';

const FunnelTestPage = () => {
  return <FunnelTestFrame />;
};

export const Route = createFileRoute('/funnel-test')({
  component: FunnelTestPage,
});
