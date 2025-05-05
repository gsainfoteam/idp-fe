import { createFileRoute } from '@tanstack/react-router';

import { SwitchTestFrame } from '@/features/test';

const SwitchTestPage = () => {
  return <SwitchTestFrame />;
};

export const Route = createFileRoute('/test/components/switch')({
  component: SwitchTestPage,
});
